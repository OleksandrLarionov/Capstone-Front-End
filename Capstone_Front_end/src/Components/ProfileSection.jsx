import { useEffect } from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileSection = () => {
	const navigate = useNavigate();
	const token = useSelector((state) => state.user.token);
	const userData = useSelector((state) => state.user.userData[0]);

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
					<Container className='py-5 h-100'>
						<Row className='d-flex justify-content-center align-items-center h-100'>
							<Col lg={6} className='mb-4 mb-lg-0'>
								<Card className='mb-3'>
									<Row className='g-0'>
										<Col
											md={4}
											className='gradient-custom text-center'
											style={{
												borderTopLeftRadius: '.5rem',
												borderBottomLeftRadius: '.5rem',
											}}>
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
											<FaEdit className='mb-5' />
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
												<h6>Other</h6>
												<hr className='mt-0 mb-4' />
												<Row className='pt-1'>
													<Col xs={6} className='mb-3'>
														<h6>Recent Post</h6>
														<p className='text-muted'>Lorem ipsum</p>
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
