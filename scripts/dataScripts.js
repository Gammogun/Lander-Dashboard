// Code using an API or websockets goes here

//variables
const satUrl = '145.49.127.250:1880';       //Url used in all API and websocket requests to connect to satellite
const groupId = 'groep19';                 //Specific group it wants to connect to
const dataTypeDigital = 'digital_output';       //indicates which datatype is selected
const fetchUrl = `http://${satUrl}/${groupId}?`;
var time = 0;
var weight = 0;
var armRot = 0;
var armLong = 0;
var armShort = 0;
var armBucket = 0;

//API functions==================================================================================

//Turns a led on
function ledOn() {
    console.log('aan')
    let dataLedVal1 = '255';  //Specific value for LED test. Can change depending on needs
    fetch(fetchUrl + dataTypeDigital + "_1=" + dataLedVal1, {
        method: 'POST',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
};
//End led on

//Turns a led off
function ledOff() {
    console.log("uit")
    let dataLedVal2 = '127';  //Second value for LED test. Can change depending on needs
    fetch(fetchUrl + dataTypeDigital + "_1=" + dataLedVal2, {
        method: 'POST',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
};
//End led off

//Arm controls
function setTarget(targetVal, channelId) {

    let rotationVal = document.getElementById(targetVal).value;;  //Specific value to set servo on arm to
    console.log(rotationVal);

    fetch(`${fetchUrl}${dataTypeDigital}_${channelId}=${rotationVal}`, {
        method: 'POST',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log('Success:', data),
        diodeBlink('sendDiode'))
        .catch(error => console.error('Error:', error));
};

//Web socket==================================================================================
function socketconnect() {
    const socketUrl = `ws://${satUrl}/ws/${groupId}`;

    // WebSocket instance
    const socket = new WebSocket(socketUrl);

    //On connection/opening of socket
    socket.onopen = () => {
        console.log("WebSocket verbonden met satelliet");
        diodeStatus(1, "satCon");
    };

    //On receiving message/JSON from server
    socket.onmessage = (event) => {
        console.log("Ontvangen WebSocket data:", event.data);
        satData = JSON.parse(event.data)
        //Change rover to good diode on message received
        diodeStatus(1, "roverCon");
        //blink that we received a message
        diodeBlink('receivedDiode')

        //rover lifetime
        time = satData.unixtime_1;
        document.getElementById("unixtimeOut").value = time;
        console.log(time);

        //weight data
        weight = satData.analog_sensor_2;
        document.getElementById("weightOut").value = weight;
        console.log(weight);
        addData();

        //angle of long arm
        armLong = satData.digital_sensor_4;
        document.getElementById("longArmOut").value = armLong;


        //angle of short arm
        armShort = satData.digital_sensor_5;
        document.getElementById("shortArmOut").value = armShort;


        //angle of bucket
        armBucket = satData.digital_sensor_6;
        document.getElementById("bucketOut").value = armBucket;

    }; //end of message received

    //Handles errors
    socket.onerror = (error) => {
        console.error("WebSocket fout:", error);
    };

    socket.onclose = () => {
        diodeStatus(0, "satCon");
        diodeStatus(0, "roverCon");
    }
};