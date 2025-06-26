//toggles led on a timer
function ledOnOff() {
    ledOn();
    setTimeout(ledOff, 5000);
};

//slider modifier
function getRadioValue(rangeId, valOut) {
    let input = document.getElementById(rangeId);
    let value = document.getElementById(valOut);
    value.textContent = input.value;
    input.addEventListener("input", (event) => {
        value.textContent = event.target.value;
    });
}
//Sets all sliders to base position
function resetArm(longArmID, shortArmID, bucketID) {
    document.getElementById(longArmID).value = "125";
    document.getElementById(shortArmID).value = "60";
    document.getElementById(bucketID).value = "100";

    getRadioValue(longArmID, 'longarmvalue');
    getRadioValue(shortArmID, 'shortarmvalue');
    getRadioValue(bucketID, 'bucketvalue');
}
//Changes status diodes
function diodeStatus(status, diodeID) {
    var diodeName = document.getElementById(diodeID);

    //if it's bad
    if (status == 0) {
        diodeName.classList.remove("diode__good");
        diodeName.classList.add("diode__bad");
    }
    //if it's good
    if (status == 1) {
        diodeName.classList.remove("diode__bad");
        diodeName.classList.add("diode__good");
    }
}