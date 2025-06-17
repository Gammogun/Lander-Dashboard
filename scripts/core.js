function ledOnOff() {
    ledOn();
    setTimeout(ledOff, 5000);
};

function getRadioValue(rangeId, valOut) {
    const input = document.getElementById(rangeId);
    const value = document.getElementById(valOut);
    value.textContent = input.value;
    input.addEventListener("input", (event) => {
        value.textContent = event.target.value;
    });
}