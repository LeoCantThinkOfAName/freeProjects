// set embed box size dynamically
window.onresize = function() {
    var winW = window.innerWidth;
    var emb = document.querySelector(".mainPic");
    if(winW < 700) {
        emb.style.width = winW - 100 + "px";
    } else {
        emb.style.width = "652px";
    }
}

