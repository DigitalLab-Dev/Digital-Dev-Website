let x = document.getElementById("hamburger");

function hamburger_click() {
    let y = document.getElementsByClassName("nav-list")[0];
    if(y.style.display==="none"){
        y.style.display = "flex";
    }
    else{
        y.style.display = "none";
    }
}
x.addEventListener("click", hamburger_click);