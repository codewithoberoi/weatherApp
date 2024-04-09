console.log('Client Side JavaScript!!')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')


//run some code when someone submits the form.
//events such as clicking button, scrolling, etc.
//default behaviour of form is to reload browser.

weatherForm.addEventListener('submit', (e) => {
    //e is event object. provided to event callback.
    //Prevent default behaviour to refresh the browser allowing the server to render a new page.
    e.preventDefault();


    messageOne.textContent = 'Loading.....'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    const location = searchElement.value;
    const url = `http://localhost:3000/weather?address=${location}`

    fetch(url)
    .then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = `Location: ${data.location}`
                messageTwo.textContent = `Temprature: ${data.temperature}`
                messageThree.textContent = `WindSpeed: ${data.windSpeed}`
            }
        })
    })
})