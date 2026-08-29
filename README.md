# 澎湖沙灘海洋廢棄物辨識與統計平台

本專案是一套以網頁呈現的海洋廢棄物紀錄平台，結合圖片上傳、YOLO 物件偵測、MySQL 資料儲存及視覺化統計，協助整理澎湖不同沙灘的海洋廢棄物種類與數量。

## 主要功能

- 上傳沙灘現場照片並記錄拍攝日期
- 使用 Ultralytics YOLO 模型辨識海洋廢棄物
- 將辨識數量及原始／標註圖片路徑寫入 MySQL
- 依沙灘、日期區間查詢並顯示統計資料
- 提供各沙灘的歷史紀錄與辨識結果
- 提供海洋廢棄物圖鑑與網站導覽頁面

## 支援地點

目前包含以下 7 個澎湖沙灘：

1. 菓葉沙灘
2. 龍門後灣
3. 龍門福德廟
4. 岐頭沙灘
5. 後寮沙灘
6. 講美沙灘
7. 中屯沙灘

## 辨識類別

模型可辨識 20 類海洋廢棄物：

- 鋁箔包
- 竹子
- 桶子
- 浮標與浮球
- 玻璃瓶
- 安全帽
- 鐵桶
- 鐵罐
- 救生圈
- 燈管
- 漁網
- 其他塑膠
- 塑膠籃
- 塑膠瓶
- 繩子
- 拖鞋
- 保麗龍
- 輪胎
- 其他垃圾
- 管子

## 使用技術

- 前端：HTML、CSS、JavaScript、Bootstrap
- 後端：PHP
- 資料庫：MySQL／MariaDB
- AI 辨識：Python、Ultralytics YOLO
- 圖像處理與繪圖：Matplotlib
- Python 資料庫連線：PyMySQL
- 本機伺服器環境：XAMPP（Apache、MySQL）
- 大型模型檔管理：Git LFS

## 專案結構

```text
.
├─ index.html                         # 網站首頁
├─ css/                               # 共用樣式
├─ js/                                # 共用前端程式
├─ img/                               # 網站圖片
├─ 廢棄物圖鑑/                         # 海洋廢棄物圖鑑
└─ 沙灘海洋廢棄物/
   ├─ index.html                      # 沙灘海廢功能入口
   ├─ 01_菓葉沙灘/                    # 各沙灘頁面與上傳資料
   ├─ 02_龍門後灣/
   ├─ 03_龍門福德廟/
   ├─ 04_岐頭沙灘/
   ├─ 05_後寮沙灘/
   ├─ 06_講美沙灘/
   ├─ 07_中屯沙灘/
   ├─ infophp/
   │  ├─ connectt.php                # 接收圖片、寫入資料庫並呼叫 Python
   │  ├─ initialize.php              # 取得各沙灘的歷史紀錄
   │  ├─ updateChart.php             # 查詢日期區間統計
   │  ├─ newpredict2.py              # 執行 YOLO 辨識、繪圖並更新資料庫
   │  └─ database.txt                # uploads 資料表結構參考
   └─ model/
      └─ 10-v22-v1.pt                # YOLO 模型（Git LFS）
```

## 執行環境

建議準備：

- Windows 10／11
- XAMPP（Apache、MySQL）
- PHP 8 或相容版本
- Python 3.10 或相容版本
- Git
- Git LFS

PHP 需要可使用下列功能：

- PDO MySQL
- MySQLi
- 檔案上傳
- `exec()`（PHP 會透過此函式執行 Python）

## 安裝方式

### 1. 下載專案

先安裝並啟用 Git LFS：

```powershell
git lfs install
git clone https://github.com/yuyan164/mcu-Marine-waste-website.git
cd mcu-Marine-waste-website
git lfs pull
```

確認下列模型不是只有 LFS 指標文字，而是完整模型檔：

```text
沙灘海洋廢棄物/model/10-v22-v1.pt
```

### 2. 放置網站檔案

將儲存庫內容放入 XAMPP 的 `htdocs`，或將 Apache 的網站根目錄指向本專案。

預設 XAMPP 路徑通常是：

```text
C:\xampp\htdocs
```

### 3. 安裝 Python 套件

```powershell
pip install ultralytics pymysql matplotlib
```

執行 PHP 的系統帳號必須能從命令列呼叫 `python`。可先確認：

```powershell
python --version
```

### 4. 建立資料庫

1. 啟動 XAMPP 的 Apache 與 MySQL。
2. 使用 phpMyAdmin 或 MySQL 命令列建立資料庫。
3. 依照 `沙灘海洋廢棄物/infophp/database.txt` 建立 `uploads` 資料表。
4. 修改以下檔案中的資料庫連線設定，使其符合你的環境：

   - `沙灘海洋廢棄物/infophp/connectt.php`
   - `沙灘海洋廢棄物/infophp/initialize.php`
   - `沙灘海洋廢棄物/infophp/updateChart.php`
   - `沙灘海洋廢棄物/infophp/newpredict2.py`

> 建議不要在正式環境使用 MySQL root 帳號，也不要將真實密碼提交到公開儲存庫。請建立權限受限的專用資料庫帳號，並將設定移至不受 Git 追蹤的環境設定檔。

### 5. 啟動網站

啟動 Apache 與 MySQL 後，依實際網站根目錄開啟：

```text
http://localhost/
```

沙灘廢棄物功能頁面位於：

```text
http://localhost/沙灘海洋廢棄物/
```

## 運作流程

```text
使用者上傳圖片
      ↓
PHP 驗證圖片並寫入 uploads
      ↓
PHP 呼叫 newpredict2.py
      ↓
YOLO 載入 10-v22-v1.pt 進行辨識
      ↓
產生標註結果圖並統計各類物件
      ↓
更新 MySQL
      ↓
網頁顯示紀錄與統計圖表
```

## 注意事項

- 模型檔由 Git LFS 管理，下載後請執行 `git lfs pull`。
- 圖片上傳上限在目前 PHP 程式中設為 40 MiB；XAMPP 的 `php.ini` 也必須允許相同或更大的上傳大小。
- `newpredict2.py` 使用相對路徑載入模型和字型，請保持既有目錄結構。
- 辨識產生的結果會寫入 `沙灘海洋廢棄物/infophp/runs/`。
- 若 PHP 無法啟動 Python，請檢查 Apache 執行帳號的 PATH 與 `exec()` 設定。
- 對外部署前，請移除測試資料、停用錯誤訊息公開顯示，並檢查資料庫憑證及上傳安全設定。

## 授權

目前儲存庫尚未提供授權條款。若要允許他人使用、修改或散布本專案，請另行加入合適的 `LICENSE`。
