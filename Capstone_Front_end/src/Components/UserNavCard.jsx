import { Col, Image, Nav, NavDropdown, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useEffect } from 'react';

function UserNavCard() {
	const { user, token } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	useEffect(() => {
		if (token == null) {
			navigate('/login');
		}
	}, [token]);
	return (
		<>
			{!user ? (
				'Effetua il LogIn'
			) : (
				<Nav>
					<Row>
						<Col className='d-flex justify-content-center align-items-center'>
							<div style={{ width: '45px', height: '45px' }}>
								<Image
									variant='top'
									src={
										user && user.profileImage ? user.profileImage : 'fallback_image_url'
									}
									alt='profileImage'
									className='mr-3 rounded-circle w-100 h-100'
								/>
							</div>
							<NavDropdown
								id='nav-dropdown-dark-example'
								title={
									user && user.username ? user.username : user.name + ' ' + user.surname
								}
								menuVariant='dark'
								className='mx-2 pe-2'
								align='end'>
								<NavDropdown.Item as={Link} to='/home/profile'>
									Profile
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item className='d-flex justify-content-end py-0 px-1'>
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
