import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registration } from '../action/registration';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [validated, setValidated] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		username: '',
		name: '',
		surname: '',
		email: '',
		password: '',
		secretAnswer: '',
		profileImg: '',
		userBirthday: '',
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
		<Container>
			<Row className='justify-content-center'>
				<Col md={6}>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit(e);
						}}
						noValidate
						validated={validated}>
						<Form.Label>Welcome</Form.Label>
						<Form.Group controlId='username'>
							<Form.Label>Username</Form.Label>
							<InputGroup hasValidation>
								<Form.Control
									type='text'
									name='username'
									value={formData.username}
									onChange={handleChange}
									placeholder='Enter username'
									required
									isInvalid={validated && !formData.username}
								/>
							</InputGroup>
						</Form.Group>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
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
							<Form.Label>Surname</Form.Label>
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
							<Form.Label>Email</Form.Label>
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
							<Form.Label>Password</Form.Label>
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
							<Form.Label>Confirm Password</Form.Label>
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
						<Form.Group controlId='userBirthday'>
							<Form.Label>Birthday</Form.Label>
							*Campo non obbligatorio
							<InputGroup>
								<Form.Control
									type='date'
									name='userBirthday'
									value={formData.userBirthday}
									onChange={handleChange}
								/>
							</InputGroup>
						</Form.Group>
						<Button variant='primary' type='submit'>
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default RegistrationPage;
