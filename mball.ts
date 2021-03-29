window.addEventListener("load",()=>{
    const ball:HTMLDivElement = <HTMLDivElement>document.getElementById("ball");
    let ballx:number = 0;
    let bally:number = 0;
    let ballr:number = 0;
    let arrowx:number = 1;
    let arrowy:number = 1;
    let startin;//setinterval
    let dancein;//setinterval
    let endx:number = window.outerWidth-150;
    let endy:number = window.outerHeight-150;

    let opacityflag;//settimeout
    let touchflag:boolean = false;

    function start():void{
        startin = setInterval(() => {
            if(ballx < 0 || ballx > endx){

                arrowx = -1*arrowx;
                if(ballx < 0){
                    ballx = 10;
                }
                if(ballx > endx){
                    ballx = endx - 10;
                }
            }
            if(bally <0||bally > endy){

                arrowy = -1*arrowy;
                if(bally < 0){
                    bally = 10;
                }
                if(bally > endy){
                    bally = endy-10;
                }
            }
            ballx = ballx + 5*arrowx;
            bally = bally + 5*arrowy;
        }, 10);
    } //動く
    function end():void{
        clearInterval(startin);
        clearInterval(dancein);
    } //停止
    function dance():void{
        dancein = setInterval(()=>{
            ballr = ballr + 5;
        },10)
    } //回る


    const draw = setInterval(() => {
        ball.style.top = bally+"px";
        ball.style.left = ballx+"px";
        ball.style.transform = "rotate("+ballr+"deg)";
    }, 10);//描画開始

    function share():void{
        if (navigator.share) {
            //画像コピー＆canvas生成
            const imgprev = document.getElementById("imgprev");
            const img = imgprev.getElementsByTagName("img")[0];
            console.log(img);
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(img,0,0,img.naturalWidth,img.naturalHeight,0,0,canvas.width,canvas.height);
            canvas.toBlob((blob) => {
                const shareImg = new File([blob], 'share.png', {type: 'image/png'});
                navigator.share({
                    title: '画像ピンボール',
                    text: 'お前踊ってないのか？俺は今、こいつと踊ってるぜ。 #画像ピンボール',
                    url: 'https://willwebgame.com/game/imgpinball/ball.html',
                    files: [shareImg]
                })
                .then(() => {
                    // シェアしたら実行される
                    alert("ok!");
                })
                .catch((error) => {
                    // シェアせず終了した場合もここに入ってくる。
                    alert("NG!");
                });
            })
            // .catch(e => alert(e));
        } else {
            // document.getElementById("twitter-share-button").click();
            document.getElementById("share3").click();
            // Web Share API未対応ブラウザ向けのフォールバックを実装する。
        }
    }

    const movebtn:HTMLButtonElement = <HTMLButtonElement>document.getElementById("move");
    const stopbtn:HTMLButtonElement = <HTMLButtonElement>document.getElementById("stop");
    const rotatebtn:HTMLButtonElement = <HTMLButtonElement>document.getElementById("rotate");
    const sharebtn:HTMLButtonElement = <HTMLButtonElement>document.getElementById("share");
    const reload:HTMLButtonElement = <HTMLButtonElement>document.getElementById("reload");
    const noimgspan:HTMLSpanElement = <HTMLSpanElement>document.getElementById("noimgspan");

    movebtn.onclick = ()=>{
        movebtn.style.boxShadow = "0 0 0 rgba(0,255,0,0.5)";
        movebtn.style.marginTop = "8px";

        //他二つ
        stopbtn.style.boxShadow = "0 8px 2px rgba(255,0,0,0.5)";
        stopbtn.style.marginTop = "0";
        start();
        notouch();
    } //開始
    stopbtn.onclick = ()=>{
        stopbtn.style.boxShadow = "0 0 0 rgba(255,0,0,0.5)";
        stopbtn.style.marginTop = "8px";
        //他二つ
        movebtn.style.boxShadow = "0 8px 2px rgba(0,255,0,0.5)";
        movebtn.style.marginTop = "0";
        rotatebtn.style.boxShadow = "0 8px 2px rgba(0,0,255,0.5)";
        rotatebtn.style.marginTop = "0";
        end();
        notouch();
    } //停止
    rotatebtn.onclick = ()=>{
        rotatebtn.style.boxShadow = "0 0 0 rgba(0,0,255,0.5)";
        rotatebtn.style.marginTop = "8px";

        //他二つ
        movebtn.style.boxShadow = "0 8px 2px rgba(0,255,0,0.5)";
        stopbtn.style.boxShadow = "0 8px 2px rgba(255,0,0,0.5)";
        movebtn.style.marginTop = "0";
        stopbtn.style.marginTop = "0";
        dance();
        notouch();
    } //回す
    sharebtn.onclick = ()=>{
        share();
        notouch();
    } //共有
    reload.onclick = ()=>{
        location.href = "./ball.html";
        notouch();
    } //リロード

    //画像最適化
    function imgOptimization():void{
        const uploadlabel:HTMLLabelElement = <HTMLLabelElement>document.getElementById("uploadlabel");
        const imguploads:HTMLInputElement = <HTMLInputElement>document.getElementById("imguploads");
        const imageicon:HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("imageicon");
        const imageplusicon:HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("imageplus-icon");
        imguploads.addEventListener('change',()=>{
            const prevzone = document.getElementById("imgprev");
            const sizelimit = 3000000;
            function previewFile(file:File) {
                const reader = new FileReader();
                // URLとして読み込まれたときに実行する処理
                reader.onload = function (e) {
                    const imageUrl = <string>e.target.result; // URLはevent.target.resultで呼び出せる
                    const img = new Image(); // img要素を作成
                    img.src = imageUrl; // URLをimg要素にセット
                    if(prevzone.hasChildNodes()){
                        prevzone.removeChild(prevzone.firstChild);
                    }
                    ball.style.border = "none";
                    noimgspan.style.display = "none";
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

    const operator:HTMLDivElement = <HTMLDivElement>document.getElementById("operator");
    const border:HTMLDivElement = <HTMLDivElement>document.getElementsByClassName("border")[0];

    border.onclick = ()=>{
        notouch();
    }
    function notouch():void{
        if(touchflag){
            clearTimeout(opacityflag);
        }
        operator.style.opacity = "1";
        opacityflag = setTimeout(() => {
            operator.style.opacity = "0.3";
        }, 5000);
        touchflag = true;
    }
})