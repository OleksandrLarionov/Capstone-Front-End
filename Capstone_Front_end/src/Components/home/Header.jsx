import Carousel from 'react-bootstrap/Carousel';
import { Row, Col, Image } from 'react-bootstrap';
import '../../css/header.css';
import backgroundImage from '../../assets/img/pg2.jpg';
const Header = (props) => {
	return (
		<Row className='d-flex justify-content-center mb-5' id='header-container'>
			<Col md={7} className='p-0'>
				<Carousel
					data-bs-theme='dark'
					interval={null}
					controls={false}
					slide={false}
					indicators={false}>
					<Carousel.Item>
						<Image className='d-block w-100 h-100' src={backgroundImage} alt='First slide' />
						{/* <Carousel.Caption>
							<h5>First slide label</h5>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption> */}
					</Carousel.Item>
					<Carousel.Item>
						<Image
							className='d-block w-100 h-100'
							src='https://c.wallhere.com/photos/44/f6/1536x1280_px_Dice_Dungeons_And_Dragons-1260367.jpg!d'
							alt='Second slide'
						/>
						{/* <Carousel.Caption>
							<h5>Second slide label</h5>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</Carousel.Caption> */}
					</Carousel.Item>
					<Carousel.Item>
						<Image
							className='d-block w-100 h-100'
							src='https://c.wallhere.com/photos/c4/8d/artwork_digital_art_concept_art_Dungeons_Dragons_Dungeons_and_Dragons-102032.jpg!d'
							alt='Third slide'
						/>
						{/* <Carousel.Caption>
							<h5>Third slide label</h5>
							<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
						</Carousel.Caption> */}
					</Carousel.Item>
				</Carousel>
			</Col>
		</Row>
	);
};

export default Header;
