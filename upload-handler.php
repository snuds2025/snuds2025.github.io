<?php
// 파일 업로드 핸들러
header('Content-Type: application/json');

// 업로드 디렉토리 설정
$uploadDir = 'uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// 카테고리별 하위 디렉토리
$categories = ['lecture-notes', 'homework', 'past-exams'];
foreach ($categories as $category) {
    $categoryDir = $uploadDir . $category . '/';
    if (!file_exists($categoryDir)) {
        mkdir($categoryDir, 0755, true);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ['success' => false, 'message' => ''];
    
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['file'];
        $category = $_POST['category'] ?? '';
        $title = $_POST['title'] ?? '';
        $description = $_POST['description'] ?? '';
        $date = $_POST['date'] ?? '';
        
        // 파일 확장자 검사
        $allowedExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'txt', 'zip', 'rar'];
        $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        
        if (!in_array($fileExtension, $allowedExtensions)) {
            $response['message'] = '허용되지 않는 파일 형식입니다.';
            echo json_encode($response);
            exit;
        }
        
        // 파일명 생성 (중복 방지)
        $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', $file['name']);
        $filePath = $uploadDir . $category . '/' . $fileName;
        
        if (move_uploaded_file($file['tmp_name'], $filePath)) {
            // 파일 정보를 JSON 파일에 저장
            $fileInfo = [
                'id' => time(),
                'category' => $category,
                'title' => $title,
                'description' => $description,
                'date' => $date,
                'fileName' => $file['name'],
                'filePath' => $filePath,
                'fileSize' => $file['size'],
                'uploadDate' => date('Y-m-d H:i:s')
            ];
            
            $filesList = 'files-list.json';
            $existingFiles = [];
            if (file_exists($filesList)) {
                $existingFiles = json_decode(file_get_contents($filesList), true) ?? [];
            }
            $existingFiles[] = $fileInfo;
            file_put_contents($filesList, json_encode($existingFiles, JSON_PRETTY_PRINT));
            
            $response['success'] = true;
            $response['message'] = '파일이 성공적으로 업로드되었습니다.';
            $response['fileInfo'] = $fileInfo;
        } else {
            $response['message'] = '파일 업로드에 실패했습니다.';
        }
    } else {
        $response['message'] = '파일 업로드 오류가 발생했습니다.';
    }
    
    echo json_encode($response);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // 파일 목록 조회
    $filesList = 'files-list.json';
    if (file_exists($filesList)) {
        $files = json_decode(file_get_contents($filesList), true) ?? [];
        echo json_encode(['success' => true, 'files' => $files]);
    } else {
        echo json_encode(['success' => true, 'files' => []]);
    }
}
?>
