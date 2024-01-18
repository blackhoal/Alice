const key = 'fo8caZ7mk98eOAqEQF8goVe8DA08wqTX';

const getWeather = async (id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}

const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    // ?apikey = ${ key }& q=${ }
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json()

    // Key:"226081"
    // console.log(data[0].Key);
    return data[0];
}


getCity('manchester');

// key
// :
// '226081'

// http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${}