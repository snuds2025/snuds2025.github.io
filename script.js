// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();
    
    // Set up navigation
    setupNavigation();
    
    // Set up mobile menu
    setupMobileMenu();
    
    // Set up smooth scrolling
    setupSmoothScrolling();
    
    // Initialize login functionality
    initializeLogin();
    
    // Initialize GitHub uploader with token
    initializeGitHubUploader();
});

// Initialize GitHub uploader with token
function initializeGitHubUploader() {
    // 토큰 없이 바로 파일 로드 (일반 사용자용)
    console.log('일반 사용자 모드로 파일을 로드합니다.');
    
    // 기본 파일 목록을 바로 로드
    setTimeout(() => {
        loadFilesFromServer();
    }, 500);
}

// Initialize the page
function initializePage() {
    // Show the first section (Syllabus) by default
    const firstSection = document.querySelector('#syllabus');
    if (firstSection) {
        firstSection.classList.add('active');
    }
    
    // Add mobile menu toggle button
    addMobileMenuToggle();
}

// Set up navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Show the target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Smooth scroll to section
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Set up mobile menu functionality
function setupMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });
}

// Add mobile menu toggle button
function addMobileMenuToggle() {
    const body = document.body;
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    body.appendChild(mobileToggle);
}

// Set up smooth scrolling
function setupSmoothScrolling() {
    // Add smooth scrolling to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Add download tracking (optional)
function trackDownload(fileName, fileType) {
    // This function can be used to track downloads
    console.log(`Download tracked: ${fileName} (${fileType})`);
    
    // You can integrate with Google Analytics or other tracking services here
    // Example:
    // gtag('event', 'download', {
    //     'event_category': 'course_materials',
    //     'event_label': fileName,
    //     'value': 1
    // });
}

// Add download event listeners
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Extract file information from the button text
            const buttonText = this.textContent.trim();
            const fileName = buttonText.replace('Download ', '').replace(' (', ' - ').replace(')', '');
            
            // Track the download
            trackDownload(fileName, 'course_material');
            
            // Add a small delay to show the tracking
            setTimeout(() => {
                // If the href is not set, show a message
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                    showNotification('File will be available soon!', 'info');
                }
            }, 100);
        });
    });
});

// Show notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'info' ? 'info-circle' : 'check-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'info' ? '#667eea' : '#28a745'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
    
    // Arrow keys for navigation (optional)
    if (e.altKey) {
        const navLinks = document.querySelectorAll('.nav-link');
        const activeIndex = Array.from(navLinks).findIndex(link => link.classList.contains('active'));
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                if (activeIndex > 0) {
                    navLinks[activeIndex - 1].click();
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (activeIndex < navLinks.length - 1) {
                    navLinks[activeIndex + 1].click();
                }
                break;
        }
    }
});

// Add loading animation for content sections
function addLoadingAnimation() {
    const sections = document.querySelectorAll('.content-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize loading animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    addLoadingAnimation();
});

// 검색 기능 제거됨

// Login and Admin Panel Functionality
let isLoggedIn = false;
let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

// Initialize login functionality
function initializeLogin() {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');
    const adminPanel = document.getElementById('adminPanel');
    const logoutBtn = document.getElementById('logoutBtn');
    const uploadBtn = document.getElementById('uploadBtn');

    // Show login modal
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
    });

    // Close modal when clicking X
    closeBtn.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const githubToken = document.getElementById('loginGithubToken').value;
        
        // Check credentials using config
        if (email === GitHubConfig.admin.email && password === GitHubConfig.admin.password) {
            isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            loginModal.style.display = 'none';
            
            // GitHub 토큰이 입력된 경우 설정
            if (githubToken) {
                setGitHubToken(githubToken);
                setFolderInitializerToken(githubToken);
                showNotification('관리자로 로그인되었습니다! GitHub 토큰도 설정되었습니다.', 'success');
            } else if (GitHubConfig.devToken) {
                // 개발용 토큰이 있으면 자동 설정 (실제 운영시에는 제거)
                setGitHubToken(GitHubConfig.devToken);
                setFolderInitializerToken(GitHubConfig.devToken);
                showNotification('관리자로 로그인되었습니다! (개발용 토큰 자동 설정)', 'success');
            } else {
                showNotification('관리자로 로그인되었습니다! (GitHub 토큰 없이)', 'success');
            }
            
            showAdminPanel();
        } else {
            showNotification('잘못된 이메일 또는 비밀번호입니다.', 'error');
        }
    });

    // Handle logout
    logoutBtn.addEventListener('click', function() {
        isLoggedIn = false;
        localStorage.removeItem('isLoggedIn');
        hideAdminPanel();
        showNotification('로그아웃되었습니다.', 'info');
    });

    // Handle token setting
    const setTokenBtn = document.getElementById('setTokenBtn');
    setTokenBtn.addEventListener('click', function() {
        const token = document.getElementById('githubToken').value;
        if (token) {
            setGitHubToken(token);
            setFolderInitializerToken(token);
            showNotification('GitHub 토큰이 설정되었습니다!', 'success');
        } else {
            showNotification('토큰을 입력해주세요.', 'error');
        }
    });

    // Handle file upload
    uploadBtn.addEventListener('click', function() {
        if (!githubUploader) {
            showNotification('먼저 GitHub 토큰을 설정해주세요.', 'error');
            return;
        }
        uploadFile();
    });

    // Check if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        isLoggedIn = true;
        showAdminPanel();
    }
}

// Show admin panel
function showAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    adminPanel.style.display = 'block';
    updateUploadedFilesList();
}

// Hide admin panel
function hideAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    adminPanel.style.display = 'none';
}

// Upload file function
function uploadFile() {
    const category = document.getElementById('fileCategory').value;
    const title = document.getElementById('fileTitle').value;
    const description = document.getElementById('fileDescription').value;
    const date = document.getElementById('fileDate').value;
    const fileInput = document.getElementById('fileUpload');
    
    if (!category || !title || !description || !date || !fileInput.files[0]) {
        showNotification('모든 필드를 입력해주세요.', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    
    // Show loading notification
    showNotification('파일을 업로드하고 있습니다...', 'info');
    
    // Upload to GitHub using API
    githubUploader.uploadFile(file, category, title, description, date)
    .then(data => {
        if (data.success) {
            // Add to uploaded files array
            uploadedFiles.push(data.fileInfo);
            localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
            
            // Add to main page
            addFileToMainPage(data.fileInfo);
            
            // Clear form
            document.getElementById('fileCategory').value = '';
            document.getElementById('fileTitle').value = '';
            document.getElementById('fileDescription').value = '';
            document.getElementById('fileDate').value = '';
            document.getElementById('fileUpload').value = '';
            
            // Update uploaded files list
            updateUploadedFilesList();
            
            showNotification('파일이 GitHub 저장소에 성공적으로 업로드되었습니다!', 'success');
        } else {
            showNotification(data.message || '파일 업로드에 실패했습니다.', 'error');
        }
    })
    .catch(error => {
        console.error('Upload error:', error);
        showNotification('파일 업로드 중 오류가 발생했습니다.', 'error');
        
        // Fallback to local storage only
        const fileId = Date.now().toString();
        const fileObj = {
            id: fileId,
            category: category,
            title: title,
            description: description,
            date: date,
            fileName: file.name,
            fileSize: file.size,
            uploadDate: new Date().toISOString()
        };
        
        uploadedFiles.push(fileObj);
        localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
        addFileToMainPage(fileObj);
        updateUploadedFilesList();
        showNotification('파일 정보가 로컬에 저장되었습니다. (실제 파일은 GitHub에 저장되지 않음)', 'warning');
    });
}

// Add file to main page
function addFileToMainPage(fileObj) {
    const categoryMap = {
        'lecture-notes': 'lecture-notes-grid',
        'homework': 'homework-grid',
        'past-exams': 'past-exams-grid'
    };
    
    const gridId = categoryMap[fileObj.category];
    if (!gridId) return;
    
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    const materialCard = document.createElement('div');
    materialCard.className = 'material-card';
    materialCard.setAttribute('data-file-id', fileObj.id);
    materialCard.innerHTML = `
        <div class="material-header">
            <h3>${fileObj.title || fileObj.fileName}</h3>
            <span class="date">${formatDate(fileObj.date)}</span>
        </div>
        <div class="material-content">
            <p>${fileObj.description || '설명이 없습니다.'}</p>
            <div class="download-buttons">
                <a href="#" class="btn btn-primary" onclick="downloadFile('${fileObj.id}')">
                    <i class="fas fa-download"></i> Download
                </a>
            </div>
        </div>
    `;
    
    grid.appendChild(materialCard);
}

// Update uploaded files list in admin panel
function updateUploadedFilesList() {
    const filesList = document.getElementById('uploadedFilesList');
    filesList.innerHTML = '';
    
    uploadedFiles.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <h4>${file.title}</h4>
                <p>${file.description} - ${file.category} - ${formatDate(file.date)}</p>
            </div>
            <div class="file-actions">
                <button class="delete-btn" onclick="deleteFile('${file.id}')">
                    <i class="fas fa-trash"></i> 삭제
                </button>
            </div>
        `;
        filesList.appendChild(fileItem);
    });
}

// Delete file function
function deleteFile(fileId) {
    if (confirm('이 파일을 삭제하시겠습니까?')) {
        const file = uploadedFiles.find(f => f.id === fileId);
        
        if (file && file.sha) {
            // GitHub에서 파일 삭제
            const filePath = `uploads/${file.category}/${file.id}_${file.fileName}`;
            githubUploader.deleteFile(filePath, file.sha)
            .then(data => {
                if (data.success) {
                    uploadedFiles = uploadedFiles.filter(f => f.id !== fileId);
                    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
                    updateUploadedFilesList();
                    loadUploadedFiles(); // Reload main page
                    showNotification('파일이 GitHub에서 삭제되었습니다.', 'success');
                } else {
                    showNotification('파일 삭제에 실패했습니다: ' + data.message, 'error');
                }
            })
            .catch(error => {
                console.error('Delete error:', error);
                showNotification('파일 삭제 중 오류가 발생했습니다.', 'error');
            });
        } else {
            // 로컬 파일만 삭제
            uploadedFiles = uploadedFiles.filter(f => f.id !== fileId);
            localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
            updateUploadedFilesList();
            loadUploadedFiles(); // Reload main page
            showNotification('파일이 로컬에서 삭제되었습니다.', 'info');
        }
    }
}

// Load uploaded files to main page
function loadUploadedFiles() {
    // Clear existing dynamic content (only cards with data-file-id attribute)
    const grids = ['lecture-notes-grid', 'homework-grid', 'past-exams-grid'];
    grids.forEach(gridId => {
        const grid = document.getElementById(gridId);
        if (grid) {
            // Only remove dynamically added cards, keep static HTML content
            const dynamicCards = grid.querySelectorAll('.material-card[data-file-id]');
            dynamicCards.forEach(card => card.remove());
        }
    });
    
    // Add uploaded files
    uploadedFiles.forEach(file => {
        addFileToMainPage(file);
    });
    
    console.log('Loaded files to main page:', uploadedFiles.length);
}

// Load files from GitHub
function loadFilesFromServer() {
    console.log('GitHub에서 최신 파일을 로드합니다...');
    
    // GitHub 업로더가 없으면 생성 (토큰 없이)
    if (!githubUploader) {
        githubUploader = new GitHubFileUploader(
            null, // 토큰 없음
            GitHubConfig.owner, // 저장소 소유자
            GitHubConfig.repo, // 저장소 이름
            GitHubConfig.branch // 브랜치
        );
    }
    
    // GitHub에서 파일 목록 가져오기
    githubUploader.getFiles()
    .then(data => {
        console.log('GitHub response:', data);
        if (data.success && data.files && data.files.length > 0) {
            console.log('Found files:', data.files);
            console.log('Number of files:', data.files.length);
            
            // 각 파일의 정보를 자세히 로그
            data.files.forEach((file, index) => {
                console.log(`File ${index + 1}:`, {
                    id: file.id,
                    category: file.category,
                    title: file.title,
                    fileName: file.fileName,
                    filePath: file.filePath
                });
            });
            
            // GitHub 파일을 사용 (최신 파일)
            uploadedFiles = data.files;
            localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
            
            // Clear and reload main page
            loadUploadedFiles();
            
            // Update admin panel
            if (isLoggedIn) {
                updateUploadedFilesList();
            }
            
            // showNotification(`${data.files.length}개의 파일을 로드했습니다.`, 'success');
                        
            showNotification(`새로 고침 완료`, 'info');
        } else {
            console.log('No files found or error:', data);
            // GitHub에서 파일을 가져올 수 없으면 빈 배열 사용
            uploadedFiles = [];
            localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
            loadUploadedFiles();
            showNotification('GitHub에서 파일을 찾을 수 없습니다.', 'info');
        }
    })
    .catch(error => {
        console.error('GitHub files not available:', error);
        // 오류 발생 시에도 빈 배열 사용
        uploadedFiles = [];
        localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
        loadUploadedFiles();
        showNotification('GitHub 연결에 실패했습니다.', 'info');
    });
}

// Download file function
function downloadFile(fileId) {
    console.log('downloadFile called with fileId:', fileId);
    console.log('uploadedFiles:', uploadedFiles);
    
    const file = uploadedFiles.find(f => f.id === fileId);
    console.log('Found file:', file);
    
    if (file) {
        if (file.filePath) {
            console.log('Downloading file:', file.filePath);
            console.log('File name:', file.fileName);
            
            // GitHub raw file URL로 변환
            let downloadUrl = file.filePath;
            console.log('Original URL:', downloadUrl);
            
            // GitHub blob URL을 raw URL로 변환
            if (downloadUrl.includes('github.com') && downloadUrl.includes('/blob/')) {
                downloadUrl = downloadUrl.replace('/blob/', '/raw/');
                console.log('Converted to raw URL:', downloadUrl);
            }
            
            // CORS 문제를 피하기 위해 직접 새 탭에서 열기
            console.log('Opening file in new tab:', downloadUrl);
            window.open(downloadUrl, '_blank');
            showNotification(`${file.fileName} 파일을 새 탭에서 열었습니다.`, 'success');
        } else {
            // Local storage file (no actual file)
            console.log('No filePath found in file object');
            showNotification('이 파일은 로컬에만 저장되어 있어 실제 다운로드가 불가능합니다.', 'warning');
        }
    } else {
        console.log('File not found in uploadedFiles array');
        showNotification('파일을 찾을 수 없습니다.', 'error');
    }
}

// Format date function
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Enhanced notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconMap = {
        'info': 'info-circle',
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle'
    };
    
    const colorMap = {
        'info': '#667eea',
        'success': '#28a745',
        'error': '#dc3545',
        'warning': '#ffc107'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${iconMap[type] || 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colorMap[type] || '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize login functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeLogin();
    
    // 페이지 로드 시 파일 자동 로드 (토큰 없이)
    console.log('페이지 로드 완료. 파일을 자동으로 로드합니다.');
});
