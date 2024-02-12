import { useState } from 'react';
import { Button, Card, Container, Form, InputGroup } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { FaSquareInstagram } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import { FcLock } from 'react-icons/fc';
import '../css/LoginForm.css';
import { fetchUserData, getTokenFromLogin } from '../action/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const handleShowPassword = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleNavigateGoogleLogin = (e) => {
		e.preventDefault();
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
			<div className='d-flex justify-content-center h-100'>
				<Card>
					<Card.Header>
						<h3>Sign In</h3>

						<div className='d-flex justify-content-end social_icon'>
							<span>
								<FcGoogle />
							</span>
							<span>
								<FaFacebook />
							</span>
							<span>
								<FaSquareInstagram />
							</span>
						</div>
					</Card.Header>
					<Card.Body>
						<Form onSubmit={login}>
							<Form.Group controlId='formEmail'>
								<Form.Label>Email</Form.Label>
								<InputGroup hasValidation>
									<InputGroup.Text id='inputGroupPrepend'>
										<IoIosMail />
									</InputGroup.Text>
									<Form.Control
										type='text'
										placeholder='Email'
										className='text-dark'
										onChange={(e) => setEmail(e.target.value)}
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group controlId='formPassword'>
								<Form.Label>Password</Form.Label>
								<InputGroup hasValidation>
									<InputGroup.Text id='inputGroupPrepend'>
										<FcLock />
									</InputGroup.Text>
									<Form.Control
										type={showPassword ? 'text' : 'password'}
										placeholder='password'
										className='text-dark'
										onChange={(e) => setPassword(e.target.value)}
									/>
									<InputGroup.Text onClick={handleShowPassword} type='button'>
										{showPassword ? 'Nascondi' : 'Mostra'}
									</InputGroup.Text>
								</InputGroup>
							</Form.Group>
							<Form.Group controlId='formRememberMe' className='d-flex align-items-center'>
								<Form.Check type='checkbox' label='Remember Me' />
							</Form.Group>
							<Button variant='primary' type='submit' className='float-right login_btn'>
								Login
							</Button>
						</Form>
					</Card.Body>
					<Card.Footer>
						<div className='d-flex justify-content-center links'>
							Don't have an account?<a href='#'>Sign Up</a>
						</div>
						<div className='d-flex justify-content-center'>
							<a href='#'>Forgot your password?</a>
						</div>
					</Card.Footer>
				</Card>
			</div>
		</Container>
	);
};

export default LoginForm;
