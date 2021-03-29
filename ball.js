window.addEventListener("load",()=>{
    const ball = document.getElementById("ball");
    const noimgspan = document.getElementById("noimgspan");
    const messagepng = document.getElementById("messagepng");
    let ballx = 0;
    let bally = 0;
    let ballr = 0;
    let arrowx = 1;
    let arrowy = 1;
    let startin;
    let dancein;
    function start(){
        startin = setInterval(() => {
            if(ballx < 0 || ballx > 1230){

                arrowx = -1*arrowx;
                if(ballx < 0){
                    ballx = 10;
                }
                if(ballx > 1230){
                    ballx = 1220;
                }
            }
            if(bally <0||bally > 480){

                arrowy = -1*arrowy;
                if(bally < 0){
                    bally = 10;
                }
                if(bally > 480){
                    bally = 470;
                }
            }
            ballx = ballx + 10*arrowx;
            bally = bally + 10*arrowy;
        }, 10);
    }
    function end(){
        clearInterval(startin);
        clearInterval(dancein);
    }
    function dance(){
        dancein = setInterval(()=>{
            ballr = ballr + 5;
        },10)
    } //回る

    const draw = setInterval(() => {
        ball.style.top = bally+"px";
        ball.style.left = ballx+"px";
        ball.style.transform = "rotate("+ballr+"deg)";
    }, 10);//描画開始

    document.addEventListener('keydown', (event) => {
        if(event.key=="z"){
            start();
        }
        if(event.key=="x"){
            end();
        }
        if(event.key=="c"){
            dance();
        }
    }, false);//key

    //画像最適化
    function imgOptimization(){
        const uploadlabel = document.getElementById("uploadlabel");
        const imguploads = document.getElementById("imguploads");
        const imageicon = document.getElementsByClassName("imageicon");
        const imageplusicon = document.getElementsByClassName("imageplus-icon");

        imguploads.addEventListener('change',()=>{
            const prevzone = document.getElementById("imgprev");
            const sizelimit = 3000000;
            function previewFile(file) {
                const reader = new FileReader();
                // URLとして読み込まれたときに実行する処理
                reader.onload = function (e) {
                    const imageUrl = e.target.result; // URLはevent.target.resultで呼び出せる
                    const img = new Image(); // img要素を作成
                    img.src = imageUrl; // URLをimg要素にセット
                    if(prevzone.hasChildNodes()){
                        prevzone.removeChild(prevzone.firstChild);
                    }
                    ball.style.border = "none";
                    noimgspan.style.display = "none";
                    messagepng.style.display = "none";
                    prevzone.appendChild(img); // #previewの中に追加
                }
                reader.readAsDataURL(file);
            }

            const handleImageSelect = ()=>{
                const im = imguploads.files[0];
                if(im.size>sizelimit){
                    alert("ファイルが大きすぎます");
                }else if(im.size<=sizelimit){
                    console.log(im);
                    previewFile(im);
                }
            }

            handleImageSelect();
            imageicon[0].style.opacity = "0";
            imageplusicon[0].style.opacity = "0";
            uploadlabel.addEventListener("mouseover",()=>{
                imageicon[0].style.opacity = "1";
                imageplusicon[0].style.opacity = "1";
            })
            uploadlabel.addEventListener("mouseleave",()=>{
                imageicon[0].style.opacity = "0";
                imageplusicon[0].style.opacity = "0";
            })
        });
    }
    imgOptimization();
})