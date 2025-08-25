// GitHub 설정 템플릿 파일
// 실제 사용시 이 파일을 config.js로 복사하고 실제 값을 입력하세요

const GitHubConfig = {
    // 저장소 정보
    owner: 'snuds2025',
    repo: 'snuds2025.github.io',
    branch: 'main',
    
    // 관리자 정보
    admin: {
        email: 'snuds2025@gmail.com',
        // 실제 운영시에는 해시화된 비밀번호를 사용하세요
        password: 'YOUR_ADMIN_PASSWORD_HERE'
    },
    
    // GitHub 토큰 관련
    getDefaultToken: function() {
        // 환경변수에서 토큰을 가져오는 방법 (Node.js 환경)
        // return process.env.GITHUB_TOKEN || '';
        
        // 브라우저 환경에서는 사용자가 직접 입력해야 합니다
        return '';
    },
    
    // 개발용 기본 토큰 (실제 운영시에는 제거하세요)
    // 주의: 절대 실제 토큰을 여기에 입력하지 마세요!
    devToken: '' // 빈 문자열로 유지
};

// 모듈 내보내기
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GitHubConfig;
} 