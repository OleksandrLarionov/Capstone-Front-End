import { Container, Row, Col, Form, Button, InputGroup, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registration } from '../action/registration';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SwitchButton from './buttons/SwitchButton';

const RegistrationPage = ({ switchButton, handleSwitchChange }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [validated, setValidated] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState(null);

	const [formData, setFormData] = useState({
		name: '',
		surname: '',
		email: '',
		password: '',
	});
	const handleShowPassword = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};
	const checkIfPassAreEquals = () => {
		if (formData.password !== confirmPassword) {
			setError('Le due password non corrispondono!');
			return false;
		} else {
			setError(null);
			return true;
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else if (checkIfPassAreEquals()) {
			dispatch(registration(formData));
			navigate('/login');
		}
		setValidated(true);
	};
	return (
		<Card className='flip-card-back'>
			<Container>
				<Row className='justify-content-center'>
					<Col md={12}>
						<Form
							onSubmit={(e) => {
								e.preventDefault();
								handleSubmit(e);
							}}
							noValidate
							validated={validated}>
							<Form.Group controlId='name'>
								<Row className='text-start'>
									<Col>
										<Form.Label>Name</Form.Label>
									</Col>
								</Row>
								<InputGroup hasValidation>
									<Form.Control
										type='text'
										name='name'
										value={formData.name}
										onChange={handleChange}
										placeholder='Enter name'
										required
										isInvalid={validated && !formData.name}
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group controlId='surname'>
								<Row className='text-start'>
									<Col>
										<Form.Label>Surname</Form.Label>
									</Col>
								</Row>
								<InputGroup hasValidation>
									<Form.Control
										type='text'
										name='surname'
										value={formData.surname}
										onChange={handleChange}
										placeholder='Enter surname'
										required
										isInvalid={validated && !formData.surname}
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group controlId='email'>
								<Row className='text-start'>
									<Col>
										<Form.Label>Email</Form.Label>
									</Col>
								</Row>
								<InputGroup hasValidation>
									<Form.Control
										type='email'
										name='email'
										value={formData.email}
										onChange={handleChange}
										placeholder='Enter email'
										required
										isInvalid={validated && !formData.email}
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group controlId='password'>
								<Row className='text-start'>
									<Col>
										<Form.Label>Password</Form.Label>
									</Col>
								</Row>
								<InputGroup hasValidation>
									<Form.Control
										type={showPassword ? 'text' : 'password'}
										name='password'
										value={formData.password}
										onChange={handleChange}
										placeholder='Enter password'
										required
										isInvalid={validated && !formData.password}
									/>
									<InputGroup.Text onClick={handleShowPassword} type='button'>
										{showPassword ? <FaEyeSlash /> : <FaEye />}
									</InputGroup.Text>
								</InputGroup>
							</Form.Group>
							<Form.Group controlId='confirmPassword'>
								<Row className='text-start'>
									<Col>
										<Form.Label>Confirm Password</Form.Label>
									</Col>
								</Row>
								<InputGroup hasValidation>
									<Form.Control
										type={showPassword ? 'text' : 'password'}
										name='confirmPassword'
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										placeholder='Confirm password'
										required
										isInvalid={validated && !confirmPassword}
									/>
									<Form.Control.Feedback type='invalid'>yoyo</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Row>
								<Col className='d-flex justify-content-between pt-2'>
									<SwitchButton
										handleSwitchChange={handleSwitchChange}
										switchButton={switchButton}
										name={'LogIn'}
									/>
									<Button variant='primary' type='submit'>
										Submit
									</Button>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>
			</Container>
		</Card>
	);
};

export default RegistrationPage;
