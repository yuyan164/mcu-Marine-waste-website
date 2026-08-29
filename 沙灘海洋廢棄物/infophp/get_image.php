<?php
    $servername = 'localhost';
    $username = 'root';
    $password = 'root';
    $database = 'hi';

    header("Content-Type: application/json");

    try {
        $conn = new PDO("mysql::host=$servername;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        
            $sql = "SELECT file_path FROM uploads ORDER BY id DESC LIMIT 1";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            
            $img = $stmt->fetch(PDO::FETCH_ASSOC);

            if($img) {
                echo json_encode(["file_path" => $img['file_path']], JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["error" => "No images"]);
            }

        
    } catch(PDOException $error){
        echo json_encode(['error' => 'Connection failed3: ' . $error->getMessage()]);
    }
?>