import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { setUserToken } from '../action/actionTypes';
import { fetchUserData } from '../action/user';

const Home = () => {
	const navigate = useNavigate();
	const token = useSelector((state) => state.user.token);
	const dispatch = useDispatch();
	useEffect(() => {
		const storedToken = Cookies.get('token');
		if (!token && storedToken) {
			dispatch(setUserToken(storedToken));
		}
	}, [token, dispatch]);

	useEffect(() => {
		if (!token) {
			navigate('/login');
		}
	}, [token, navigate]);
	return (
		<Container fluid>
			<NavBar />
			<Row className=' flex-row flex-grow-1 h-100'>
				<Col className='d-flex flex-column justify-content-start gap-4'>
					{token === null ? (
						<h1 className='text-truncate text-center pb-3'>Effetua Il LogIn</h1>
					) : (
						<h1 className='text-truncate text-center'>Benvenuto</h1>
					)}
					{token === null && <Button onClick={() => navigate('/login')}>Login</Button>}
				</Col>
			</Row>
		</Container>
	);
};

export default Home;
