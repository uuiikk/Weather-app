import sunny from '../assets/images/sunny.png'
import iconCloudyWithClarifications from '../assets/images/iconCloudyWithClarifications.svg'
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
		if (displaySearchBar == false) {null
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
					<img className='sunny' src={sunny} alt='sunny' />
					<div className='temp'>
						{data.main ? `${Math.floor(data.main.temp)}°C` : null}
					</div>
					<div className='container-weather-type'>
						<img
							className='iconCloudyWithClarifications'
							src={iconCloudyWithClarifications}
							alt='iconCloudyWithClarifications'
						/>
						<div className='weather-type'>{weatherDesc}</div>
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
								{data.wind ? `${Math.floor(data.wind.speed)}` : null} км/ч
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WeatherApp
