// Code using an API or websockets goes here

//variables
const satUrl = '145.49.127.250:1880';       //Url used in all API and websocket requests to connect to satellite
const groupId = 'groep19';                 //Specific group it wants to connect to
const dataTypeDigital = 'digital_output';       //indicates which datatype is selected
const fetchUrl = `http://${satUrl}/${groupId}?`;
var time = 0;
var weight = 0;
var satDiode = document.getElementById("satCon");
var roverDiode = document.getElementById("roverCon");

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
        .then(data => console.log('Success:', data))
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
        satDiode.classList.remove("diode__bad");
        satDiode.classList.add("diode__good");
    };

    //On receiving message/JSON from server
    socket.onmessage = (event) => {
        console.log("Ontvangen WebSocket data:", event.data);
        satData = JSON.parse(event.data)
        //Change rover diode on message received
        roverDiode.classList.remove("diode__bad");
        roverDiode.classList.add("diode__good");

        //rover lifetime
        if (satData == satData.unixtime_1) {
            time = satData.unixtime_1;
            document.getElementById("unixtimeOut").textContent = time;
        }

        //rotation of arm
        if (satData == satData.digital_input_3) {
            let armRot = satData.digital_input_3;
            document.getElementById("rotationOut").textContent = armRot;

        }

        //angle of long arm
        if (satData == satData.digital_input_4) {
            let armLong = satData.digital_input_4;
            document.getElementById("longArmOut").textContent = armLong;
        }

        //angle of short arm
        if (satData == satData.digital_input_5) {
            let armShort = satData.digital_input_5;
            document.getElementById("shortArmOut").textContent = armShort;
        }

        //angle of bucket
        if (satData == satData.digital_input_6) {
            let armBucket = satData.digital_input_6;
            document.getElementById("bucketOut").textContent = armBucket;
        }

    }; //end of message received

    //Handles errors
    socket.onerror = (error) => {
        console.error("WebSocket fout:", error);
    };

    socket.onclose = () => {
        satDiode.classList.remove("diode__good");
        satDiode.classList.add("diode__bad");
    }
};