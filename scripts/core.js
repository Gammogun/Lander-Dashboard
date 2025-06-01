function ledOnOff() {

}

function getRadioValue(rangeId, valOut) {
    const input = document.getElementById(rangeId);
    const value = document.getElementById(valOut);
    value.textContent = input.value;
    input.addEventListener("input", (event) => {
        value.textContent = event.target.value;
    });
}

function miniTest() {
    var element = document.getElementById("satCon");
    element.classList.remove("diode__bad");
    element.classList.add("diode__good");
    setTimeout(() => {
        var element = document.getElementById("satCon");
        element.classList.remove("diode__good");
        element.classList.add("diode__bad");
    }, 5000);
}