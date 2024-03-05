import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import '../../css/footer.css';
import Logo from '../Logo';
import { FaGithub } from 'react-icons/fa';
import { IoLogoLinkedin } from 'react-icons/io5';
import { FaSquareInstagram } from 'react-icons/fa6';
import { FaFacebook } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Footer = ({ handleSwitchChange }) => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	function annoCorrente() {
		const dataCorrente = new Date();
		const anno = dataCorrente.getFullYear();
		return anno;
	}

	return (
		<Container fluid className='content-footer align-items-center bg-light mt-5 px-0'>
			<footer className='footer-c'>
				<Container className='ff pb-5'>
					<div
						className={
							!isAuthenticated ? 'dc d-md-flex align-items-center px-5' : 'invisible'
						}>
						<div>
							<h2>Ready for your next adventure?</h2>
							<h3>Let's get started!</h3>
						</div>
						<div className='ml-auto'>
							<Button
								onClick={(e) => {
									handleSwitchChange(e);
									window.location.href = '#sign_in';
								}}>
								Sing in
							</Button>
						</div>
					</div>
					<Row className='footer-links'>
						<Col className='c-sm d-flex justify-content-center ' md={2}>
							<Logo />
							<p>© {annoCorrente()}</p>
						</Col>
						<Col className='d-flex'>
							<Col className='c-sm'>
								<h3>Customers</h3>
								<ListGroup>
									<ListGroup.Item>Players</ListGroup.Item>
								</ListGroup>
							</Col>
							<Col className='c-sm'>
								<h3>Company</h3>
								<ListGroup>
									<ListGroup.Item>Larionov Oleksandr</ListGroup.Item>
								</ListGroup>
							</Col>
							<Col className='c-md d-flex align-items-center flex-column'>
								<h3>Follow me</h3>
								<ListGroup className='d-flex flex-row justify-content-center'>
									<ListGroup.Item>
										<Link to={'https://github.com/OleksandrLarionov'} target='_blank'>
											<FaGithub />
										</Link>
									</ListGroup.Item>
									<ListGroup.Item>
										<Link
											to={'https://www.linkedin.com/in/oleksandrlarionov-developer'}
											target='_blank'>
											{' '}
											<IoLogoLinkedin />
										</Link>
									</ListGroup.Item>
									<ListGroup.Item>
										<Link
											to={
												'https://www.instagram.com/alex.calisthenics?igsh=dTlndDRzczk3OGJ1'
											}>
											{' '}
											<FaSquareInstagram />
										</Link>
									</ListGroup.Item>
									<ListGroup.Item>
										<FaFacebook />
									</ListGroup.Item>
								</ListGroup>
							</Col>
						</Col>
					</Row>
				</Container>
			</footer>
		</Container>
	);
};

export default Footer;
