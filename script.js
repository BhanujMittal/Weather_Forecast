const fetchWeather = async (region) => {
  if(weatherLocation.value === '') {
    alert('Please Enter Valid Region');
    return;
  }
  try {
    let weather = fetch(`https://goweather.herokuapp.com/weather/${region}`)
    await weather.then((response) => {
      if (!response.ok) {
        let err = new Error(`Failed to fetch weather of ${region}`)
        alert(err)
      } else {
        const regionDiv = document.getElementById('region')
        regionDiv.innerHTML = `Weather of ${region} is: `
        let ul = document.querySelector('ul')
        ul.style.display = 'block'
        data.classList.replace('justify-center', 'justify-evenly')
      }
      return response.json()
    
  }).then((response) => {
    try {
        let day = document.getElementsByClassName('day')
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let d = new Date();
        day[0].innerHTML = days[d.getDay()]
        if(day[0].innerHTML == days[days.length - 1]) {
          day[1].innerHTML = days[0]
          day[2].innerHTML = days[1]
        } else {
          day[1].innerHTML = days[d.getDay() + 1]
          day[2].innerHTML = days[d.getDay() + 2]
        }
        let temp = document.getElementsByClassName('temp')
        temp[0].innerHTML = (response.forecast)[0]['temperature']
        temp[1].innerHTML = (response.forecast)[1]['temperature']
        temp[2].innerHTML = (response.forecast)[2]['temperature']
        let wind = document.getElementsByClassName('wind');
        wind[0].innerHTML = (response.forecast)[0]['wind']
        wind[1].innerHTML = (response.forecast)[1]['wind']
        wind[2].innerHTML = (response.forecast)[2]['wind']
        let desc = document.getElementsByClassName('desc')
        desc[0].innerHTML = `Temperature: ${response.temperature}`
        desc[1].innerHTML = `Wind: ${response.wind}`
        desc[2].innerHTML = `Description: ${response.description}`
    }
    catch (error) {
      console.log(error)
    }
  }).catch((error) => {
    console.log(error)
  })
}
catch(error) {
  console.log('failed to fetch weather')
}
}

const weatherLocation = document.getElementById('weatherLocation');
const fetchBtn = document.getElementById('fetchWeather')
const data = document.getElementById('data')

fetchBtn.addEventListener('click', () => {
  fetchWeather(weatherLocation.value)
  weatherLocation.value = ''
})

window.addEventListener('load', () => {
  weatherLocation.focus()
})