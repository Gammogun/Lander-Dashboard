// Code using an API or websockets goes here

//variables
const satUrl = '145.49.127.250:1880';       //Url used in all API and websocket requests to connect to satellite
const groupId = 'groep19';                 //Specific group it wants to connect to
const dataTypeDigital = 'digital_output';       //indicates which datatype is selected
const fetchUrl = `http://${satUrl}/${groupId}?`;

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
    const dataLedVal2 = '127';  //Second value for LED test. Can change depending on needs
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

//Web socket==================================================================================
function socketconnect() {
    const socketUrl = `ws://${satUrl}/ws/${groupId}`;

    // WebSocket instance
    const socket = new WebSocket(socketUrl);

    //On connection/opening of socket
    socket.onopen = () => {
        console.log("WebSocket verbonden met satelliet");
        var element = document.getElementById("satCon");
        element.classList.remove("diode__bad");
        element.classList.add("diode__good");
    };

    //On receiving message/JSON from server
    socket.onmessage = (event) => {
        console.log("Ontvangen WebSocket data:", event.data);
        satData = JSON.parse(event.data)

        //rover lifetime
        if (satData == satData.unixtime_1) {
            const time = satData.unixtime_1;
            document.getElementById("unixtime").textContent = time;
        }

        //rotation of arm
        if (satData == satData.digital_input_3) {
            const armRot = satData.digital_input_3;
            document.getElementById("rotation").textContent = armRot;
        }

        //angle of long arm
        if (satData == satData.digital_input_4) {
            const armLong = satData.digital_input_4;
            document.getElementById("longArm").textContent = armLong;
        }

        //angle of short arm
        if (satData == satData.digital_input_5) {
            const armShort = satData.digital_input_5;
            document.getElementById("shortArm").textContent = armShort;
        }

        //angle of bucket
        if (satData == satData.digital_input_6) {
            const armBucket = satData.digital_input_6;
            document.getElementById("bucket").textContent = armBucket;
        }

    }; //end of message received

    //Handles errors
    socket.onerror = (error) => {
        console.error("WebSocket fout:", error);
    };
};