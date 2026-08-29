<?php
// 此為控制顯示在各沙灘的表格
// 由initializee.js呼叫
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// 連接到資料庫
$servername = "localhost"; 
$username = "root";
$password = "root";
$dbname = "hi";
$conn = new mysqli($servername, $username, $password, $dbname);
// 檢查連接是否成功
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$beach = $_GET['beach'];
// 從資料庫查詢資料
$sql = "SELECT file_path,prefile_path,uploaded_at,保麗龍,桶子,浮標與浮球,鐵桶,救生圈,漁網,塑膠瓶,塑膠籃,繩子,輪胎,管子,拖鞋,鐵罐,鋁箔包,玻璃瓶,燈管,安全帽,竹子,其他塑膠,其他垃圾 FROM uploads WHERE beach = '$beach'"; 
$result = $conn->query($sql);
// 檢查查詢是否成功
if (!$result) {
    die("Query failed: " . $conn->error); // 顯示查詢錯誤訊息
}

// 輸出資料 (不包含 HTML 標籤)
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $statsData = array( // 將統計數據整理成陣列
            $row["竹子"], $row["桶子"], $row["浮標與浮球"], $row["玻璃瓶"], 
            $row["安全帽"], $row["鐵桶"], $row["鐵罐"], $row["救生圈"], 
            $row["燈管"], $row["漁網"], $row["其他塑膠"], $row["塑膠籃"], 
            $row["塑膠瓶"], $row["繩子"], $row["拖鞋"], $row["保麗龍"], 
            $row["輪胎"], $row["其他垃圾"], $row["管子"], $row["鋁箔包"]
        );
        echo $row["uploaded_at"].",,,".$row["file_path"].",,,".$row["prefile_path"].",,,".json_encode($statsData)."\n"; 
    }
} else {
    echo "0 results";
}

// 關閉資料庫連接
$conn->close();
?>