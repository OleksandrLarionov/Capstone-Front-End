import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { fetchUserData, getTokenFromLogin } from '../action';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Google from './Google';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const alreadyLogged = useSelector((state) => state.user.userData);
	const handleShowPassword = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	const login = async (e) => {
		e.preventDefault();
		dispatch(getTokenFromLogin(email, password))
			.then((token) =>
				dispatch(fetchUserData(token)).then(() => {
					navigate('/home');
				})
			)
			.catch((error) => {
				console.error('Errore durante il login:', error);
			});
	};

	return (
		<Container>
			<Row className='d-flex '>
				<Col md={12}>
					<Form onSubmit={login}>
						<h1 className='m-2 mb-5'>login</h1>
						<Form.Group>
							<Form.Control
								type='text'
								placeholder='Email'
								className='text-dark'
								style={{ fontSize: '1.2rem' }}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>
						<InputGroup>
							<Form.Control
								type={showPassword ? 'text' : 'password'}
								placeholder='Password'
								className='text-dark m-2'
								style={{ fontSize: '1.2rem' }}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<InputGroup.Text onClick={handleShowPassword} type='button' className='m-2'>
								{showPassword ? 'Nascondi' : 'Mostra'}
							</InputGroup.Text>
						</InputGroup>

						<div>
							<button className='login-submit' type='submit'>
								login
							</button>
							<span className='opacity-50'>
								Non sei ancora registrato?{' '}
								<span
									className='text-decoration-underline'
									role='button'
									onClick={() => navigate('/register')}>
									CLICCA QUI
								</span>
							</span>
						</div>
					</Form>
				</Col>
			</Row>
			<Google />
		</Container>
	);
};

export default Login;
