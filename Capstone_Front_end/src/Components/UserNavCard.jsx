import { Col, Image, Nav, NavDropdown, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useEffect } from 'react';

function UserNavCard() {
	const userData = useSelector((state) => state.user.userData[0]);
	const token = useSelector((state) => state.user.token);
	const navigate = useNavigate();
	useEffect(() => {
		if (token == null) {
			navigate('/login');
		}
	}, [token]);
	return (
		<>
			{userData == null ? (
				'Effetua il LogIn'
			) : (
				<Nav>
					<Row>
						<Col className='d-flex justify-content-center align-items-center'>
							<Image
								variant='top'
								src={userData.profileImage}
								alt='profileImage'
								style={{ width: '35px', height: '35px' }}
								className='mr-3 rounded-circle'
							/>
							<NavDropdown
								id='nav-dropdown-dark-example'
								title={
									userData.username
										? userData.username
										: userData.name + ' ' + userData.surname
								}
								menuVariant='dark'
								className='mx-2 pe-2'
								align='end'>
								<NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
								<NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
								<NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href='#action/3.4' className='d-flex justify-content-end'>
									<LogoutButton />
								</NavDropdown.Item>
							</NavDropdown>
						</Col>
					</Row>
				</Nav>
			)}
		</>
	);
}

export default UserNavCard;
