<?php
// 此為上傳圖片並呼叫偵測PY檔
// 由index.html呼叫
    $servername = 'localhost';
    $username = 'root';
    $password = 'root';
    $database = 'hi';

    try {
        $conn = new PDO ("mysql:host=$servername;dbname=$database", $username, $password);
        //告訴PDO錯誤該採取哪種行為，遇到錯誤應該拋出PDOException
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if(isset($_FILES['file'])) {
                if($_FILES['file']['error'] === UPLOAD_ERR_OK) {
                    $uploadOK = 1;
                    $beachName = isset($_POST['beachName']) ? $_POST['beachName']: 'error';
                    $allowedBeaches = ['01_菓葉沙灘', '02_龍門後灣', '03_龍門福德廟', '04_岐頭沙灘', '05_後寮沙灘', '06_講美沙灘', '07_中屯沙灘'];
                    if (!in_array($beachName, $allowedBeaches)) {
                        echo "Beach doesn't exist" . '<br>'. $beachName;
                        $uploadOK = 0;
                    }
                    $beachName_num = explode('_', $beachName)[0];
                    
                    //$uploadDir = __DIR__ . '/../' . $beachName . '/uploads/';
                    $uploadDir =  '../' . $beachName . '/uploads/';
                    $time = date("Y-m-d_H-i-s");
                    $uploadFile = $uploadDir .  $time . '_' .basename($_FILES['file']['name']);
                    //$uploadOK = 1;

                    //拿副檔名並轉小寫
                    $fileExtension = strtolower(pathinfo($uploadFile, PATHINFO_EXTENSION));
                 
                    if($_FILES['file']['size'] > 41943040) {
                        //上傳檔案大小限制
                        echo "File exceeds maximum size";
                        $uploadOK = 0;
                    }
                    
                    $check = getimagesize($_FILES['file']['tmp_name']);
                    if($check === false) {
                        //檔案是否為圖片
                        echo "File is not an image";
                        $uploadOK = 0;
                    }

                    $allowedType = array("jpg", "jpeg", "png", "gif", "bmp");
                    if(!in_array($fileExtension, $allowedType)) {
                        //允許上傳檔案的類型
                        echo "File type is wrong";
                        $uploadOK = 0;
                    }

                    if($uploadOK == 0) {
                        echo "Something is wrong".$uploadOK;
                    } else {
                        if ($_FILES['file']['error'] == UPLOAD_ERR_OK) {
                        if(move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
                            //將臨時文件移動到指定位置，並上傳圖片名 時間跟路徑至資料庫
                            
                            $filename = $time . "_" . basename($_FILES['file']['name']);
                            $filepath = $uploadFile;
                            $filetime = $_POST['date'];
                            


                            $query = $conn->prepare("INSERT INTO uploads(file_name, file_path, uploaded_at, beach) VALUES(:file_name, :file_path, :file_time, :beachName_num)");
                            $query->bindParam(':file_name', $filename);
                            $query->bindParam(':file_path', $filepath);
                            $query->bindParam(':file_time', $filetime);
                            $query->bindParam(':beachName_num', $beachName_num);

                            if($query->execute()) {
                                //echo "success";
                                $lastId = $conn->lastInsertId();
                                //echo $lastId ;
                                header("Location: ../$beachName/index.html?id=" . $lastId);
                            } else {
                                echo "fail";
                                echo "Database error: " . $errorInfo[2];
                            }
                                // 設定要傳給PY檔的資料
                                $python_script = 'newpredict2.py'; 
                                $es_py = escapeshellarg($python_script);
                                $dataset_name = 'uploads';
                                $test_img = $filename;
                                // 呼叫YOLO偵測程式碼
                                $command = "python $es_py $dataset_name $test_img $beachName_num 2>&1";
                                exec($command, $output, $return_var);
                                if ($return_var === 0) {
                                    echo "ok py";
                                } else {
                                    echo "fail py";
                                }

                        } else {
                            echo "File upload fail" ;
                            $error = error_get_last();
                            echo "File move failed: " . $error['message'];
                        }
                        } else {
                            echo "File upload error: " . $_FILES['file']['error'];
                        }
                    }



                } else {
                    $error_code = $_FILES['file']['error'];
                    echo "File upload error" . $error_code;
                }
            } else {
                echo "No file or invalid request";
            }
        }

    } catch(PDOException $exception) {
        echo "Connect error1: " . $exception->getMessage(); 
    }



    $conn = null;
?>