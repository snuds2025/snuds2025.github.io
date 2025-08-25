// GitHub 저장소에 업로드 폴더 구조를 생성하는 초기화 스크립트
class GitHubFolderInitializer {
    constructor(token, owner, repo, branch = 'master') {
        this.token = token;
        this.owner = owner;
        this.repo = repo;
        this.branch = branch;
        this.apiBase = 'https://api.github.com';
    }

    // 폴더 생성 (GitHub에서는 빈 파일로 폴더를 표현)
    async createFolder(folderPath) {
        try {
            const requestData = {
                message: `Create folder: ${folderPath}`,
                content: '', // 빈 내용으로 폴더 생성
                branch: this.branch
            };

            const response = await fetch(`${this.apiBase}/repos/${this.owner}/${this.repo}/contents/${folderPath}/.gitkeep`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.message && errorData.message.includes('already exists')) {
                    console.log(`Folder ${folderPath} already exists`);
                    return { success: true, message: 'Folder already exists' };
                }
                throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
            }

            return {
                success: true,
                message: `Folder ${folderPath} created successfully`
            };

        } catch (error) {
            console.error('Create folder error:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // 모든 필요한 폴더 생성
    async initializeFolders() {
        const folders = [
            'uploads',
            'uploads/lecture-notes',
            'uploads/homework',
            'uploads/past-exams'
        ];

        console.log('Initializing folder structure...');

        for (const folder of folders) {
            const result = await this.createFolder(folder);
            if (result.success) {
                console.log(result.message);
            } else {
                console.error(`Failed to create ${folder}:`, result.message);
            }
        }

        console.log('Folder initialization completed!');
    }
}

// 전역 변수로 초기화 인스턴스 생성 (토큰은 사용자가 직접 입력)
let folderInitializer = null;

// 토큰 설정 함수
function setFolderInitializerToken(token) {
    folderInitializer = new GitHubFolderInitializer(
        token, // GitHub 토큰
        GitHubConfig.owner, // 저장소 소유자
        GitHubConfig.repo, // 저장소 이름
        GitHubConfig.branch // 브랜치
    );
    console.log('폴더 초기화 토큰이 설정되었습니다.');
}

// 페이지 로드 시 폴더 구조 초기화 (한 번만 실행)
document.addEventListener('DOMContentLoaded', function() {
    // localStorage에 초기화 상태 확인
    if (!localStorage.getItem('foldersInitialized') && folderInitializer) {
        folderInitializer.initializeFolders()
        .then(() => {
            localStorage.setItem('foldersInitialized', 'true');
        })
        .catch(error => {
            console.error('Folder initialization failed:', error);
        });
    }
});
