import { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getImageAction } from '../../action/actionTypes';
import { format, parseISO } from 'date-fns';
import '../../css/profile.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { postImageAction } from '../../action/user';

const ProfileModal = (props) => {
	const userData = useSelector((state) => state.user.userData[0]);
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState('');
	const dispatch = useDispatch();

	const handleShowPassword = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	const handreSubmit = (e) => {
		e.preventDefault();
	};
	const [formData, setFormData] = useState({
		username: '',
		name: '',
		surname: '',
		email: '',
		password: '',
		secretAnswer: '',
		profileImg: '',
		userBirthday: userData.userBirthday
			? `${format(parseISO(userData.userBirthday), 'yyyy-MM-dd')}`
			: '',
	});

	useEffect(() => {
		if (userData) {
			setFormData({
				...formData,
				username: userData.username || '',
				name: userData.name || '',
				surname: userData.surname || '',
				email: userData.email || '',
				password: userData.password || '',
				userBirthday: userData.userBirthday || '',
			});
		}
	}, [userData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<Modal
			className='modal-container-profile'
			id='modalBodyChange'
			{...props}
			size='md'
			aria-labelledby='contained-modal-title-vcenter'
			scrollable='true'>
			<Modal.Header closeButton>
				<Modal.Title>Editor</Modal.Title>
			</Modal.Header>
			<Modal.Body className='p-4'>
				<Form onSubmit={handreSubmit}>
					<Form.Label>Username</Form.Label>

					<Form.Group md='12' className='my-1'>
						<Form.Control
							required
							type='text'
							name='username'
							placeholder='username'
							value={userData.username}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group md='12' className='my-1'>
						<Form.Label>Name</Form.Label>

						<Form.Control
							required
							type='text'
							name='name'
							placeholder='name'
							value={userData.name}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Label>Surname</Form.Label>

					<Form.Group md='12' className='my-1'>
						<Form.Control
							required
							type='text'
							name='surname'
							placeholder='surname'
							value={userData.surname}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Label>Email</Form.Label>

					<Form.Group md='12' className='my-1'>
						<Form.Control
							required
							type='email'
							name='email'
							placeholder='email'
							value={userData.email}
							onChange={handleChange}
						/>
					</Form.Group>

					<Form.Label>New Password</Form.Label>
					<Form.Group md='12' className='my-1'>
						<InputGroup>
							<Form.Control
								type={showPassword ? 'text' : 'password'}
								name='password'
								placeholder='password'
								value={userData.password}
								onChange={handleChange}
							/>
							<InputGroup.Text onClick={handleShowPassword} type='button'>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</InputGroup.Text>
						</InputGroup>
					</Form.Group>

					<Form.Label>Confirm Password</Form.Label>
					<Form.Group md='12' className='my-1'>
						<InputGroup>
							<Form.Control
								type={showPassword ? 'text' : 'password'}
								name='password'
								placeholder='password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</InputGroup>
					</Form.Group>

					<Form.Group controlId='userBirthday'>
						<Form.Label>Birthday</Form.Label>

						<InputGroup>
							<Form.Control
								type='date'
								name='userBirthday'
								value={userData.userBirthday}
								onChange={handleChange}
							/>
						</InputGroup>
					</Form.Group>

					<Form.Group className='my-3'>
						<Form.Label>Profile Picture</Form.Label>
						<InputGroup>
							<Form.Control
								type='file'
								onChange={(e) => {
									const file = e.target.files[0];
									if (file) {
										const formData = new FormData();
										formData.append('profileImg', file);
										dispatch(getImageAction(formData));
									}
								}}
							/>
							<InputGroup.Text
								onClick={(e) => {
									e.preventDefault;
									dispatch(postImageAction());
								}}
								type='button'>
								Change
							</InputGroup.Text>
						</InputGroup>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={() => {}}>
					Close
				</Button>
				<Button variant='primary' onClick={() => {}}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ProfileModal;
