import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { useEffect } from 'react';

const Home = () => {
	const navigate = useNavigate();
	const token = useSelector((state) => state.user.token);

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
