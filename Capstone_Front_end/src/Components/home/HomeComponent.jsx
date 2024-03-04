import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Welcome from '../blog/Welcome';
import NavBar from './NavBar';
import Footer from '../Footer';

const HomeComponent = () => {
	const navigate = useNavigate();
	const { homeData } = useSelector((state) => state.home);
	const { isAuthenticated } = useSelector((state) => state.auth);
	const { homeColor } = useSelector((state) => state.reducer);

	return (
		<>
			<NavBar />
			<Container fluid>
				<Header />
				<Row>
					<Col className='d-flex flex-column justify-content-start'>
						{!isAuthenticated ? (
							<h1 className='text-truncate text-center pb-3'>Effetua Il LogIn</h1>
						) : (
							<Row className='d-flex justify-content-center'>
								<Col md={7} className='p-0'>
									<ListGroup>
										<ListGroup.Item
											className='border-0 p-0'
											style={{
												background: `linear-gradient(135deg, rgba(${
													(homeColor, 0.9)
												}) 39%)`,
											}}>
											{homeData?.content?.map((data, index) => {
												return <Welcome key={index} data={data} />;
											})}
										</ListGroup.Item>
									</ListGroup>
								</Col>
							</Row>
						)}
						{isAuthenticated === null && (
							<Button onClick={() => navigate('/login')}>Login</Button>
						)}
					</Col>
				</Row>
			</Container>
			<Footer />
		</>
	);
};

export default HomeComponent;
