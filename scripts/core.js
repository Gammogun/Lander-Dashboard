function ledOnOff() {
    ledOn();
    setTimeout(ledOff, 5000);
};

function getRadioValue(rangeId, valOut) {
    let input = document.getElementById(rangeId);
    let value = document.getElementById(valOut);
    value.textContent = input.value;
    input.addEventListener("input", (event) => {
        value.textContent = event.target.value;
    });
}
//Sets all sliders to base position
function resetArm(longarmID, shortArmID, bucketID){
    const long = document.getElementById(longarmID).value = "125";
    const short = document.getElementById(shortArmID).value = "60";
    const bucket = document.getElementById(bucketID).value = "100";


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