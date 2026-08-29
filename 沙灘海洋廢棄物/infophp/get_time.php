<?php
    $servername = 'localhost';
    $username = 'root';
    $password = 'root';
    $database = 'hi';
    
    header("Content-Type: application/json");
    
    try {
        $conn = new PDO("mysql::host=$servername;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT uploaded_at FROM uploads ORDER BY id DESC LIMIT 1";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
    
        // 獲取最新的時間資料
        $latestTime = $stmt->fetchColumn();
    
        if ($latestTime) {
            echo json_encode(["uploaded_at" => $latestTime]);
        } else {
            echo json_encode(["message" => "No records found."]);
        }

    } catch (PDOException $e) {
        echo json_encode(["error" => 'Connection failed4: ' .$e->getMessage()]);
    }

?>