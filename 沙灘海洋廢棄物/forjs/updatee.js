// 此為控制廢棄物統計頁面的數量顯示及表格
// 使用 AJAX 載入 updateChart.php 的輸出

function fetchData() {
  console.log("fetchData 函數被調用");

  const beach = document.getElementById("locations").value;
  const startDate = document.getElementById("datepicker-start").value;
  const endDate = document.getElementById("datepicker-end").value;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../infophp/updateChart.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    if (xhr.status === 200) {
      //檢查狀態碼：如果狀態碼為 200，表示請求成功
      const data = JSON.parse(xhr.responseText);
      updateChart(data);
      updateTotalCount(data.total);
    } else {
      console.error("Failed to fetch data:", xhr.statusText);
    }
  };
  xhr.send(`start_date=${startDate}&end_date=${endDate}&beach=${beach}`);
}

function updateChart(data) {
  const chartData = [
    data.竹子,
    data.桶子,
    data.浮標與浮球,
    data.玻璃瓶,
    data.安全帽,
    data.鐵桶,
    data.鐵罐,
    data.救生圈,
    data.燈管,
    data.漁網,
    data.其他塑膠,
    data.塑膠籃,
    data.塑膠瓶,
    data.繩子,
    data.拖鞋,
    data.保麗龍,
    data.輪胎,
    data.其他垃圾,
    data.管子,
    data.鋁箔包,
  ];

  myChart.data.datasets[0].data = chartData;
  myChart.update();
}

function updateTotalCount(total) {
  document.getElementById("totalCount").textContent = total;
}
