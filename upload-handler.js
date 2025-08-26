// GitHub API를 사용한 파일 업로드 핸들러
class GitHubFileUploader {
    constructor(token, owner, repo, branch = 'master') {
        this.token = token;
        this.owner = owner;
        this.repo = repo;
        this.branch = branch;
        this.apiBase = 'https://api.github.com';
    }

    // 파일을 Base64로 인코딩
    async encodeFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = btoa(reader.result);
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsBinaryString(file);
        });
    }
    
    // 파일 업로드
    async uploadFile(file, category, title, description, date) {
        try {
            // 파일을 Base64로 인코딩
            const content = await this.encodeFile(file);
            
            // 파일 경로 생성 - 제목과 설명을 파일명에 포함
            const timestamp = Date.now();
            const safeTitle = title.replace(/[^a-zA-Z0-9가-힣\s]/g, '').replace(/\s+/g, '_');
            const safeDescription = description.replace(/[^a-zA-Z0-9가-힣\s]/g, '').replace(/\s+/g, '_');
            const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '');
            const fileName = `${timestamp}_${safeTitle}_${safeDescription}_${safeFileName}`;
            const filePath = `uploads/${category}/${fileName}`;
            
            // GitHub API 요청 데이터
            const requestData = {
                message: `Add file: ${title}`,
                content: content,
                branch: this.branch
            };

            // GitHub API 호출
            const response = await fetch(`${this.apiBase}/repos/${this.owner}/${this.repo}/contents/${filePath}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('GitHub API Error Details:', {
                    status: response.status,
                    statusText: response.statusText,
                    url: `${this.apiBase}/repos/${this.owner}/${this.repo}/contents/${filePath}`,
                    branch: this.branch,
                    errorText: errorText
                });
                throw new Error(`GitHub API Error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const result = await response.json();
            
            // 다운로드 URL 생성 (GitHub raw URL 사용)
            const downloadUrl = `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/${filePath}`;
            
            console.log('파일 업로드 성공:', {
                filePath: filePath,
                downloadUrl: downloadUrl,
                originalDownloadUrl: result.content.download_url
            });
            
            // 파일 정보 반환
            return {
                success: true,
                fileInfo: {
                    id: timestamp,
                    category: category,
                    title: title,
                    description: description,
                    date: date,
                    fileName: file.name,
                    filePath: downloadUrl,
                    fileSize: file.size,
                    uploadDate: new Date().toISOString(),
                    sha: result.content.sha
                }
            };

        } catch (error) {
            console.error('Upload error:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    // 파일 목록 조회
    async getFiles() {
        try {
            console.log('Getting files from GitHub...');
            console.log('API URL:', `${this.apiBase}/repos/${this.owner}/${this.repo}/contents/uploads`);
            
            // 토큰이 있으면 사용하고, 없으면 토큰 없이 요청
            const headers = {};
            if (this.token) {
                headers['Authorization'] = `token ${this.token}`;
            }
            
            const response = await fetch(`${this.apiBase}/repos/${this.owner}/${this.repo}/contents/uploads`, {
                headers: headers
            });

            if (!response.ok) {
                console.log('GitHub API Error:', response.status, response.statusText);
                // API 오류 시 빈 배열 반환
                return {
                    success: true,
                    files: []
                };
            }

            const contents = await response.json();
            console.log('GitHub contents response:', contents);
            const files = [];

            // 각 카테고리 폴더에서 파일 목록 가져오기
            for (const item of contents) {
                console.log('Processing item:', item);
                if (item.type === 'dir') {
                    console.log('Found directory:', item.name);
                    const categoryResponse = await fetch(item.url, {
                        headers: headers
                    });
                    
                    if (categoryResponse.ok) {
                        const categoryContents = await categoryResponse.json();
                        console.log('Category contents:', categoryContents);
                        for (const file of categoryContents) {
                            if (file.type === 'file') {
                                console.log('Processing file:', file);
                                // 파일 정보에서 메타데이터 추출
                                const fileName = file.name;
                                const parts = fileName.split('_');
                                
                                if (parts.length >= 4) {
                                    // 새로운 형식: timestamp_title_description_originalname
                                    const timestamp = parts[0];
                                    const title = parts[1];
                                    const description = parts[2];
                                    const originalName = parts.slice(3).join('_');
                                    
                                    // GitHub raw file URL 생성
                                    const rawUrl = `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/uploads/${item.name}/${fileName}`;
                                    console.log('Generated raw URL:', rawUrl);
                                    
                                    const fileInfo = {
                                        id: timestamp,
                                        category: item.name,
                                        title: title.replace(/_/g, ' '),
                                        description: description.replace(/_/g, ' '),
                                        date: new Date(parseInt(timestamp)).toISOString().split('T')[0],
                                        fileName: originalName,
                                        filePath: rawUrl,
                                        fileSize: file.size,
                                        uploadDate: file.created_at,
                                        sha: file.sha
                                    };
                                    
                                    files.push(fileInfo);
                                } else {
                                    // 기존 형식: timestamp_originalname (하위 호환성)
                                    const timestamp = parts[0];
                                    const originalName = parts.slice(1).join('_');
                                    
                                    // GitHub raw file URL 생성
                                    const rawUrl = `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/uploads/${item.name}/${fileName}`;
                                    console.log('Generated raw URL:', rawUrl);
                                    
                                    const fileInfo = {
                                        id: timestamp,
                                        category: item.name,
                                        title: originalName,
                                        description: `Uploaded file: ${originalName}`,
                                        date: new Date(parseInt(timestamp)).toISOString().split('T')[0],
                                        fileName: originalName,
                                        filePath: rawUrl,
                                        fileSize: file.size,
                                        uploadDate: file.created_at,
                                        sha: file.sha
                                    };
                                    
                                    files.push(fileInfo);
                                }
                            }
                        }
                    } else {
                        console.log('Category response not ok:', categoryResponse.status, categoryResponse.statusText);
                    }
                }
            }

            console.log('Final files array:', files);
            return {
                success: true,
                files: files
            };

        } catch (error) {
            console.error('Get files error:', error);
            // 오류 발생 시에도 빈 배열 반환 (실패하지 않음)
            return {
                success: true,
                files: []
            };
        }
    }

    // 파일 삭제
    async deleteFile(filePath, sha) {
        try {
            const requestData = {
                message: `Delete file: ${filePath}`,
                sha: sha,
                branch: this.branch
            };

            const response = await fetch(`${this.apiBase}/repos/${this.owner}/${this.repo}/contents/${filePath}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
            }

            return {
                success: true,
                message: 'File deleted successfully'
            };

        } catch (error) {
            console.error('Delete error:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
}

// 전역 변수로 업로더 인스턴스 생성 (토큰은 사용자가 직접 입력)
let githubUploader = null;

// 토큰 설정 함수
async function setGitHubToken(token) {
    githubUploader = new GitHubFileUploader(
        token, // GitHub 토큰
        GitHubConfig.owner, // 저장소 소유자
        GitHubConfig.repo, // 저장소 이름
        GitHubConfig.branch // 브랜치
    );
    
    // 토큰 권한 확인
    try {
        const response = await fetch(`https://api.github.com/repos/${GitHubConfig.owner}/${GitHubConfig.repo}`, {
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            console.log('GitHub 토큰이 설정되었고 저장소 접근 권한이 확인되었습니다.');
        } else {
            console.warn('GitHub 토큰은 설정되었지만 저장소 접근에 문제가 있을 수 있습니다:', response.status);
        }
    } catch (error) {
        console.error('토큰 권한 확인 중 오류:', error);
    }
}
