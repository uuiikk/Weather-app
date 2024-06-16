import sunny from "../assets/images/sunny.png"


const WeatherApp = () => {
  return (
		<div className='container'>
			<div className='weather-app'>
				<div className='search'>
					<div className='search-top'>
						<i className='fa-solid fa-location-dot'></i>
						<div className='location'>Лондон</div>
					</div>
					<div className='search-bar'>
						<input type='text' required />
						<label htmlFor=''>Введите местоположение</label>
						<i className='fa-solid fa-magnifying-glass'></i>
					</div>
				</div>
				<div className='weather'>
					<img src={sunny} alt='sunny' />
					<div className='weather-type'>Ясно</div>
					<div className='temp'>28°C</div>
				</div>
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
	)
}

export default WeatherApp