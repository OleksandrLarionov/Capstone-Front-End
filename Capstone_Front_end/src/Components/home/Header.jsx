import { Row, Col, Image } from 'react-bootstrap';
import '../../css/header.css';
import backgroundImage2Test from '../../assets/img/pg2.jpg';
import { useDispatch } from 'react-redux';
import { SetHomeColor } from '../../action/actionTypes';
import { FastAverageColor } from 'fast-average-color';
import { useEffect } from 'react';

const Header = () => {
	const dispatch = useDispatch();

	const getColor = () => {
		const fac = new FastAverageColor();
		fac.getColorAsync(document.querySelector('#image'))
			.then((color) => {
				const avColor = color.rgb;

				let valoriRGBA = avColor.replace('rgb(', '').replace(')', '').split(',');
				let valori = valoriRGBA.slice(0, 3);
				const onlyRGB = valori.join(',');
				dispatch(SetHomeColor(onlyRGB));
				// if (container) {
				// 	const isToDarkOrWhite = color.isDark ? '#fff' : '#000';
				// 	container.style.color = isToDarkOrWhite;
				// }
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		getColor();
	}, []);

	return (
		<Row className='d-flex justify-content-center mb-5' id='header-container'>
			<Col md={7} className='p-0'>
				<Image
					className='d-block w-100'
					src={backgroundImage2Test}
					alt='First slide'
					id='image'
				/>
			</Col>
		</Row>
	);
};

export default Header;
