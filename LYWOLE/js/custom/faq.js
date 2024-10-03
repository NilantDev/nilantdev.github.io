$(document).ready(function () {

    var coll = document.getElementsByClassName("collapsible");
    var colapsI;

    for (colapsI = 0; colapsI < coll.length; colapsI++) {
        coll[colapsI].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
});