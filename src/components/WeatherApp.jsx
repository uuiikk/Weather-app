import thunderstorm200 from '../assets/images/thunderstorm200.svg'
import thunderstorm201 from '../assets/images/thunderstorm201.svg'
import thunderstorm202 from '../assets/images/thunderstorm202.svg'
import thunderstorm210 from '../assets/images/thunderstorm210.svg'
import thunderstorm211 from '../assets/images/thunderstorm211.svg'
import thunderstorm222 from '../assets/images/thunderstorm222.svg'
import thunderstorm230 from '../assets/images/thunderstorm230.svg'
import thunderstorm231 from '../assets/images/thunderstorm231.svg'
import thunderstorm232 from '../assets/images/thunderstorm232.svg'
import drizzle300 from '../assets/images/drizzle300.svg'
import drizzle301 from '../assets/images/drizzle301.svg'
import drizzle302 from '../assets/images/drizzle302.svg'
import drizzle310 from '../assets/images/drizzle310.svg'
import drizzle313 from '../assets/images/drizzle313.svg'
import drizzle314 from '../assets/images/drizzle314.svg'
import rain500 from '../assets/images/rain500.svg'
import rain501 from '../assets/images/rain501.svg'
import rain50234 from '../assets/images/rain50234.svg'
import rain511 from '../assets/images/rain511.svg'
import rain5201 from '../assets/images/rain5201.svg'
import rain522 from '../assets/images/rain522.svg'
import rain531 from '../assets/images/rain531.svg'
import snow600 from '../assets/images/snow600.svg'
import snow601 from '../assets/images/snow601.svg'
import snow602 from '../assets/images/snow602.svg'
import snow611 from '../assets/images/snow611.svg'
import snow612 from '../assets/images/snow612.svg'
import snow613 from '../assets/images/snow613.svg'
import snow61520 from '../assets/images/snow61520.svg'
import snow61621 from '../assets/images/snow61621.svg'
import snow622 from '../assets/images/snow622.svg'
import clear from '../assets/images/clear.svg'
import clouds801 from '../assets/images/clouds801.svg'
import clouds802 from '../assets/images/clouds802.svg'
import clouds803 from '../assets/images/clouds803.svg'
import clouds804 from '../assets/images/clouds804.svg'
import mist from '../assets/images/mist.svg'
import smoke from '../assets/images/smoke.png'
import haze from '../assets/images/haze.png'
import dust from '../assets/images/dust.png'
import fog from '../assets/images/fog.png'
import sand from '../assets/images/sand.png'
import ash from '../assets/images/ash.png'
import squall from '../assets/images/squall.svg'
import tornado from '../assets/images/tornado.svg'
import { useState, useEffect, useRef } from 'react'

const WeatherApp = () => {
	const [data, setData] = useState({})
	const [location, setLocation] = useState('')
	const [weatherDesc, setWeatherDesc] = useState('')
	const api_key_openWeatherMap = '4c7d8207eeb7d552ffc216363ee41bdc'
	const api_key_BigDataCloud = 'bdc_96fdba2986b34eba83bd8725d7dc456f'

	useEffect(() => {
		data.weather ? capitalizeFirstLetter() : null
	}, [data.weather])

	useEffect(() => {
		const fetchDefaultWeather = async () => {
			const urlLocation = `https://api-bdc.net/data/ip-geolocation?&localityLanguage=ru&key=${api_key_BigDataCloud}`
			const resLocation = await fetch(urlLocation)
			const searchData = await resLocation.json()
			setLocation(searchData.location.city)
			const defaultLocation = searchData.location.city
			const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&lang=ru&appid=${api_key_openWeatherMap}`
			const resWeather = await fetch(urlWeather)
			const defaultWeatherData = await resWeather.json()
			setData(defaultWeatherData)
			console.log(defaultWeatherData)
			setLocation('')
		}
		fetchDefaultWeather()
	}, [])

	//для анимации
	var displaySearchBar = false

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
		if (displaySearchBar == true) {
			search_top.style.display = 'flex'
			search_bar.style.display = 'none'
			displaySearchBar = false
		} else if (displaySearchBar == false) {
			search_top.style.display = 'none'
			search_bar.style.display = 'flex'
			displaySearchBar = true
		}
	}
	//////////////////////////////////////////////////////////////
	const handleInputChange = e => {
		setLocation(e.target.value)
	}

	const search = async () => {
		if (location.trim() !== '') {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&lang=ru&appid=${api_key_openWeatherMap}`
			const res = await fetch(url)
			const searchData = await res.json()
			console.log(searchData)
			setData(searchData)
			setLocation('')
			//для анимации
			displaySearchBar = true
			hideShowSearchBar()
		}
	}

	const capitalizeFirstLetter = async () => {
		setWeatherDesc(
			data.weather[0].description.charAt(0).toUpperCase() +
				data.weather[0].description.slice(1)
		)
	}

	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			search()
		}
	}

	const weatherImages = {
		200: thunderstorm200,
		201: thunderstorm201,
		202: thunderstorm202,
		210: thunderstorm210,
		211: thunderstorm211,
		212: thunderstorm222,
		221: thunderstorm222,
		230: thunderstorm230,
		231: thunderstorm231,
		232: thunderstorm232,
		300: drizzle300,
		301: drizzle301,
		302: drizzle302,
		310: drizzle310,
		311: drizzle301,
		312: drizzle302,
		313: drizzle313,
		314: drizzle314,
		321: drizzle310,
		500: rain500,
		501: rain501,
		502: rain50234,
		503: rain50234,
		504: rain50234,
		511: rain511,
		520: rain5201,
		521: rain5201,
		522: rain522,
		531: rain531,
		600: snow600,
		601: snow601,
		602: snow602,
		611: snow611,
		612: snow612,
		613: snow613,
		615: snow61520,
		616: snow61621,
		620: snow61520,
		621: snow61621,
		622: snow622,
		800: clear,
		801: clouds801,
		802: clouds802,
		803: clouds803,
		804: clouds804,
		701: mist,
		711: smoke,
		721: haze,
		731: dust,
		741: fog,
		751: sand,
		761: ash,
		771: squall,
		781: tornado,
	}

	const weatherImage = data.weather
		? weatherImages[data.weather[0].id]
		: null

	return (
		<div className='container'>
			<div className='weather-app'>
				<div className='search'>
					<div
						id='search-top'
						className='search-top'
						onClick={hideShowSearchBar}
					>
						<div className='location'>
							<i className='fa-solid fa-location-dot'></i>
							{data.name && <label>{data.name}</label>}
						</div>
					</div>
					<div id='search-bar' className='search-bar'>
						<input
							id='search-bar-input'
							type='text'
							required
							value={location}
							onChange={handleInputChange}
							onKeyDown={handleKeyDown}
							ref={outsideAlerterRef}
						/>
						<label htmlFor='search-bar-input'>Введите местоположение</label>
						<div className='clear-button'>
							<i className='fa-solid fa-xmark'></i>
							<button className='clear-btn' />
						</div>
						<div className='search-button'>
							<i className='fa-solid fa-search'></i>
							<button id='search-btn' className='search-btn' onClick={search} />
						</div>
					</div>
				</div>
				<div className='weather'>
					<img className='weatherImage' src={weatherImage} />
					<div className='temp'>
						{data.main ? `${Math.floor(data.main.temp)}°C` : null}
					</div>
					<div className='container-weather-type'>
						<div className='weatherDesc'>{weatherDesc}</div>
						<div className='weatherTempFeelsLike'>
							{data.main
								? `Ощущается как: ${Math.floor(data.main.feels_like)}°C`
								: null}
						</div>
						<div className='weatherTempMaxMin'>
							{data.main
								? `Макс.: ${Math.floor(
										data.main.temp_max
								)}°, мин.: ${Math.floor(data.main.temp_min)}°`
								: null}
						</div>
					</div>
				</div>
				<div className='weather-additional-info'>
					<div className='weather-date'>
						<p>Воскресенье, 16.06</p>
					</div>
					<div className='weather-data'>
						<div className='humidity'>
							<div className='data-name'>Влажность</div>
							<i className='fa-solid fa-droplet'></i>
							<div className='data'>
								{data.main ? data.main.humidity : null}%
							</div>
						</div>
						<div className='wind'>
							<div className='data-name'>Ветер</div>
							<i className='fa-solid fa-wind'></i>
							<div className='data'>
								{data.wind ? `${Math.floor(data.wind.speed)}` : null} м/с
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WeatherApp
