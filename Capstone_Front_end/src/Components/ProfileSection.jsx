import { useState } from 'react';
import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from './modals/ProfileModal';
import '../css/profile.css';

import { deleteCurretUser } from '../action/user';
import NavBar from './home/NavBar';

const ProfileSection = () => {
	const dispatch = useDispatch();
	const [modalShow, setModalShow] = useState(false);
	const { isAuthenticated, user, token } = useSelector((state) => state.auth);
	const { homeColor } = useSelector((state) => state.reducer);

	return (
		<>
			{!isAuthenticated ? (
				'non sei autorizzato'
			) : (
				<>
					<NavBar />
					<ProfileModal show={modalShow} onHide={() => setModalShow(false)} />

					<Row
						className='d-flex justify-content-center align-items-center h-100 pt-5'
						style={{ backgroundColor: `rgb(${homeColor})` }}>
						<Col lg={8} className='mb-4 mb-lg-0'>
							<Card className='mb-3' id='profile-data'>
								<Row className='g-0'>
									<div id='drago'> </div>
									<Col md={4} className='gradient-custom text-center'>
										<Image
											src={user.profileImage}
											alt='Avatar'
											className='img-fluid my-4 mr-3 rounded-circle'
											style={{ width: '100px', height: '100px' }}
										/>
										<h5>
											{user.name} {user.surname}
										</h5>
										<p>Modify Profile</p>
										<FaEdit onClick={() => setModalShow(true)} className='mb-5' />
									</Col>
									<Col md={8}>
										<Card.Body className='p-4'>
											<h6>Information</h6>
											<hr className='mt-0 mb-4' />
											<Row className='pt-1'>
												<Col xs={12} className='mb-3'>
													<h6>Username</h6>
													<p className='text-muted'>{user.username}</p>
												</Col>
											</Row>
											<Row className='pt-1'>
												<Col xs={12} className='mb-3'>
													<h6>Email</h6>
													<p className='text-muted'>{user.email}</p>
												</Col>
											</Row>
											<h6>Other</h6>
											<hr className='mt-0 mb-4' />
											<Row className='pt-1'>
												<Col xs={6} className='mb-3'>
													<h6>B-Day</h6>
													<p className='text-muted'>{user.userBirthday}</p>
												</Col>
												<Col xs={6} className='mb-3'>
													<h6>Join date</h6>
													<p className='text-muted'>{user.userCreationDate}</p>
												</Col>
											</Row>
											<div className='d-flex justify-content-between'>
												<div>
													<a href='#!'>
														<FaFacebookF className='fa-lg me-3' />
													</a>
													<a href='#!'>
														<FaTwitter className='fa-lg me-3' />
													</a>
													<a href='#!'>
														<FaInstagram className='fa-lg' />
													</a>
												</div>
												<Button
													onClick={(e) => {
														e.preventDefault();
														dispatch(deleteCurretUser(token));
													}}>
													Cancellami
												</Button>
											</div>
										</Card.Body>
									</Col>
								</Row>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProfileSection;
