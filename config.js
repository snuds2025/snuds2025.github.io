// GitHub 설정 파일 - 배포용
// 실제 프로덕션에서는 환경변수를 사용하세요

console.log('GitHubConfig 파일이 로드되었습니다.');

const GitHubConfig = {
    // 저장소 정보
    owner: 'snuds2025',
    repo: 'snuds2025.github.io',
    branch: 'main',
    
    // 관리자 정보 (실제 운영시에는 환경변수 사용 권장)
    admin: {
        email: 'snuds2025@gmail.com',
        // 비밀번호는 실제로는 해시화되어 저장되어야 합니다
        password: 'mirlab412c!'
    },
    
    // GitHub 토큰 관련
    // 실제 토큰은 사용자가 직접 입력하거나 환경변수에서 가져옵니다
    getDefaultToken: function() {
        // 프로덕션에서는 절대 토큰을 하드코딩하지 마세요!
        // return process.env.GITHUB_TOKEN || '';
        return ''; // 사용자가 직접 입력해야 함
    },
    
    // 개발용 기본 토큰 (배포시에는 제거됨)
    // 주의: 이 값은 배포용에서는 비어있습니다
    devToken: '' // 배포시에는 빈 문자열
};

console.log('GitHubConfig 객체가 정의되었습니다:', {
    owner: GitHubConfig.owner,
    repo: GitHubConfig.repo,
    adminEmail: GitHubConfig.admin.email,
    hasDevToken: !!GitHubConfig.devToken
});

// 모듈 내보내기
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GitHubConfig;
} 