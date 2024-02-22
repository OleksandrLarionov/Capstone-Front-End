import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';
import { useEffect } from 'react';
import Header from './Header';
import Welcome from '../blog/Welcome';
import { fetchHomeData } from '../../action/homeAction';

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
				<Row className='my-5'>
					<Col>
						<Header />
					</Col>
				</Row>
				<Row className=' flex-row flex-grow-1 h-100'>
					<Col className='d-flex flex-column justify-content-start gap-4'>
						{!isAuthenticated ? (
							<h1 className='text-truncate text-center pb-3'>Effetua Il LogIn</h1>
						) : (
							<Container>
								<ListGroup>
									<ListGroup.Item className='border-0'>
										{homeData?.[0]?.content?.map((data, index) => {
											return <Welcome key={index} data={data} />;
										})}
									</ListGroup.Item>
								</ListGroup>
							</Container>
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
