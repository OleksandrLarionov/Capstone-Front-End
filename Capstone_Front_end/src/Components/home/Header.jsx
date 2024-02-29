import Carousel from 'react-bootstrap/Carousel';
import { Row, Col, Image } from 'react-bootstrap';
import '../../css/header.css';
import backgroundImage2Test from '../../assets/img/pgformatblog.webp';

import { useEffect, useRef } from 'react';
import { start } from '../../action/getColor';
import { useDispatch } from 'react-redux';
import { SetHomeColor } from '../../action/actionTypes';

const Header = () => {
	const imageRef = useRef(null);
	const dispatch = useDispatch();

	const loadImageAndExtractColor = () => {
		const img = imageRef.current;
		if (!img.complete) {
			img.onload = () => {
				const color = start(img);
				dispatch(SetHomeColor(color));
			};
		} else {
			const color = start(img);
			dispatch(SetHomeColor(color));
		}
	};

	useEffect(() => {
		loadImageAndExtractColor();
	}, []);

	return (
		<Row className='d-flex justify-content-center mb-5' id='header-container'>
			<Col md={7} className='p-0'>
				<Image
					className='d-block w-100'
					src={backgroundImage2Test}
					alt='First slide'
					id='image'
					ref={imageRef}
				/>
			</Col>
		</Row>
	);
};

export default Header;
