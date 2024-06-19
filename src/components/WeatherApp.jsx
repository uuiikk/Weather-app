import sunny from '../assets/images/sunny.png'
import iconCloudyWithClarifications from '../assets/images/iconCloudyWithClarifications.svg'

const WeatherApp = () => {
	return (
		<div className='container'>
			<div className='weather-app'>
				<div className='search'>
					<div className='search-top'>
						<div className='location'>
							<i className='fa-solid fa-location-dot'></i>
							<label className='city'>Санкт-Петербург</label>
						</div>
					</div>
					<div className='search-bar'>
						<input type='text' required />
						<label htmlFor=''>Введите местоположение</label>
						<div className='clear-button'>
							<i className='fa-solid fa-xmark'></i>
							<button className='clear-btn' />
						</div>
						<div className='search-button'>
							<i className='fa-solid fa-search'></i>
							<button className='search-btn' />
						</div>
					</div>
				</div>
				<div className='weather'>
					<img className='sunny' src={sunny} alt='sunny' />
					<div className='temp'>28°C</div>
					<img
						className='iconCloudyWithClarifications'
						src={iconCloudyWithClarifications}
						alt='iconCloudyWithClarifications'
					/>
					<div className='weather-type'>Облачно с прояснениями</div>
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
