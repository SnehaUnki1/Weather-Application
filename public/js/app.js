console.log("Java Script page Loaded")

const weather = document.querySelector('form')
const serach = document.querySelector('input')

const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weather.addEventListener('submit',(e) => {

    e.preventDefault()
    const location = serach.value

    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch('/weather?address='+location).then((response) =>{
        response.json().then((data) => {

            if(data.error){
                msg1.textContent = data.error
            } else{
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
    })
})