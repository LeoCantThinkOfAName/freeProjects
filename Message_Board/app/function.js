var btn = document.querySelector(".goTop");

btn.onclick = function() {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
}