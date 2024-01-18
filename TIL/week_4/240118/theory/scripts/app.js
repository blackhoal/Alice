const cityForm = document.querySelector('form')
const details = document.querySelector('.details')

const card = document.querySelector('.card')

const updateUI = (data) => {
    const cityInfo = data.cityInfo;
    const weather = data.weather;

    if (weather.IsDayTime) {
        details.innerHTML = `
          <img class="card-img-top" src="./img/dayimage.png" alt="" />
          <h5 class="my-3">${cityInfo.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>
        `
    } else {
        details.innerHTML = `
          <img class="card-img-top" src="./img/nightimage.png" alt="" />
          <h5 class="my-3">${cityInfo.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>
    `
    }


    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}

const updateCity = async (city) => {
    const cityInfo = await getCity(city);
    const weather = await getWeather(cityInfo.Key);

    return {
        cityInfo: cityInfo,
        weather: weather
    }
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value;


    //검색 후 업데이트...
    updateCity(city).then(data => updateUI(data));
})
