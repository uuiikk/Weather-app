import sunny from '../assets/images/sunny.png'
import iconCloudyWithClarifications from '../assets/images/iconCloudyWithClarifications.svg'
import { useState } from 'react'

const WeatherApp = () => {
	const [data, setData] = useState({})
	const [location, setLocation] = useState('')

	const api_key_openWeatherMap = '4c7d8207eeb7d552ffc216363ee41bdc'

	var display = 0

	function showSearchBar() {
		var search_top = document.getElementById('search-top')
		var search_bar = document.getElementById('search-bar')
		if (display == 1) {
			search_top.style.display = 'flex'
			search_bar.style.display = 'none'
			display = 0
		} else {
			search_top.style.display = 'none'
			search_bar.style.display = 'flex'
			display = 1
		}
	}

	const handleInputChange = e => {
		setLocation(e.target.value)
	}

	const search = async () => {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key_openWeatherMap}`
		const res = await fetch(url)
		const searchData = await res.json()
		console.log(searchData)
		setData(searchData)
		setLocation('')
		console.log(data + location)

		//для анимации
		display = 1
		showSearchBar()
	}

	// const translateLocation = async () => {
	// 	//перевод
	// 	const translateUrl = `https://api.mymemory.translated.net/get?q=${data.name}&langpair=en-GB|ru-RU`
	// 	const translateRes = await fetch(translateUrl)
	// 	const translateLocation = await translateRes.json()
	// 	console.log(translateLocation.responseData.translatedText)
	// }

	return (
		<div className='container'>
			<div className='weather-app'>
				<div className='search'>
					<div id='search-top' className='search-top' onClick={showSearchBar}>
						<div className='location'>
							<i className='fa-solid fa-location-dot'></i>
							<label className='city'>{data.name}</label>
						</div>
					</div>
					<div id='search-bar' className='search-bar'>
						<input
							type='text'
							required
							value={location}
							onChange={handleInputChange}
						/>
						<label htmlFor=''>Введите местоположение</label>
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
					<div className='temp'>28°C</div>
					<div className='container-weather-type'>
						<img
							className='iconCloudyWithClarifications'
							src={iconCloudyWithClarifications}
							alt='iconCloudyWithClarifications'
						/>
						<div className='weather-type'>Облачно с прояснениями</div>
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
							<div className='data'>35%</div>
						</div>
						<div className='wind'>
							<div className='data-name'>Ветер</div>
							<i className='fa-solid fa-wind'></i>
							<div className='data'>3 км/ч</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WeatherApp
