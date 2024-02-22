import { useEffect, useState } from 'react';
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
import Cookies from 'js-cookie';
import { fetchHomeData } from '../action/homeAction';

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validated, setValidated] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

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

	const setRemember = (e) => {
		e.preventDefault;
		if (rememberMe) {
			Cookies.set('email', email, { expires: 7 });
			Cookies.set('password', password, { expires: 7 });
		} else {
			Cookies.remove('email');
			Cookies.remove('password');
		}
	};
	const handleRememberMeChange = (e) => {
		setRememberMe(e.target.checked);
	};

	const handleSubmit = (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}
		setValidated(true);
		setRemember(e);
		login(e);
	};

	useEffect(() => {
		const storedEmail = Cookies.get('email');
		const storedPassword = Cookies.get('password');
		if (storedEmail && storedPassword) {
			setEmail(storedEmail);
			setPassword(storedPassword);
			setRememberMe(true);
		}
	}, [email, password]);

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
							<Form
								onSubmit={(e) => {
									e.preventDefault();
									handleSubmit(e);
								}}
								noValidate
								validated={validated}>
								<Form.Group controlId='formEmail'>
									<Form.Label>Email</Form.Label>
									<InputGroup hasValidation>
										<InputGroup.Text id='inputGroupPrepend'>
											<IoIosMail />
										</InputGroup.Text>
										<Form.Control
											type='email'
											placeholder='Email'
											className='text-dark'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
											isInvalid={validated && !email}
										/>
										<Form.Control.Feedback type='invalid'>
											Please enter a valid email address.
										</Form.Control.Feedback>
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
											value={password}
											className='text-dark'
											onChange={(e) => setPassword(e.target.value)}
											isInvalid={validated && !password}
											required
										/>
										<InputGroup.Text onClick={handleShowPassword} type='button'>
											{showPassword ? <FaEyeSlash /> : <FaEye />}
										</InputGroup.Text>
										<Form.Control.Feedback type='invalid'>
											Please enter password
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
								<Form.Group
									controlId='formRememberMe'
									className='d-flex align-items-center'>
									<Form.Check
										type='checkbox'
										label='Remember Me'
										checked={rememberMe}
										onChange={handleRememberMeChange}
									/>
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
							<Row className=' links d-flex flex-column'>
								<Col className='text-center'>
									<span>
										Don't have an account?<a href='/register'>Sign Up</a>
									</span>
								</Col>

								<Col className='d-flex justify-content-center'>
									<a href='#'>Forgot your password?</a>
								</Col>
							</Row>
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default LoginForm;
