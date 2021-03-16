window.onload = function(){
     let img;
     let containerImg;
     let textFileOrDirectory;
     let link;
     const container = document.querySelector('.container');
     fetch('http://localhost:8080/home')
        .then(homeDirectory => {
            return homeDirectory.json()
        })
        .then(resourceJSON => {
            Object.keys(resourceJSON[0]).forEach(typeData => {
                resourceJSON[0][typeData].forEach(data => {
                    console.log(data);
                    img = document.createElement('img');
                    textFileOrDirectory = document.createTextNode(data.name);
                    link = document.createElement('a');
                    link.appendChild(textFileOrDirectory);
                    link.href = `http://localhost:8080/${data.name}`;
                    containerImg = document.createElement('div');
                    containerImg.setAttribute('class', 'containerImg');
                    containerImg.appendChild(img);
                    containerImg.appendChild(link);
                    if(typeData === 'folders'){
                        img.src = 'img/folder.png'
                        img.setAttribute('class', 'data')
                        img.height = "20";
                        container.appendChild(containerImg);
                    }else{
                        img.src = 'img/file.png'
                        img.height = "20";
                        container.appendChild(containerImg);
                    }
                });
            });
        })
}