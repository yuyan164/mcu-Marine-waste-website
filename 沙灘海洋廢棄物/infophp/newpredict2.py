# -*- coding: utf-8 -*-
## 此為控制偵測模型、畫圖及更新廢棄物數量
##  由connectt.php呼叫

import pymysql
import sys
from ultralytics import YOLO
import io
import json
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
import matplotlib.image as mpimg
#基本設置
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
font = FontProperties(fname="GenSenRounded2-M.ttc")
model = YOLO('../model/10-v22-v1.pt')  

#中文對應
TW_dict = {
    0: "鋁箔包", 1: "竹子", 2: "桶子", 3: "浮標與浮球",
    4: "玻璃瓶", 5: "安全帽", 6: "鐵桶", 7: "鐵罐",
    8: "救生圈", 9: "燈管", 10: "漁網", 11: "其他塑膠",
    12: "塑膠籃", 13: "塑膠瓶", 14: "繩子",15: "拖鞋", 
    16: "保麗龍", 17: "輪胎", 18: "其他垃圾", 19: "管子"
}

#顏色對應
color_dict = {
    0: "#FF6347",  # 猩紅色
    1: "#7FFF00",  # 春綠色
    2: "#808000",  # 深藍色 (海軍藍)
    3: "#FF4500",  # 橙色
    4: "#DA70D6",  # 紫羅蘭色
    5: "#FFFF00",  # 黃色
    6: "#800080",  # 紫色
    7: "#FFA500",  # 橙色 
    8: "#FFC0CB",  # 粉紅色
    9: "#808080",  # 灰色
    10: "#ADD8E6",  # 淺藍色
    11: "#00008B",  # 深藍色
    12: "#A52A2A",  # 棕色
    13: "#191970",  # 金色
    14: "#C0C0C0",  # 銀色
    15: "#00FFFF",  # 青色
    16: "#8B008B",  # 深紫色
    17: "#FFD700",  # 橄欖綠
    18: "#FF69B4",  # 桃紅色
    19: "#E6E6FA"  # 薰衣草色
}

#連線資料庫
try:
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='root',
        database='hi',
        charset='utf8mb4' 
    )
    print("OK, py 連接成功")
except pymysql.Error as e:
    print(f"NO, py 連接失敗: {e}")
    sys.exit(1)  

# 檢查是否有傳遞參數 (如果需要)
if len(sys.argv) > 1:
    arguments = sys.argv[1:]
    print("從 PHP 接收到的參數:", arguments)

#建立SQL搜索物件
cursor = connection.cursor()
query = f"SELECT MAX(id) FROM {arguments[0]}"
cursor.execute(query)
maxID = cursor.fetchone()[0]

#拿取新上傳物件
try:
    query = f"SELECT file_path FROM {arguments[0]} WHERE id = {maxID}"
    cursor.execute(query)
except pymysql.Error as e:
    print(f"查詢執行失敗: {e}")
    sys.exit(1)  

# 取得全部結果
results = cursor.fetchall()
file_name = results[0][0]
img = mpimg.imread(file_name)

# predict
pre_results = model.predict(source=file_name,save=True )  

# 從 results 中獲取偵測到的物件資訊
#predictions = pre_results[0].boxes.data.cpu().numpy() 
json_result = pre_results[0].tojson()
pre_data = json.loads(json_result)

# 建立字典存預測結果
object_counts = {class_name: 0 for class_name in range(20)}

# 提取物件類別、數量和置信度，以及畫中文標籤圖
plt.imshow(img)
width, height = img.shape[:2]
for obj in pre_data:
    namenum = obj['class']     
    name = TW_dict[namenum]
    confidence = obj['confidence']
    box = obj['box']
    x1, y1, x2, y2 = int(box['x1']), int(box['y1']), int(box['x2']), int(box['y2'])
    x0, y0, ha0, va0 = x1 , y1-30, 'left', 'bottom'
    # 畫框
    rect = plt.Rectangle((x1, y1), x2-x1, y2-y1, fill=False, edgecolor=color_dict[namenum], linewidth=1)
    plt.gca().add_patch(rect)
    # 寫文字
    if x1+420 > height : x0, ha0 = x2, 'right'
    if y1-53  <  40 : y0, va0 = y2, 'top'
    plt.text(x0, y0, name, color='#FFFFFF', fontsize=5, ha=ha0,va=va0,
             fontproperties=font,bbox=dict(facecolor=color_dict[namenum],alpha=0.5, linewidth=0))
    object_counts[namenum] += 1  # 直接增加計數

# 显示图像
plt.axis('off')
savedir = f"{pre_results[0].save_dir.replace("\\", "\\\\")}\\\\results.jpg"
plt.savefig(savedir,bbox_inches='tight', pad_inches=0.0, dpi=1080)  

# 更新資料庫廢棄物數量及預測圖位置
try:
    #query = f"UPDATE {arguments[0]} SET prefile_path = '..\\\\infophp\\\\{savedir}' WHERE file_name = '{arguments[1]}' AND beach = '{arguments[2]}'"
    
    query = f"UPDATE {arguments[0]} SET prefile_path = '..\\\\infophp\\\\{savedir}' WHERE id = {maxID}"
    cursor.execute(query)

    for cname, count in object_counts.items():
        query = f"UPDATE {arguments[0]} SET {TW_dict[cname]} = {count} WHERE id = {maxID}" 
        cursor.execute(query)
    # 提交更改
    print("資料庫更新成功")
except pymysql.Error as e:
    print(f"資料庫更新失敗: {e}")

# 關閉 cursor 和連線
connection.commit()
cursor.close()
connection.close()