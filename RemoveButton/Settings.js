const DEFAULT_QUANTITY = 10, DEFAULT_DIFFICULTY = 10;

function Start() {
    const qty = document.getElementById("qty").value;
    const dif = document.getElementById("dif").value;
    if(isNaN(qty) == true || isNaN(dif) == true) {
        alert("問題数と難易度はともに正の整数で入力してください.");
        location.href="./Settings.html";
        return;
    } else {
        sessionStorage.setItem('qty', qty);
        sessionStorage.setItem('dif', dif);
        location.href = "./Calc.html";
    }
}

function setQty(value) {
    document.getElementById("qty").value = value;
}

function setDif(value) {
    document.getElementById("dif").value = value;
}

function SetArgs() {
    if(sessionStorage.getItem("qty") == null) {
        document.getElementById("qty").value = DEFAULT_QUANTITY;
    } else {
        document.getElementById("qty").value = sessionStorage.getItem("qty");
    }
    if(sessionStorage.getItem("dif") == null) {
        document.getElementById("dif").value = DEFAULT_DIFFICULTY;
    } else {
        document.getElementById("dif").value = sessionStorage.getItem("dif");
    }
}