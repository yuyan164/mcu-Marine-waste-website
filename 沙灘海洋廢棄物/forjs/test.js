function show_details(id){
    if(document.getElementById("list-detail-"+id).style.display=="none"){
        document.getElementById("list-detail-"+id).style.display= "block";
    }else{
        document.getElementById("list-detail-"+id).style.display= "none";
    }
}

function getParam(param) {
    const urlParam = new URLSearchParams(window.location.search);
    return urlParam.get(param);
}

function saveBeachName() {
    const beachName = getParam('beachName');
    if (beachName) {
        localStorage.setItem('beachName', beachName);
    }
}

function setBeachName() {
    const beachName = localStorage.getItem('beachName');
    if(beachName) {
        document.getElementById('beachName').value = beachName;
    }
}

function loadTable() {
    fetch('../infophp/table.php')
        .then(response => {
            if(!response.ok) {
                throw new Error('not OK');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('table-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Error: ', error);
        });
}

function loadTime() {
    fetch('../infophp/get_time.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('not ok');
            }
            return response.json();
        })
        .then (data => {
            if (data.uploaded_at) {
                document.querySelector('.datetime').innerText = data.uploaded_at;
            } else {
                document.querySelector('.datetime').innerText = 'something wrong';
            }
        })
        .catch(error => {
            console.error('Error: ', error);
            document.querySelector('.datetime').innerText = 'Error loading date';
        });
}
//上傳圖片的
function loadImg() {
    fetch('../infophp/get_image.php')
        .then(response => response.json())
        .then(data => {
            const imageContainer = document.getElementById('imageContainer');
            //const newImageDiv = document.createElement('div');
            //imageContainer.innerHTML = ''; // 清空容器中的内容

            if (data.filepath) {
                const path = "D:\\newXampp\\htdocs";
                let cleanpath = data.filepath.replace(path, '');
                cleanpath = cleanpath.replace(/\\\\/g, '\\').replace(/\\\//g, '/');

                const colDiv = document.createElement('div');
                colDiv.className = 'col';
                
                const newImg = document.createElement('img');
                newImg.className = 'pp';
                newImg.src = cleanpath;
                newImg.style.display = 'block';
                //console.log('Inserting image with src:', cleanpath);

                colDiv.appendChild(newImg);
                if (imageContainer.firstChild) {
                    imageContainer.insertBefore(colDiv, imageContainer.firstChild);
                } else {
                    imageContainer.appendChild(colDiv);
                }
                //newImageDiv.appendChild(colDiv);
                //imageContainer.insertBefore(newImageDiv, imageContainer.firstChild);
                
            } else {
                console.error('No image found:', data.error);
            }
            //console.log('ejflaskdf' ,data);
        })
        
        .catch(error => {
            console.error('Error fetching image:', error);
        });
}
window.addEventListener('load', () => {
						saveBeachName();
						setBeachName();
					});
					window.addEventListener('load', loadTable);
        			window.addEventListener('load', loadTime);		
					window.addEventListener('load', loadImg);


//這個也是控制上傳的
function uploadImage() {
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('date', document.querySelector('input[name=date]').value);
        formData.append('beachName', document.getElementById('beachName').value);

        fetch('connect.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            loadImg(); // 調用 loadImg 以更新顯示
        })
        .catch(error => console.error('Error:', error));
    }
}

function show_upload(){
    document.getElementById("upload").style.display = "flex";
}
function unshow_upload(){
    document.getElementById("upload").style.display = "none";
}
function no_action(){
    event.stopPropagation();
}