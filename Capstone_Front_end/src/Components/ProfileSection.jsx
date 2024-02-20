import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ProfileModal from './modals/ProfileModal';
import { deleteCurretUser } from '../action/user';

const ProfileSection = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.user.token);
	const userData = useSelector((state) => state.user.userData[0]);
	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
		if (token == null) {
			navigate('/login');
		}
	}, [token]);
	return (
		<>
			{userData === null ? (
				'non sei autorizzato'
			) : (
				<section className='vh-100' style={{ backgroundColor: '#f4f5f7' }}>
					<ProfileModal show={modalShow} onHide={() => setModalShow(false)} />
					<Container className='py-5 h-100'>
						<Row className='d-flex justify-content-center align-items-center h-100'>
							<Col lg={8} className='mb-4 mb-lg-0'>
								<Card className='mb-3'>
									<Row className='g-0'>
										<Col md={4} className='gradient-custom text-center'>
											<Image
												src={userData.profileImage}
												alt='Avatar'
												className='img-fluid my-4 mr-3 rounded-circle'
												style={{ width: '100px', height: '100px' }}
											/>
											<h5>
												{userData.name} {userData.surname}
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
														<p className='text-muted'>{userData.username}</p>
													</Col>
												</Row>
												<Row className='pt-1'>
													<Col xs={12} className='mb-3'>
														<h6>Email</h6>
														<p className='text-muted'>{userData.email}</p>
													</Col>
												</Row>
												<h6>Other</h6>
												<hr className='mt-0 mb-4' />
												<Row className='pt-1'>
													<Col xs={6} className='mb-3'>
														<h6>B-Day</h6>
														<p className='text-muted'>{userData.userBirthday}</p>
													</Col>
													<Col xs={6} className='mb-3'>
														<h6>Join date</h6>
														<p className='text-muted'>{userData.userCreationDate}</p>
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
															dispatch(deleteCurretUser(token));
														}}>
														Cancellami
													</Button>
													<Button
														className='btn btn-sm'
														onClick={() => {
															navigate('/home');
														}}>
														Back to Home
													</Button>
												</div>
											</Card.Body>
										</Col>
									</Row>
								</Card>
							</Col>
						</Row>
					</Container>
				</section>
			)}
		</>
	);
};

export default ProfileSection;
