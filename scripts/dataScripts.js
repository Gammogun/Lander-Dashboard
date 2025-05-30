// Code using an API or websockets goes here

//variables
const saturl = '145.49.111.54:1880/';       //Url used in all API and websocket requests to connect to satellite
const groupId = 'groep19';                  //Specific group it wants to connect to
const dataType1 = 'digital_output';         //indicates which datatype is selected
const dataLedVal1 = '255';                  //Specific value for LED test. Can change depending on needs
const dataLedVal2 = '127';                  //Second value for LED test. Can change depending on needs


//API functions==================================================================================

//Turns a led on
function ledOn() {
    fetch('http:' + saturl + groupId + '?' + dataType1 + '_1=' + dataLedVal1, {
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
    fetch('http://' + saturl + groupId + '?' + dataType1 + '_1=' + dataLedVal2, {
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

