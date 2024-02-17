import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';
import { useEffect, useState } from 'react';
import Header from './Header';
import Welcome from '../blog/Welcome';
import { fetchHomeData } from '../../action/homeAction';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const homeData = useSelector((state) => state.home.homeData[0].content);
	const token = useSelector((state) => state.user.token);

	useEffect(() => {
		if (!token) {
			navigate('/login');
		} else {
			dispatch(fetchHomeData(token));
		}
	}, [token, navigate]);

	return (
		<Container fluid>
			<NavBar />
			<Row className='my-5'>
				<Col>
					<Header />
				</Col>
			</Row>
			<Row className=' flex-row flex-grow-1 h-100'>
				<Col className='d-flex flex-column justify-content-start gap-4'>
					{token === null ? (
						<h1 className='text-truncate text-center pb-3'>Effetua Il LogIn</h1>
					) : (
						<Container>
							<ListGroup>
								<ListGroup.Item className='border-0'>
									{homeData?.map((data, index) => {
										return <Welcome key={index} data={data} />;
									})}
								</ListGroup.Item>
							</ListGroup>
						</Container>
					)}
					{token === null && <Button onClick={() => navigate('/login')}>Login</Button>}
				</Col>
			</Row>
		</Container>
	);
};

export default Home;
