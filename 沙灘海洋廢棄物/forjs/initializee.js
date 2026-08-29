// 此為控制各沙灘的表格展示
// 使用 AJAX 載入 initialize.php 的輸出

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = this.responseText.split("\n");
    var table = document.getElementById("myTable");
    for (var i = 0; i < data.length - 1; i++) {
      var rowData = data[i].split(",,,");

      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);

      cell1.innerHTML = rowData[0];
      var img1 = document.createElement("img"); //將圖片替代進路徑格
      img1.src = rowData[1];
      //img.alt = rowData[1];
      cell2.appendChild(img1);
      var img2 = document.createElement("img");
      img2.src = "../img/arrow.png";
      cell3.appendChild(img2);
      var img3 = document.createElement("img");
      img3.src = rowData[2];
      cell4.appendChild(img3);
      try {
        var statsData = JSON.parse(rowData[3]);
        // 創建子表格
        var subTable = document.createElement("table");
        // 定義子表格的表頭和內容（根據您的圖片內容）
        var headers = [
          "竹子",
          "桶子",
          "浮標與浮球",
          "玻璃瓶",
          "安全帽",
          "鐵桶",
          "鐵罐",
          "救生圈",
          "燈管",
          "漁網",
          "其他塑膠",
          "塑膠籃",
          "塑膠瓶",
          "繩子",
          "拖鞋",
          "保麗龍",
          "輪胎",
          "其他垃圾",
          "管子",
          "鋁箔包",
        ];
        // 創建表頭行
        var headerRow = subTable.insertRow();
        for (var j = 0; j < headers.length; j++) {
          var th = document.createElement("th");
          th.innerHTML = headers[j];
          headerRow.appendChild(th);
        }
        // 創建內容行
        var contentRow = subTable.insertRow();
        for (var k = 0; k < statsData.length; k++) {
          var td = document.createElement("td");
          td.innerHTML = statsData[k];
          contentRow.appendChild(td);
        }
        // 將子表格插入到主表格的下一列
        var newRow = table.insertRow(-1);
        var newCell = newRow.insertCell(0);
        newCell.colSpan = 4; // 讓子表格跨越4欄
        newCell.appendChild(subTable);
      } catch (error) {
        console.error("解析 JSON 時發生錯誤：", error);
        // 這裡添加處理錯誤的程式碼，在表格中顯示錯誤訊息
      }
    }
  }
};
let currentDirectory = location.pathname
  .split("/")
  .slice(-2, -1)[0]
  .split("_")[0]; // 取得倒數第二層目錄名稱
xhttp.open("GET", "../infophp/initialize.php?beach=" + currentDirectory, true);
xhttp.send();
