<?php
// 此為此為控制廢棄物統計頁面的數量顯示及表格
// 由updatee.js呼叫
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "hi";

// 連接到資料庫
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// 取得來自JS的日期和沙灘
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];
$BN = $_POST['beach'];
//搜尋廢棄物數量
$sql = "
    SELECT
        SUM(保麗龍) AS 保麗龍,
        SUM(桶子) AS 桶子,
        SUM(浮標與浮球) AS 浮標與浮球,
        SUM(鐵桶) AS 鐵桶,
        SUM(救生圈) AS 救生圈,
        SUM(漁網) AS 漁網,
        SUM(塑膠瓶) AS 塑膠瓶,
        SUM(塑膠籃) AS 塑膠籃,
        SUM(繩子) AS 繩子,
        SUM(輪胎) AS 輪胎,
        SUM(管子) AS 管子,
        SUM(拖鞋) AS 拖鞋,
        SUM(鐵罐) AS 鐵罐,
        SUM(鋁箔包) AS 鋁箔包,
        SUM(玻璃瓶) AS 玻璃瓶,
        SUM(燈管) AS 燈管,
        SUM(安全帽) AS 安全帽,
        SUM(竹子) AS 竹子,
        SUM(其他塑膠) AS 其他塑膠,
        SUM(其他垃圾) AS 其他垃圾 
    FROM uploads
    WHERE beach = ?
    AND uploaded_at BETWEEN ? AND ?
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $BN, $start_date, $end_date);
$stmt->execute();

if ($stmt->error) {
    error_log("SQL Error: " . $stmt->error); // Log the error
    die("Internal Server Error"); // Or return an error response to the client
}

$result = $stmt->get_result();
$data = $result->fetch_assoc();

// 計算總數量
$total = array_sum($data);

// 打包
$data['total'] = $total;

// 傳回JS
echo json_encode($data);

// 關閉連結
$stmt->close();
$conn->close();
?>
