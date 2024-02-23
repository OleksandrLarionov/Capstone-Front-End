import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Welcome from '../blog/Welcome';
import { fetchHomeData } from '../../action/homeAction';
import NavBar from './NavBar';

const HomeComponent = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const homeData = useSelector((state) => state.home.homeData);

	const { isAuthenticated, token } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(fetchHomeData(token));
		} else {
			navigate('/login');
		}
	}, [token, navigate, isAuthenticated]);

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
										<ListGroup.Item className='border-0 p-0'>
											{homeData?.[0]?.content?.map((data, index) => {
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
		</>
	);
};

export default HomeComponent;
