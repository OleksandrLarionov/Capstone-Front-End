import { useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { FaFacebook } from 'react-icons/fa';
import { FaSquareInstagram } from 'react-icons/fa6';
import { IoIosMail, IoIosLock } from 'react-icons/io';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../css/LoginForm.css';
import { fetchUserData, getTokenFromLogin } from '../action/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Google from './google/Google';
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
		<Container fluid className='component-container'>
			<Row className='f-flex justify-content-md-end  justify-content-sm-center' id='login'>
				<Col xs={12} sm={9} md={7} xl={5} xxl={4} className=' p-5 '>
					<Card>
						<Card.Header>
							<h3>Sign In</h3>

							<div className='d-flex justify-content-end social_icon'>
								<span>
									<Google />
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
											<IoIosLock />
										</InputGroup.Text>
										<Form.Control
											type={showPassword ? 'text' : 'password'}
											placeholder='password'
											className='text-dark'
											onChange={(e) => setPassword(e.target.value)}
										/>
										<InputGroup.Text onClick={handleShowPassword} type='button'>
											{showPassword ? <FaEyeSlash /> : <FaEye />}
										</InputGroup.Text>
									</InputGroup>
								</Form.Group>
								<Form.Group
									controlId='formRememberMe'
									className='d-flex align-items-center'>
									<Form.Check type='checkbox' label='Remember Me' />
								</Form.Group>
								<Row>
									<Col className='d-flex justify-content-end'>
										<Button variant='primary' type='submit' className='login_btn'>
											Login
										</Button>
									</Col>
								</Row>
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
				</Col>
			</Row>
		</Container>
	);
};

export default LoginForm;
