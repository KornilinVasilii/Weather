let btn = document.querySelector('.changeCity')
let city = document.querySelector('.city')
let temp = document.querySelector('.temp')
let input = document.querySelector('input')
let find = document.querySelector('.btn-find')
let API_KEY = "c9fd997cfd25cafa05d85908fe33d9de"


getLocation()

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition,getIP);
}


let lat
let lon
 async function showPosition(position) {
  lat = position.coords.latitude; 
  lon = position.coords.longitude;
  let data = await getPosition()
}


async function getPosition() { 
  let request = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_KEY}`)
  let data = await request.json()
  city.innerHTML = `${data.weather[0].main} in ${data.name}`
  temp.innerHTML = `${(+data.main.temp - 273).toFixed(1)}`+ "℃"
 
  return data
}

function searchCity() { 
  city.style.display = 'none'
  temp.style.display = 'none'
  btn.style.display = 'none'
  input.style.display = 'block'
  find.style.display = 'block'
}


async function getIP() {
  let requestIp = await fetch('https://api.ipify.org')
  let dataIp = await requestIp.text()

  let response = await fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_QzgVNaENQPAgqkJhIMc6EVyiNqEav&ipAddress=' + dataIp )
  let ip = await response.json()
  

  let request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ip.location.city}&appid=${API_KEY}`)
  let positionIp = await request.json()
  city.innerHTML = `${positionIp.weather[0].main} in ${positionIp.name}`
  temp.innerHTML = `${(+positionIp.main.temp - 273).toFixed(1)}` + "℃"
 
 }
getIP()



async function getFind() { 
  let request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}`)
  let positionIp = await request.json()
  city.style.display = 'block'
  temp.style.display = 'block'
  city.innerHTML = `${positionIp.weather[0].main} in ${positionIp.name}`
  temp.innerHTML = `${(+positionIp.main.temp - 273).toFixed(1)}` + "℃"
  input.style.display = 'none'
  find.style.display = 'none'
  btn.style.display = 'block'
  
}


find.addEventListener('click', getFind)
btn.addEventListener('click', searchCity)