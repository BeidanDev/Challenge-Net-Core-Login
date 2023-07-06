
window.addEventListener("load", function () {
    var mql = window.matchMedia("(min-width: 768px)");
    var collapseMenu = document.getElementById("collapseMenu");

    if (collapseMenu) {
        if (mql.matches) {
            collapseMenu.classList.add("show");
        }

        window.addEventListener("resize", function () {
            if (mql.matches) {
                collapseMenu.classList.add("show");
            } else {
                collapseMenu.classList.remove("show");
            }
        });
    }
});