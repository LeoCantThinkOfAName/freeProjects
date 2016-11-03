// set embed box size dynamically
window.onresize = function() {
    var winW = document.body.clientWidth;

    if(document.querySelector(".userName") && winW < 700) {
        var emb = document.querySelector(".emb");
        var img = emb.querySelector("img");

        emb.style.width = winW - 50 + "px";
        img.style.width = winW - 70 + "px";
    }

    // set footer to position
    var devH = window.innerHeight;
    var devW = window.innerWidth;
    var footer = document.querySelector("footer");
}

