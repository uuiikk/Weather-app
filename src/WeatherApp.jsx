/* eslint-disable no-mixed-spaces-and-tabs */
import clear from './assets/images/clear.svg'
import mainlyClear from './assets/images/mainlyClear.svg'
import partlyCloudy from './assets/images/partlyCloudy.svg'
import overcast from './assets/images/overcast.svg'
import fog from './assets/images/fog.png'
import mist from './assets/images/mist.png'
import drizzleLight from './assets/images/drizzleLight.svg'
import drizzleModerate from './assets/images/drizzleModerate.svg'
import drizzleDense from './assets/images/drizzleDense.svg'
import freezingDrizzleLight from './assets/images/freezingDrizzleLight.svg'
import freezingDrizzleDense from './assets/images/freezingDrizzleDense.svg'
import rainSlight from './assets/images/rainSlight.svg'
import rainModerate from './assets/images/rainModerate.svg'
import rainHeavy from './assets/images/rainHeavy.svg'
import freezingRainLight from './assets/images/freezingRainLight.svg'
import freezingRainHeavy from './assets/images/freezingRainHeavy.svg'
import snowFallSlight from './assets/images/snowFallSlight.svg'
import snowFallModerate from './assets/images/snowFallModerate.svg'
import snowFallHeavy from './assets/images/snowFallHeavy.svg'
import rainShowersSlight from './assets/images/rainShowersSlight.svg'
import rainShowersModerate from './assets/images/rainShowersModerate.svg'
import rainShowersViolent from './assets/images/rainShowersViolent.svg'
import snowShowersSlight from './assets/images/snowShowersSlight.svg'
import snowShowersHeavy from './assets/images/snowShowersHeavy.svg'
import thunderstormSlightOrModerate from './assets/images/thunderstormSlightOrModerate.svg'
import thunderstormWithSlightHail from './assets/images/thunderstormWithSlightHail.svg'
import thunderstormWithHeavyHail from './assets/images/thunderstormWithHeavyHail.svg'
import notFoundImage from './assets/images/notFound.png'
import loadingGif from './assets/images/loading.gif'

import { useState, useEffect, useRef } from 'react'

const WeatherApp = () => {
	//ip data
	const [ipData, setIpData] = useState({})
	//weather data
	const [data, setData] = useState({})
	//air quality data
	const [airData, setAirData] = useState({})
	//global location
	const [location, setLocation] = useState('')
	//global location code
	const [locationCode, setLocationCode] = useState('')
	//input location
	const [inputLocation, setInputLocation] = useState('')
	//default location
	const [myLocationLat, setMyLocationLat] = useState('')
	const [myLocationLon, setMyLocationLon] = useState('')
	const [myLocation, setMyLocation] = useState('')
	const [myLocationCode, setMyLocationCode] = useState('')

	//loading
	const [loading, setLoading] = useState(false)

	const [displaySearchBar, setDisplaySearchBar] = useState(false)

	const [europe, setEurope] = useState(false)

	//api
	const api_key_BigDataCloud = 'bdc_96fdba2986b34eba83bd8725d7dc456f'

	useEffect(() => {
		myLocation ? hideShowMyLocationButton() : null
	}, [location])

	useEffect(() => {
		const input = document.getElementById('search-bar-input')
		if (input.value == '') {
			setDisplaySearchBar(true)
		}
	}, [])

	useEffect(() => {
		airData ? resizebleWidgets() : null
	})

	useEffect(() => {
		const fetchDefaultWeather = async () => {
			setLoading(true)
			//ip location
			const urlIpGeoLocate = await fetch(
				`https://api-bdc.net/data/ip-geolocation?&localityLanguage=ru&key=${api_key_BigDataCloud}`
			)
			const defaultLocationData = await urlIpGeoLocate.json()

			const defaultLocation = defaultLocationData.location.city
			const defaultLocationCode = defaultLocationData.country.isoAlpha2
			const defaultLocationLat = defaultLocationData.location.latitude
			const defaultLocationLon = defaultLocationData.location.longitude

			console.log('\x1b[31m%s\x1b[0m', 'Default Ip location Data')
			console.log(defaultLocationData)
			console.log(
				'\x1b[31m%s\x1b[0m',
				`Default location: "${defaultLocation}" , lat: "${defaultLocationData.location.latitude}", lon: "${defaultLocationData.location.longitude}"`
			)

			setLocation(defaultLocation)
			setLocationCode(defaultLocationCode)
			setMyLocationLat(defaultLocationLat)
			setMyLocationLon(defaultLocationLon)
			setMyLocation(defaultLocation)
			setMyLocationCode(defaultLocationCode)

			const searchCoordLocation = await fetch(
				`https://geocoding-api.open-meteo.com/v1/search?name=${defaultLocation}&count=1&language=ru&format=json`
			)
			const coordLocationData = await searchCoordLocation.json()
			console.log('\x1b[31m%s\x1b[0m', 'Coord Location data by open meteo')
			console.log(coordLocationData)

			setIpData(coordLocationData)

			//weather by open meteo
			const urlWether = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${defaultLocationData.location.latitude}&longitude=${defaultLocationData.location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_direction_10m,wind_gusts_10m,temperature_80m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_to_1cm&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&forecast_days=6&timezone=auto`
			)
			const defaultWeather = await urlWether.json()

			console.log('\x1b[31m%s\x1b[0m', 'Weather by open meteo')
			console.log(defaultWeather)

			//air quality by open meteo
			const urlAQ = await fetch(
				`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${defaultLocationData.location.latitude}&longitude=${defaultLocationData.location.longitude}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,aerosol_optical_depth,dust,uv_index,uv_index_clear_sky,ammonia,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=auto`
			)
			const defaultAQ = await urlAQ.json()
			console.log('\x1b[31m%s\x1b[0m', 'Air quality by open meteo')
			console.log(defaultAQ)

			if (defaultAQ.timezone.slice(0, 6) == 'Europe') {
				setEurope(true)
			} else setEurope(false)

			setData(defaultWeather)
			setAirData(defaultAQ)
			setLoading(false)
		}
		fetchDefaultWeather()
	}, [])

	function useOutsideAlerter(onOutsideClick) {
		const ref = useRef()

		useEffect(() => {
			function handleClick(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					onOutsideClick()
				}
			}

			document.addEventListener('mousedown', handleClick)

			return () => {
				document.removeEventListener('mousedown', handleClick)
			}
		}, [onOutsideClick])

		return ref
	}

	const outsideAlerterRef = useOutsideAlerter(() => {
		if (displaySearchBar == false) {
			null
		} else {
			hideShowSearchBar()
		}
	})

	function hideShowSearchBar() {
		var search_top = document.getElementById('search-top')
		var search_bar = document.getElementById('search-bar')
		var search_bar_input = document.getElementById('search-bar-input')
		if (displaySearchBar == true) {
			search_top.style.display = 'flex'
			search_bar.style.display = 'none'
			setDisplaySearchBar(false)
		} else if (displaySearchBar == false) {
			search_top.style.display = 'none'
			search_bar.style.display = 'flex'
			search_bar_input.focus()
			setDisplaySearchBar(true)
		}
	}

	function hideShowMyLocationButton() {
		var my_location_button = document.getElementById('my-location-button')
		if (myLocation == location) {
			my_location_button.style.display = 'none'
		} else if (myLocation !== location) {
			my_location_button.style.display = 'flex'
		}
		// console.log(myLocation)
		// console.log(data.name)
	}
	//////////////////////////////////////////////////////////////
	const handleInputChange = e => {
		setInputLocation(e.target.value)
	}

	const searchInMyLocation = async () => {
		setLoading(true)

		const searchWeatherData = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${myLocationLat}&longitude=${myLocationLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_direction_10m,wind_gusts_10m,temperature_80m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_to_1cm&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&forecast_days=6&timezone=auto`
		)
		const weatherData = await searchWeatherData.json()
		console.log('\x1b[31m%s\x1b[0m', 'Weather by open meteo')
		console.log(weatherData)
		setData(weatherData)
		const searchCoordLocation = await fetch(
			`https://geocoding-api.open-meteo.com/v1/search?name=${myLocation}&count=1&language=ru&format=json`
		)
		const coordLocationData = await searchCoordLocation.json()
		console.log('\x1b[31m%s\x1b[0m', 'Coord Location data by open meteo')
		console.log(coordLocationData)
		setIpData(coordLocationData)
		const searchAirQualityData = await fetch(
			`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${myLocationLat}&longitude=${myLocationLon}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,aerosol_optical_depth,dust,uv_index,uv_index_clear_sky,ammonia,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=auto`
		)
		const airQualityData = await searchAirQualityData.json()
		console.log('\x1b[31m%s\x1b[0m', 'Air quality by open meteo')
		console.log(airQualityData)
		setAirData(airQualityData)
		if (airQualityData.timezone.slice(0, 6) == 'Europe') {
			setEurope(true)
		} else setEurope(false)
		setLocation(myLocation)
		setLocationCode(myLocationCode)
		setLoading(false)
		//для анимации
		setDisplaySearchBar(true)
		hideShowSearchBar()
		hideShowMyLocationButton()
	}

	const search = async () => {
		if (inputLocation.trim() !== '') {
			//search lat lon location
			const searchCoordLocation = await fetch(
				`https://geocoding-api.open-meteo.com/v1/search?name=${inputLocation}&count=1&language=ru&format=json`
			)
			const coordLocationData = await searchCoordLocation.json()
			console.log('\x1b[31m%s\x1b[0m', 'Coord Location data by open meteo')
			console.log(coordLocationData)
			setIpData(coordLocationData)
			//search weather in location

			if (coordLocationData.results) {
				const searchWeatherData = await fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${coordLocationData.results[0].latitude}&longitude=${coordLocationData.results[0].longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_direction_10m,wind_gusts_10m,temperature_80m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_to_1cm&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&forecast_days=6&timezone=auto`
				)
				const weatherData = await searchWeatherData.json()
				console.log('\x1b[31m%s\x1b[0m', 'Weather by open meteo')
				console.log(weatherData)
				setData(weatherData)
				const searchAirQualityData = await fetch(
					`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordLocationData.results[0].latitude}&longitude=${coordLocationData.results[0].longitude}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,aerosol_optical_depth,dust,uv_index,uv_index_clear_sky,ammonia,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=auto`
				)
				const airQualityData = await searchAirQualityData.json()
				console.log('\x1b[31m%s\x1b[0m', 'Air quality by open meteo')
				console.log(airQualityData)
				setAirData(airQualityData)
				if (airQualityData.timezone.slice(0, 6) === 'Europe') {
					setEurope(true)
				} else setEurope(false)
				setLocation(coordLocationData.results[0].name)
				setLocationCode(coordLocationData.results[0].country_code)
			} else {
				setData({ notFound: true })
				setLocation('')
				setLocationCode('')
			}
			setInputLocation('')
			setLoading(false)
			//для анимации
			setDisplaySearchBar(true)
			hideShowSearchBar()
		}
	}

	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			search()
		}
	}

	const clearInput = () => {
		const input = document.getElementById('search-bar-input')
		input.value = ''
		input.focus()
		setDisplaySearchBar(true)
	}

	const weatherImages = {
		0: clear,
		1: mainlyClear,
		2: partlyCloudy,
		3: overcast,
		45: fog,
		48: mist,
		51: drizzleLight,
		53: drizzleModerate,
		55: drizzleDense,
		56: freezingDrizzleLight,
		57: freezingDrizzleDense,
		61: rainSlight,
		63: rainModerate,
		65: rainHeavy,
		66: freezingRainLight,
		67: freezingRainHeavy,
		71: snowFallSlight,
		73: snowFallModerate,
		75: snowFallHeavy,
		77: snowFallHeavy,
		80: rainShowersSlight,
		81: rainShowersModerate,
		82: rainShowersViolent,
		85: snowShowersSlight,
		86: snowShowersHeavy,
		95: thunderstormSlightOrModerate,
		96: thunderstormWithSlightHail,
		99: thunderstormWithHeavyHail,
	}

	const weatherImage = data.current
		? weatherImages[data.current.weather_code]
		: null

	const weatherImageDay1 = data.daily
		? weatherImages[data.daily.weather_code[1]]
		: null
	const weatherImageDay2 = data.daily
		? weatherImages[data.daily.weather_code[2]]
		: null
	const weatherImageDay3 = data.daily
		? weatherImages[data.daily.weather_code[3]]
		: null
	const weatherImageDay4 = data.daily
		? weatherImages[data.daily.weather_code[4]]
		: null
	const weatherImageDay5 = data.daily
		? weatherImages[data.daily.weather_code[5]]
		: null

	const backgroundImages = {
		0: 'https://e3.365dm.com/21/06/2048x1152/skynews-sun-weather_5415028.jpg?20210614155058',
		1: 'https://www.indianablackexpo.com/wp-content/uploads/2020/04/James-C-Cummings.jpg',
		2: 'https://www.indianablackexpo.com/wp-content/uploads/2020/04/James-C-Cummings.jpg',
		3: 'https://www.indianablackexpo.com/wp-content/uploads/2020/04/James-C-Cummings.jpg',
		45: 'https://c.pxhere.com/photos/a0/07/photo-172994.jpg!d',
		48: 'https://c.pxhere.com/photos/a0/07/photo-172994.jpg!d',
		51: 'https://wp-s.ru/wallpapers/13/5/314963270287327/minimalistichnaya-kartinka-dozhdya.jpg',
		53: 'https://wp-s.ru/wallpapers/13/5/314963270287327/minimalistichnaya-kartinka-dozhdya.jpg',
		55: 'https://wp-s.ru/wallpapers/13/5/314963270287327/minimalistichnaya-kartinka-dozhdya.jpg',
		56: 'https://wp-s.ru/wallpapers/13/5/314963270287327/minimalistichnaya-kartinka-dozhdya.jpg',
		57: 'https://wp-s.ru/wallpapers/13/5/314963270287327/minimalistichnaya-kartinka-dozhdya.jpg',
		61: 'https://img3.fonwall.ru/o/zn/sea-water-ocean-horizon-kptq.jpeg?auto=compress&amp;fit=resize&amp;w=1200&amp;display=large',
		63: 'https://img3.fonwall.ru/o/zn/sea-water-ocean-horizon-kptq.jpeg?auto=compress&amp;fit=resize&amp;w=1200&amp;display=large',
		65: 'https://img3.fonwall.ru/o/zn/sea-water-ocean-horizon-kptq.jpeg?auto=compress&amp;fit=resize&amp;w=1200&amp;display=large',
		66: 'https://img3.fonwall.ru/o/zn/sea-water-ocean-horizon-kptq.jpeg?auto=compress&amp;fit=resize&amp;w=1200&amp;display=large',
		67: 'https://img3.fonwall.ru/o/zn/sea-water-ocean-horizon-kptq.jpeg?auto=compress&amp;fit=resize&amp;w=1200&amp;display=large',
		71: 'https://wallbox.ru/wallpapers/main2/201744/150962252759fb02ff2cf323.87542290.jpg',
		73: 'https://wallbox.ru/wallpapers/main2/201744/150962252759fb02ff2cf323.87542290.jpg',
		75: 'https://wallbox.ru/wallpapers/main2/201744/150962252759fb02ff2cf323.87542290.jpg',
		77: 'https://wallbox.ru/wallpapers/main2/201744/150962252759fb02ff2cf323.87542290.jpg',
		80: 'https://img3.fonwall.ru/o/zn/sea-water-ocean-horizon-kptq.jpeg?auto=compress&amp;fit=resize&amp;w=1200&amp;display=large',
		81: 'https://img3.fonwall.ru/o/zn/sea-water-ocean-horizon-kptq.jpeg?auto=compress&amp;fit=resize&amp;w=1200&amp;display=large',
		82: 'https://img3.fonwall.ru/o/zn/sea-water-ocean-horizon-kptq.jpeg?auto=compress&amp;fit=resize&amp;w=1200&amp;display=large',
		85: 'https://wallbox.ru/wallpapers/main2/201744/150962252759fb02ff2cf323.87542290.jpg',
		86: 'https://wallbox.ru/wallpapers/main2/201744/150962252759fb02ff2cf323.87542290.jpg',
		95: 'https://get.wallhere.com/photo/landscape-night-nature-sky-clouds-lightning-storm-atmosphere-dusk-thunder-cloud-weather-thunderstorm-darkness-2560x1600-px-700891.jpg',
		96: 'https://get.wallhere.com/photo/landscape-night-nature-sky-clouds-lightning-storm-atmosphere-dusk-thunder-cloud-weather-thunderstorm-darkness-2560x1600-px-700891.jpg',
		99: 'https://get.wallhere.com/photo/landscape-night-nature-sky-clouds-lightning-storm-atmosphere-dusk-thunder-cloud-weather-thunderstorm-darkness-2560x1600-px-700891.jpg',
	}

	const backgroundImage = data.current
		? backgroundImages[data.current.weather_code]
		: null

	const weatherDescs = {
		0: 'Ясно',
		1: 'Преимущественно ясно',
		2: 'Переменная облачность',
		3: 'Пасмурно',
		45: 'Туман',
		48: 'Иней',
		51: 'Легкая морось',
		53: 'Умеренная морось',
		55: 'Интенсивная морось',
		56: 'Легкий моросящий дождь',
		57: 'Сильный моросящий дождь',
		61: 'Небольшой дождь',
		63: 'Умеренный дождь',
		65: 'Сильный дождь',
		66: 'Небольшой ледяной дождь',
		67: 'Сильный ледяной дождь',
		71: 'Слабый снегопад',
		73: 'Умеренный снегопад',
		75: 'Сильный снегопад',
		77: 'Снежные зерна',
		80: 'Слабый ливень',
		81: 'Умеренный ливень',
		82: 'Сильный ливень',
		85: 'Небольшой снежный ливень',
		86: 'Сильный снежный ливень',
		95: 'Слабая/ умеренная гроза',
		96: 'Гроза с небольшим градом',
		99: 'Гроза с сильным градом',
	}

	const weatherDesc = data.current
		? weatherDescs[data.current.weather_code]
		: null

	const weatherDescDay1 = data.daily
		? weatherDescs[data.daily.weather_code[1]]
		: null
	const weatherDescDay2 = data.daily
		? weatherDescs[data.daily.weather_code[2]]
		: null
	const weatherDescDay3 = data.daily
		? weatherDescs[data.daily.weather_code[3]]
		: null
	const weatherDescDay4 = data.daily
		? weatherDescs[data.daily.weather_code[4]]
		: null
	const weatherDescDay5 = data.daily
		? weatherDescs[data.daily.weather_code[5]]
		: null

	const daysOfWeek = {
		Mon: 'Понедельник',
		Tue: 'Вторник',
		Wed: 'Среда',
		Thu: 'Четверг',
		Fri: 'Пятница',
		Sat: 'Суббота',
		Sun: 'Воскресенье',
	}

	const months = {
		Jan: 'Января',
		Feb: 'Февраля',
		Mar: 'Марта',
		Apr: 'Апреля',
		May: 'Мая',
		Jun: 'Июня',
		Jul: 'Июля',
		Aug: 'Августа',
		Sep: 'Сентября',
		Oct: 'Октября',
		Nov: 'Ноября',
		Dec: 'Декабря',
	}

	const dayOfWeek = day => {
		if (data.current) {
			var date = new Date(data.current.time)
			date.setDate(date.getDate() + day)
			let res = date.toString().slice(0, 3)
			return daysOfWeek[res]
		} else return ''
	}
	const month = day => {
		if (data.current) {
			var date = new Date(data.current.time)
			date.setDate(date.getDate() + day)
			let res = date.toString().slice(4, 7)
			return months[res]
		} else return ''
	}
	const dayOfMonth = day => {
		if (data.current) {
			var date = new Date(data.current.time)
			date.setDate(date.getDate() + day)
			let res = date.toString().slice(8, 10)
			return res
		} else return ''
	}

	const formattedDate = `${dayOfWeek(0)}, ${dayOfMonth(0)} ${month(0)}`

	const resizebleWidgets = () => {
		if (loading == false && data.notFound != false) {
			var container = document.getElementById('description')
			var airWidget = document.getElementById('air')
			var pressureWidget = document.getElementById('pressure')
			var bodyPressureWidget = document.getElementById('pressure-body')
			var nameGrndDataBodyPressureWidget = document.getElementById(
				'pressure-body-data-grnd-name'
			)
			var hrGrndDataBodyPressureWidget = document.getElementById(
				'pressure-body-data-grnd-hr'
			)
			var valueGrndDataBodyPressureWidget = document.getElementById(
				'pressure-body-data-grnd-value'
			)
			var unitValueGrndDataBodyPressureWidget = document.getElementById(
				'pressure-body-data-grnd-value-unit'
			)
			var nameSeaDataBodyPressureWidget = document.getElementById(
				'pressure-body-data-sea-name'
			)
			var hrSeaDataBodyPressureWidget = document.getElementById(
				'pressure-body-data-sea-hr'
			)
			var valueSeaDataBodyPressureWidget = document.getElementById(
				'pressure-body-data-sea-value'
			)
			var unitValueSeaDataBodyPressureWidget = document.getElementById(
				'pressure-body-data-sea-value-unit'
			)
			var slashPressureWidget = document.getElementById('pressure-slash')
			var uvIndexWidget = document.getElementById('uv-index')
			var bodyUvIndexWidget = document.getElementById('uv-index-body')
			if (europe == true) {
				airWidget.style.height = '305px'
				pressureWidget.style.width = '147.5px'
				pressureWidget.style.height = '100px'
				pressureWidget.style.margin = '2.5px 2.5px 0 2.5px'
				nameGrndDataBodyPressureWidget.style.fontSize = '10px'
				hrGrndDataBodyPressureWidget.style.width = '80%'
				hrGrndDataBodyPressureWidget.style.margin = '2px 0 2px 0'
				valueGrndDataBodyPressureWidget.style.fontSize = '12px'
				unitValueGrndDataBodyPressureWidget.style.fontSize = '10px'
				nameSeaDataBodyPressureWidget.style.fontSize = '10px'
				hrSeaDataBodyPressureWidget.style.width = '80%'
				hrSeaDataBodyPressureWidget.style.margin = '2px 0 2px 0'
				valueSeaDataBodyPressureWidget.style.fontSize = '12px'
				unitValueSeaDataBodyPressureWidget.style.fontSize = '10px'
				slashPressureWidget.style.width = '100%'
				slashPressureWidget.style.height = '2px'
				uvIndexWidget.style.width = '147.5px'
				bodyUvIndexWidget.style.flexDirection = 'column'
				bodyUvIndexWidget.style.fontSize = '2.1rem'
				uvIndexWidget.style.margin = '2.5px 2.5px 0 2.5px'
				container.style.gridTemplateAreas =
					'"wind sunrise-sunset air air visibility" "wind sunrise-sunset air air elevation" "max-min-temp humidity air air precipitation" "feels-like clouds uv-index pressure population"'
				container.style.gridTemplateColumns =
					' 202px 205px 152.5px 152.5px 142.5px'
			} else if (europe == false) {
				container.style.gridTemplateAreas =
					'"wind sunrise-sunset air visibility" "wind sunrise-sunset air elevation" "max-min-temp humidity pressure precipitation" "feels-like clouds uv-index population"'
				container.style.gridTemplateColumns = ' 202.5px 205px 305px 142.5px'
				airWidget.style.height = '200px'
				pressureWidget.style.width = '300px'
				pressureWidget.style.height = '100px'
				pressureWidget.style.margin = '2.5px 2.5px 2.5px 2.5px'
				bodyPressureWidget.style.flexDirection = 'column'
				nameGrndDataBodyPressureWidget.style.fontSize = '16px'
				hrGrndDataBodyPressureWidget.style.width = '136px'
				hrGrndDataBodyPressureWidget.style.margin = '8px 0 8px 0'
				valueGrndDataBodyPressureWidget.style.fontSize = '18px'
				unitValueGrndDataBodyPressureWidget.style.fontSize = '16px'
				nameSeaDataBodyPressureWidget.style.fontSize = '16px'
				hrSeaDataBodyPressureWidget.style.width = '136px'
				hrSeaDataBodyPressureWidget.style.margin = '8px 0 8px 0'
				valueSeaDataBodyPressureWidget.style.fontSize = '18px'
				unitValueSeaDataBodyPressureWidget.style.fontSize = '16px'
				slashPressureWidget.style.width = '2px'
				slashPressureWidget.style.height = '60px'
				uvIndexWidget.style.width = '300px'
				bodyUvIndexWidget.style.fontSize = '2.6rem'
				uvIndexWidget.style.margin = '2.5px 2.5px 0 2.5px'
			}
		}
	}

	const windDirection = () => {
		if (data.current) {
			let windDir = Math.round(data.current.wind_direction_10m)
			if (windDir >= 0 && windDir <= 30) return 'Ю'
			else if (windDir > 30 && windDir < 60) return 'ЮЗ'
			else if (windDir >= 60 && windDir <= 120) return 'З'
			else if (windDir > 120 && windDir < 150) return 'ЗС'
			else if (windDir >= 150 && windDir <= 210) return 'С'
			else if (windDir > 210 && windDir < 240) return 'СВ'
			else if (windDir >= 240 && windDir <= 300) return 'В'
			else if (windDir > 300 && windDir < 330) return 'ЮВ'
			else if (windDir >= 330 && windDir <= 360) return 'Ю'
		} else return ''
	}

	const fullWindDirection = () => {
		if (data.current) {
			let windDir = Math.round(data.current.wind_direction_10m)
			if (windDir >= 0 && windDir <= 30) return 'ЮГ'
			else if (windDir > 30 && windDir < 60) return 'Юго-Запад'
			else if (windDir >= 60 && windDir <= 120) return 'Запад'
			else if (windDir > 120 && windDir < 150) return 'Северо-Запад'
			else if (windDir >= 150 && windDir <= 210) return 'Север'
			else if (windDir > 210 && windDir < 240) return 'Северо-Восток'
			else if (windDir >= 240 && windDir <= 300) return 'Восток'
			else if (windDir > 300 && windDir < 330) return 'Юго-Восток'
			else if (windDir >= 330 && windDir <= 360) return 'Юг'
		} else return ''
	}

	//iso formatter
	const isoTime = dataTime => {
		if (data.daily) {
			let time = dataTime.slice(11)
			if (time[0] == 0) return time.slice(1)
			else return time
		} else return ''
	}

	//seconds formatter
	const secToHourTime = dataTime => {
		if (data.daily) {
			let time = new Date(Math.round(dataTime) * 1000)
				.toISOString()
				.substring(11, 13)
			if (time[0] == 0) return time.slice(1)
			else return time
		} else return ''
	}

	const secToMinTime = dataTime => {
		if (data.daily) {
			let time = new Date(Math.round(dataTime) * 1000)
				.toISOString()
				.substring(14, 16)
			if (time[0] == 0) return time.slice(1)
			else return time
		} else return ''
	}

	//get current time
	const hourCurrentTime = dataTime => {
		if (data.current && data.hourly) {
			let time = dataTime.slice(11, 13)
			if (time[0] == 0) return time.slice(1)
			else return time
		} else return ''
	}

	const airQualityIndex = () => {
		if (airData.current) {
			let index = airData.current.european_aqi
			if (index >= 0 && index < 20) return 'Хорошее'
			else if (index >= 20 && index < 40) return 'Удовлетв.'
			else if (index >= 40 && index < 60) return 'Умеренное'
			else if (index >= 60 && index < 80) return 'Плохое'
			else if (index >= 80 && index <= 100) return 'Очень плохое'
			else if (index > 100) return 'Крайне плохое'
		} else return ''
	}

	const airQualityIndexBG = () => {
		if (airData.current) {
			let index = airData.current.european_aqi
			if (index >= 0 && index < 20) return '#50f0e6'
			else if (index >= 20 && index < 40) return '#94eaa9'
			else if (index >= 40 && index < 60) return '#f0e641'
			else if (index >= 60 && index < 80) return '#ff5050'
			else if (index >= 80 && index <= 100) return '#960032'
			else if (index > 100) return '#7d2181'
		} else return ''
	}

	const uvIndex = () => {
		if (airData.current) {
			let index =
				(airData.current.uv_index + airData.current.uv_index_clear_sky) / 2
			if (index >= 0 && index < 3) return 'Низкий'
			else if (index >= 3 && index < 6) return 'Умеренный'
			else if (index >= 6 && index < 8) return 'Высокий'
			else if (index >= 8 && index < 11) return 'Очень высокий'
			else if (index >= 11) return 'Крайне высокий'
		} else return ''
	}

	const uvIndexBG = () => {
		if (airData.current) {
			let index =
				(airData.current.uv_index + airData.current.uv_index_clear_sky) / 2
			if (index >= 0 && index < 3) return '#94eaa9'
			else if (index >= 3 && index < 6) return '#f0e641'
			else if (index >= 6 && index < 8) return '#ff5050'
			else if (index >= 8 && index < 11) return '#960032'
			else if (index >= 11) return '#7d2181'
		} else return ''
	}

	const population = () => {
		if (ipData.results) {
			let pop = ipData.results[0].population
			if (pop >= 0 && pop < 1000) return pop
			else if (pop >= 1000 && pop < 1000000) return pop / 1000
			else if (pop >= 1000000 && pop < 1000000000) return pop / 1000000
			else if (pop >= 1000000000) return pop / 1000000000
		} else return ''
	}
	const populationUnit = () => {
		if (ipData.results) {
			let pop = ipData.results[0].population
			if (pop >= 0 && pop < 1000) return 'ч'
			else if (pop >= 1000 && pop < 1000000) return 'т'
			else if (pop >= 1000000 && pop < 1000000000) return 'млн'
			else if (pop >= 1000000000) return 'млрд'
		} else return ''
	}
	return (
		<div
			className='container-weather-app'
			style={{
				// backgroundImage: `url(${'https://www.indianablackexpo.com/wp-content/uploads/2020/04/James-C-Cummings.jpg'})`,
				backgroundImage: `url(${backgroundImage})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: '100%',
			}}
		>
			<div className='current-weather'>
				<div className='search'>
					<div
						id='search-top'
						className='search-top'
						onClick={hideShowSearchBar}
					>
						<div className='location'>
							<i className='fa-solid fa-location-dot'></i>
							<label>
								{locationCode
									? `${location}, ${locationCode}`
									: location
									? `${location}`
									: 'Не найдено'}
							</label>
						</div>
						<div id='my-location-button' className='my-location-button'>
							<i className='fa-solid fa-location-arrow'></i>
							<button
								className='my-location-btn'
								onClick={searchInMyLocation}
							/>
						</div>
					</div>
					<div id='search-bar' className='search-bar'>
						<input
							id='search-bar-input'
							autoComplete='off'
							title=''
							type='text'
							required
							value={inputLocation}
							onChange={handleInputChange}
							onKeyDown={handleKeyDown}
							ref={outsideAlerterRef}
						/>
						<label>Введите местоположение</label>
						<div className='clear-button'>
							<i className='fa-solid fa-xmark'></i>
							<button className='clear-btn' onClick={clearInput} />
						</div>
						<div className='search-button'>
							<i className='fa-solid fa-search'></i>
							<button id='search-btn' className='search-btn' onClick={search} />
						</div>
					</div>
				</div>
				{loading ? (
					<img className='loader' src={loadingGif} alt='loading' />
				) : data.notFound ? (
					<>
						<label className='not-found'>Местоположение не найдено</label>
						<img className='notFoundImage' src={notFoundImage} />
					</>
				) : (
					<>
						<div className='weather'>
							<label className='weather-date'>{formattedDate}</label>
							<img className='weatherImage' src={weatherImage} />
							<label className='temp'>
								{data.current
									? `${Math.round(data.current.temperature_2m)}°C`
									: null}
							</label>
							<label className='weatherDesc'>{weatherDesc}</label>
						</div>
					</>
				)}
			</div>
			<div id='description' className='description'>
				{loading ? null : data.notFound ? null : (
					<>
						<div className='wind'>
							<div className='head'>
								<div className='img-name'>
									<img src='https://cdn-icons-png.flaticon.com/512/2011/2011448.png' />
									<label className='data-name'>Ветер</label>
								</div>
								<div className='desc'>
									<label className='direction'>{windDirection()}</label>
									<label className='gust'>
										{data.current
											? `${Math.round(data.current.wind_gusts_10m)}`
											: null}
										<span className='unit'>м/с</span>
									</label>
									<label className='dir-title'>
										Направление ветра: {fullWindDirection()}
									</label>
									<label className='gust-title'>
										{data.current
											? 'Порывы ветра до ' +
											  `${Math.round(data.current.wind_gusts_10m)}` +
											  ' м/с'
											: null}
									</label>
								</div>
							</div>
							<div className='body'>
								<div className='compass'>
									<div className='data'>
										{data.current
											? `${Math.round(data.current.wind_speed_10m)}`
											: null}
										<span className='unit'>м/с</span>
									</div>
									<svg
										className='circle'
										xmlns='http://www.w3.org/2000/svg'
										//x y width height
										viewBox='100.5 31.5 130 270'
									>
										<g fill='none' fillRule='evenodd' opacity='.9'>
											<g
												stroke='#f06969'
												strokeLinecap='square'
												strokeLinejoin='bevel'
												strokeWidth={3}
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(180 83 149.4)'
												></path>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(3 -566.204 3300.048)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(6 -241.38 1723.694)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(9 -133.006 1197.762)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(12 -78.745 934.435)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(15 -46.128 776.15)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(18 -24.333 670.385)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(21 -8.724 594.63)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(24 3.021 537.632)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(27 12.19 493.137)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
												strokeWidth={2}
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(30 19.555 457.394)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(33 25.609 428.015)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(36 30.679 403.409)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(39 34.993 382.473)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(42 38.713 364.42)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(45 41.959 348.673)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(48 44.816 334.798)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(51 47.359 322.465)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(54 49.636 311.415)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(57 51.69 301.446)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
												strokeWidth={2}
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(60 53.555 292.394)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(63 55.258 284.128)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(66 56.822 276.539)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(69 58.264 269.538)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(72 59.601 263.051)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(75 60.845 257.016)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(78 62.007 251.379)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(81 63.096 246.095)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(84 64.12 241.125)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(87 65.086 236.437)'
												/>
											</g>
											<g
												stroke='#f06969'
												strokeLinecap='square'
												strokeLinejoin='bevel'
												strokeWidth={3}
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(90 66 232)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(93 66.868 227.79)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(96 67.694 223.784)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(99 68.48 219.962)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(102 69.233 216.307)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(105 69.955 212.805)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(108 70.649 209.44)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(111 71.317 206.2)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(114 71.96 203.075)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(117 72.582 200.056)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
												strokeWidth={2}
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(120 73.185 197.131)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(123 73.77 194.294)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(126 74.338 191.536)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(129 74.892 188.85)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(132 75.431 186.231)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(135 75.959 183.673)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(138 76.474 181.169)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(141 76.98 178.715)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(144 77.477 176.306)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(147 77.965 173.938)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
												strokeWidth={2}
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(150 78.445 171.606)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(153 78.919 169.306)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(156 79.386 167.036)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(159 79.85 164.79)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(162 80.307 162.566)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(165 80.762 160.362)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(168 81.213 158.171)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(171 81.662 155.993)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(174 82.109 153.824)'
												/>
											</g>
											<g
												stroke='#000'
												strokeLinecap='square'
												strokeLinejoin='bevel'
											>
												<path
													d='m.421 0 .158 17.999M.421 247l.158 17.999'
													transform='rotate(177 82.554 151.66)'
												/>
											</g>
											<g
												fill='#000'
												fontFamily='Arial-BoldMT, Arial'
												fontSize={36}
												fontWeight='bold'
											>
												<text transform='translate(60 60)'>
													<tspan x='92.501' y={33}>
														С
													</tspan>
												</text>
												<text transform='translate(60 60)'>
													<tspan x='178.494' y={118}>
														В
													</tspan>
												</text>
												<text transform='translate(60 60)'>
													<tspan x='93.494' y={203}>
														Ю
													</tspan>
												</text>
												<text transform='translate(60 60)'>
													<tspan x='3.511' y={118}>
														З
													</tspan>
												</text>
											</g>
										</g>
									</svg>
									<svg
										className='arrow'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='100.5 29.5 130 272'
										style={{
											transform: `rotate(${
												data.current
													? `${Math.round(data.current.wind_direction_10m)}`
													: null
											}deg)`,
											fill: '#f06969',
										}}
									>
										<path d='M163 103V57.785c-6.817-1.185-12-7.13-12-14.285 0-8.008 6.492-14.5 14.5-14.5S180 35.492 180 43.5c0 7.155-5.183 13.1-12 14.285V103h-5zm2.5-50a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19zm0 250L151 274h12v-47h5l-.001 47H180l-14.5 29z' />
									</svg>
								</div>
							</div>
						</div>
						<div className='max-min-temp'>
							<div className='head'>
								<img src='https://cdn-icons-png.flaticon.com/128/3815/3815282.png' />
								<label className='data-name'>Температура</label>
							</div>
							<div className='body'>
								<label className='data-name'>Макс.:</label>
								<label className='data-value'>
									{data.daily
										? `${Math.round(data.daily.temperature_2m_max[0])}`
										: null}
									<span className='unit'>°C</span>
								</label>
								<hr className='slash' />
								<label className='data-name'>Мин.:</label>
								<label className='data-value'>
									{data.daily
										? `${Math.round(data.daily.temperature_2m_min[0])}`
										: null}
									<span className='unit'>°C</span>
								</label>
							</div>
						</div>
						<div className='feels-like'>
							<div className='head'>
								<label className='data-name'>Ощущается как</label>
							</div>
							<div className='body'>
								<img src='https://cdn-icons-png.flaticon.com/512/11059/11059130.png' />
								{/* <img src='https://cdn-icons-png.flaticon.com/512/13779/13779995.png' /> */}
								<label className='data-value'>
									{data.current
										? `${Math.round(data.current.apparent_temperature)}`
										: null}
									<span className='unit'>°C</span>
								</label>
							</div>
						</div>
						<div className='sunrise-sunset'>
							<div className='head'>
								<label className='data-name'>Восход</label>
								<label className='data-name'>Закат</label>
							</div>
							<div className='body'>
								<div className='sunrise'>
									<img src='https://cdn-icons-png.flaticon.com/512/3920/3920639.png' />
									<hr />
									<label className='time'>
										{data.daily ? isoTime(data.daily.sunrise[0]) : null}
									</label>
								</div>
								<hr className='slash' />
								<div className='sunset'>
									<img src='https://cdn-icons-png.flaticon.com/512/3920/3920728.png' />
									<hr />
									<label className='time'>
										{' '}
										{data.daily ? isoTime(data.daily.sunset[0]) : null}
									</label>
								</div>
							</div>
							<div className='footer'>
								<label className='data-name'>Световой день:</label>
								<label className='data-time'>
									{data.daily
										? secToHourTime(data.daily.daylight_duration[0])
										: null}
									<span style={{ marginRight: '2px' }} className='unit'>
										ч
									</span>
									{data.daily
										? secToMinTime(data.daily.daylight_duration[0])
										: null}
									<span className='unit'>мин</span>
								</label>
								<hr />
								<label className='data-name'>Солнечное сияние:</label>
								<label className='data-time'>
									{data.daily
										? secToHourTime(data.daily.sunshine_duration[0])
										: null}
									<span style={{ marginRight: '2px' }} className='unit'>
										ч
									</span>
									{data.daily
										? secToMinTime(data.daily.sunshine_duration[0])
										: null}
									<span className='unit'>мин</span>
								</label>
							</div>
						</div>
						<div className='humidity'>
							<div className='head'>
								<img src='https://cdn-icons-png.flaticon.com/128/5164/5164068.png' />
								<div className='data-name'>Влажность</div>
							</div>
							<div
								className='body'
								style={{
									backgroundImage: `linear-gradient(to top, #f06969aa,#ffffff00 ${
										data.current
											? `${Math.round(data.current.relative_humidity_2m)}`
											: null
									}%)`,
								}}
							>
								<label className='data-value'>
									{data.current
										? `${Math.round(data.current.relative_humidity_2m)}`
										: null}
									<span className='unit'>%</span>
								</label>
								<div className='background'>
									<svg
										className='waves'
										xmlns='http://www.w3.org/2000/svg'
										xmlnsXlink='http://www.w3.org/1999/xlink'
										viewBox='0 24 150 28'
										preserveAspectRatio='none'
										shapeRendering='auto'
										style={{
											height: `${
												data.current
													? `${Math.round(data.current.relative_humidity_2m)}`
													: null
											}%`,
										}}
									>
										<defs>
											<path
												id='gentle-wave'
												d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
											/>
										</defs>
										<g className='parallax'>
											<use
												xlinkHref='#gentle-wave'
												x='48'
												y='0'
												fill='#f0696990'
											/>
											<use
												xlinkHref='#gentle-wave'
												x='48'
												y='3'
												fill='#f0696970'
											/>
											<use
												xlinkHref='#gentle-wave'
												x='48'
												y='5'
												fill='#f0696950'
											/>
										</g>
									</svg>
								</div>
							</div>
							<div className='footer'>
								<label className='data-name'>Точка росы</label>
								<label className='data-value'>
									{data.current && data.hourly
										? `${Math.round(
												data.hourly.dew_point_2m[
													hourCurrentTime(data.current.time)
												]
										  )}`
										: null}
									<span className='unit'>°C</span>
								</label>
							</div>
						</div>
						<div className='clouds'>
							<div className='head'>
								<img src='https://cdn-icons-png.flaticon.com/128/414/414876.png' />
								<div className='data-name'>Облачность</div>
							</div>
							<div className='body'>
								<label className='data-value'>
									{data.current
										? `${Math.round(data.current.cloud_cover)}`
										: null}
									<span className='unit'>%</span>
								</label>
								<div className='background'>
									<div className='cloud' />
								</div>
							</div>
						</div>
						<div id='air' className='air'>
							<div className='head'>
								{/* <img src='https://cdn-icons-png.flaticon.com/512/12015/12015807.png' /> */}
								<label className='data-name'>Качество воздуха</label>
								<label
									style={{ backgroundColor: `${airQualityIndexBG()}` }}
									className='index'
								>
									{airQualityIndex()}
								</label>
							</div>
							<div id='air-body' className='body'>
								<div className='item'>
									<label>
										PM
										<span className='unit'>10</span>
									</label>
									<hr />
									<label>{airData.current ? airData.current.pm10 : null}</label>
								</div>
								<div className='item'>
									<label>
										PM
										<span className='unit'>2.5</span>
									</label>
									<hr />
									<label>
										{' '}
										{airData.current ? airData.current.pm2_5 : null}
									</label>
								</div>
								<div className='item'>
									<label>CO</label>
									<hr />
									<label>
										{airData.current ? airData.current.carbon_monoxide : null}
									</label>
								</div>
								<div className='item'>
									<label>
										NO
										<span className='unit'>2</span>
									</label>
									<hr />
									<label>
										{airData.current ? airData.current.nitrogen_dioxide : null}
									</label>
								</div>
								<div className='item'>
									<label>
										SO
										<span className='unit'>2</span>
									</label>
									<hr />
									<label>
										{airData.current ? airData.current.sulphur_dioxide : null}
									</label>
								</div>
								<div className='item'>
									<label>
										O<span className='unit'>3</span>
									</label>
									<hr />
									<label>
										{airData.current ? airData.current.ozone : null}
									</label>
								</div>
								<div className='item'>
									<label>AOD</label>
									<hr />
									<label>
										{airData.current
											? airData.current.aerosol_optical_depth
											: null}
									</label>
								</div>
								<div className='item'>
									<label>Dust</label>
									<hr />
									<label>{airData.current ? airData.current.dust : null}</label>
								</div>
								{europe ? (
									<>
										<div className='item'>
											<label>
												NH
												<span className='unit'>3</span>
											</label>
											<hr />
											<label>
												{airData.current ? airData.current.ammonia : null}
											</label>
										</div>
										<div className='item'>
											<label style={{ fontSize: '12px', textAlign: 'center' }}>
												пыльца ольхи
											</label>
											<hr />
											<label>
												{airData.current ? airData.current.alder_pollen : null}
											</label>
										</div>
										<div className='item'>
											<label style={{ fontSize: '12px', textAlign: 'center' }}>
												пыльца березы
											</label>
											<hr />
											<label>
												{airData.current ? airData.current.birch_pollen : null}
											</label>
										</div>
										<div className='item'>
											<label style={{ fontSize: '12px', textAlign: 'center' }}>
												пыльца трав
											</label>
											<hr />
											<label>
												{airData.current ? airData.current.grass_pollen : null}
											</label>
										</div>
										<div className='item'>
											<label style={{ fontSize: '12px', textAlign: 'center' }}>
												пыльца полыни
											</label>
											<hr />
											<label>
												{airData.current
													? airData.current.mugwort_pollen
													: null}
											</label>
										</div>
										<div className='item'>
											<label style={{ fontSize: '12px', textAlign: 'center' }}>
												пыльца оливковых
											</label>
											<hr />
											<label>
												{airData.current ? airData.current.olive_pollen : null}
											</label>
										</div>
										<div id='air-body-lastItem' className='item'>
											<label style={{ fontSize: '12px', textAlign: 'center' }}>
												пыльца амброзии
											</label>
											<hr />
											<label>
												{airData.current
													? airData.current.ragweed_pollen
													: null}
											</label>
										</div>
									</>
								) : (
									<></>
								)}
							</div>
						</div>
						<div id='pressure' className='pressure'>
							<div className='head'>
								<img src='https://cdn-icons-png.flaticon.com/128/556/556958.png' />
								<label className='data-name'>Давление</label>
							</div>
							<div id='pressure-body' className='body'>
								<label id='pressure-body-data-grnd-name' className='data-name'>
									На уровне земли
								</label>
								<hr id='pressure-body-data-grnd-hr' />
								<label
									id='pressure-body-data-grnd-value'
									className='data-value'
								>
									{data.current
										? `${Math.round(data.current.surface_pressure * 0.75)}`
										: null}
									<span
										id='pressure-body-data-grnd-value-unit'
										className='unit'
									>
										мм рт.ст.
									</span>
								</label>

								<hr id='pressure-slash' className='slash' />

								<label id='pressure-body-data-sea-name' className='data-name'>
									На уровне моря
								</label>
								<hr id='pressure-body-data-sea-hr' />
								<label id='pressure-body-data-sea-value' className='data-value'>
									{data.current
										? `${Math.round(data.current.pressure_msl * 0.75)}`
										: null}
									<span id='pressure-body-data-sea-value-unit' className='unit'>
										мм рт.ст.
									</span>
								</label>
							</div>
						</div>
						<div id='uv-index' className='uv-index'>
							<div className='head'>
								<img src='https://cdn-icons-png.flaticon.com/512/9006/9006053.png' />
								<label className='data-name'>УФ-индекс</label>
							</div>
							<div
								id='uv-index-body'
								style={{ backgroundColor: `${uvIndexBG()}` }}
								className='body'
							>
								<label className='data-value'>
									{airData.current
										? `${Math.round(
												(airData.current.uv_index +
													airData.current.uv_index_clear_sky) /
													2
										  )}`
										: null}
								</label>
								<label className='data-value'>{uvIndex()}</label>
							</div>
						</div>
						<div className='visibility'>
							<div className='head'>
								<img src='https://cdn-icons-png.flaticon.com/128/3395/3395544.png' />
								<label className='data-name'>Видимость</label>
							</div>
							<div className='body'>
								<label className='data-value'>
									{data.current && data.hourly
										? `${Math.round(
												data.hourly.visibility[
													hourCurrentTime(data.current.time)
												] / 1000
										  )}`
										: null}
									<span className='unit'>км</span>
								</label>
							</div>
						</div>
						<div className='elevation'>
							<div className='head'>
								<img src='https://cdn-icons-png.flaticon.com/128/10023/10023545.png' />
								<label className='data-name'>Высота</label>
							</div>
							<div className='body'>
								<label className='data-value'>
									{data ? `${Math.round(data.elevation)}` : null}
									<span className='unit'>м</span>
								</label>
							</div>
						</div>
						<div className='precipitation'>
							<div className='head'>
								<img src='https://cdn-icons-png.flaticon.com/128/7363/7363548.png' />
								<label className='data-name'>Осадки</label>
							</div>
							<div className='body'>
								<label className='data-value'>
									{data.current
										? `${Math.round(data.current.precipitation)}`
										: null}
									<span className='unit'>мм</span>
								</label>
							</div>
						</div>
						<div className='population'>
							<div className='head'>
								<img src='https://cdn-icons-png.flaticon.com/128/33/33308.png' />
								<label className='data-name'>Население</label>
							</div>
							<div className='body'>
								<label className='data-value'>
									{ipData.results ? `${Math.round(population())}` : null}
									<span className='unit'>
										{ipData.results ? `${populationUnit()}` : null}
									</span>
								</label>
							</div>
						</div>
					</>
				)}
			</div>
			<div className='info'></div>
			<div className='five-days-forecast-weather'>
				{loading ? null : data.notFound ? null : (
					<>
						<label className='five-days-forecast-label'>
							Прогноз на 5 дней
						</label>
						<div className='five-days-forecast-card-container'>
							<div className='five-days-forecast-card-item'>
								<div className='icon-wrapper'>
									<img src={weatherImageDay1} className='weather-icon' />
									<div className='icon-wrapper-max-temp'>
										{data.daily
											? `Макс.: ${Math.round(
													data.daily.temperature_2m_max[1]
											  )}°`
											: null}
									</div>
									<hr />
									<div className='icon-wrapper-min-temp'>
										{data.daily
											? `мин.: ${Math.round(data.daily.temperature_2m_min[1])}°`
											: null}
									</div>
								</div>
								<div className='weather-desc-wrapper'>{weatherDescDay1}</div>
								<div className='date-wrapper'>
									<div className='date-wrapper-day-of-week'>{`${dayOfWeek(
										1
									)}`}</div>
									<hr />
									<div className='date-wrapper-day-of-month'>
										{`${dayOfMonth(1)} ${month(1)}`}
									</div>
								</div>
							</div>
							<hr />
							<div className='five-days-forecast-card-item'>
								<div className='icon-wrapper'>
									<img src={weatherImageDay2} className='weather-icon' />
									<div className='icon-wrapper-max-temp'>
										{data.daily
											? `Макс.: ${Math.round(
													data.daily.temperature_2m_max[2]
											  )}°`
											: null}
									</div>
									<hr />
									<div className='icon-wrapper-min-temp'>
										{data.daily
											? `мин.: ${Math.round(data.daily.temperature_2m_min[2])}°`
											: null}
									</div>
								</div>
								<div className='weather-desc-wrapper'>{`${weatherDescDay2}`}</div>
								<div className='date-wrapper'>
									<div className='date-wrapper-day-of-week'>{`${dayOfWeek(
										2
									)}`}</div>
									<hr />
									<div className='date-wrapper-day-of-month'>
										{`${dayOfMonth(2)} ${month(2)}`}
									</div>
								</div>
							</div>
							<hr />
							<div className='five-days-forecast-card-item'>
								<div className='icon-wrapper'>
									<img src={weatherImageDay3} className='weather-icon' />
									<div className='icon-wrapper-max-temp'>
										{data.daily
											? `Макс.: ${Math.round(
													data.daily.temperature_2m_max[3]
											  )}°`
											: null}
									</div>
									<hr />
									<div className='icon-wrapper-min-temp'>
										{data.daily
											? `мин.: ${Math.round(data.daily.temperature_2m_min[3])}°`
											: null}
									</div>
								</div>
								<div className='weather-desc-wrapper'>{weatherDescDay3}</div>
								<div className='date-wrapper'>
									<div className='date-wrapper-day-of-week'>{`${dayOfWeek(
										3
									)}`}</div>
									<hr />
									<div className='date-wrapper-day-of-month'>
										{`${dayOfMonth(3)} ${month(3)}`}
									</div>
								</div>
							</div>
							<hr />
							<div className='five-days-forecast-card-item'>
								<div className='icon-wrapper'>
									<img src={weatherImageDay4} className='weather-icon' />
									<div className='icon-wrapper-max-temp'>
										{data.daily
											? `Макс.: ${Math.round(
													data.daily.temperature_2m_max[4]
											  )}°`
											: null}
									</div>
									<hr />
									<div className='icon-wrapper-min-temp'>
										{data.daily
											? `мин.: ${Math.round(data.daily.temperature_2m_min[4])}°`
											: null}
									</div>
								</div>
								<div className='weather-desc-wrapper'>{weatherDescDay4}</div>
								<div className='date-wrapper'>
									<div className='date-wrapper-day-of-week'>{`${dayOfWeek(
										4
									)}`}</div>
									<hr />
									<div className='date-wrapper-day-of-month'>
										{`${dayOfMonth(4)} ${month(4)}`}
									</div>
								</div>
							</div>
							<hr />
							<div className='five-days-forecast-card-item'>
								<div className='icon-wrapper'>
									<img src={weatherImageDay5} className='weather-icon' />
									<div className='icon-wrapper-max-temp'>
										{data.daily
											? `Макс.: ${Math.round(
													data.daily.temperature_2m_max[5]
											  )}°`
											: null}
									</div>
									<hr />
									<div className='icon-wrapper-min-temp'>
										{data.daily
											? `мин.: ${Math.round(data.daily.temperature_2m_min[5])}°`
											: null}
									</div>
								</div>
								<div className='weather-desc-wrapper'>{weatherDescDay5}</div>
								<div className='date-wrapper'>
									<div className='date-wrapper-day-of-week'>{`${dayOfWeek(
										5
									)}`}</div>
									<hr />
									<div className='date-wrapper-day-of-month'>
										{`${dayOfMonth(5)} ${month(5)}`}
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
			<div className='today-forecast-weather'>
				{loading ? null : data.notFound ? null : (
					<>
						{/* <label className='forecast-label'>Прогноз на 5 дней</label>
						<div className='forecast-cards-container'>
							<div className='forecast-card'>
								<div className='forecast-date'>{formattedDate}</div>
								<img className='forecast-image' src={weatherImage} />
								<div className='forecast-temp'>
									{data.main ? `${Math.round(data.main.temp)}°C` : null}
								</div>
								<div className='forecastTempMaxMin'>
									{data.main
										? `Макс.: ${Math.round(
												data.main.temp_max
										  )}°, мин.: ${Math.round(data.main.temp_min)}°`
										: null}
								</div>
								<div className='forecast-desc'>{weatherDesc}</div>
							</div>
							<div className='forecast-card'>
								<div className='forecast-date'>{formattedDate}</div>
								<img className='forecast-image' src={weatherImage} />
								<div className='forecast-temp'>
									{data.main ? `${Math.round(data.main.temp)}°C` : null}
								</div>
								<div className='forecastTempMaxMin'>
									{data.main
										? `Макс.: ${Math.round(
												data.main.temp_max
										  )}°, мин.: ${Math.round(data.main.temp_min)}°`
										: null}
								</div>
								<div className='forecast-desc'>{weatherDesc}</div>
							</div>
							<div className='forecast-card'>
								<div className='forecast-date'>{formattedDate}</div>
								<img className='forecast-image' src={weatherImage} />
								<div className='forecast-temp'>
									{data.main ? `${Math.round(data.main.temp)}°C` : null}
								</div>
								<div className='forecastTempMaxMin'>
									{data.main
										? `Макс.: ${Math.round(
												data.main.temp_max
										  )}°, мин.: ${Math.round(data.main.temp_min)}°`
										: null}
								</div>
								<div className='forecast-desc'>{weatherDesc}</div>
							</div>
							<div className='forecast-card'>
								<div className='forecast-date'>{formattedDate}</div>
								<img className='forecast-image' src={weatherImage} />
								<div className='forecast-temp'>
									{data.main ? `${Math.round(data.main.temp)}°C` : null}
								</div>
								<div className='forecastTempMaxMin'>
									{data.main
										? `Макс.: ${Math.round(
												data.main.temp_max
										  )}°, мин.: ${Math.round(data.main.temp_min)}°`
										: null}
								</div>
								<div className='forecast-desc'>{weatherDesc}</div>
							</div>
							<div className='forecast-card'>
								<div className='forecast-date'>{formattedDate}</div>
								<img className='forecast-image' src={weatherImage} />
								<div className='forecast-temp'>
									{data.main ? `${Math.round(data.main.temp)}°C` : null}
								</div>
								<div className='forecastTempMaxMin'>
									{data.main
										? `Макс.: ${Math.round(
												data.main.temp_max
										  )}°, мин.: ${Math.round(data.main.temp_min)}°`
										: null}
								</div>
								<div className='forecast-desc'>{weatherDesc}</div>
							</div>
						</div> */}
					</>
				)}
			</div>
		</div>
	)
}

export default WeatherApp
