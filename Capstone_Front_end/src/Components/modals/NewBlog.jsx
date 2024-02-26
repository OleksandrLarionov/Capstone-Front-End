import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row, Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBlog } from '../../action/Topic';

const NewBlog = ({ show, onHide, topicId, currentPage }) => {
	const { user, token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		category: '',
		title: '',
		content: '',
		topicZoneId: topicId,
		userId: user.id,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleOfSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		dispatch(addNewBlog(token, formData, topicId, currentPage));
		setFormData({
			category: '',
			title: '',
			content: '',
			topicZoneId: topicId,
			userId: user.id,
		});
	};
	// category, title
	return (
		<Modal
			show={show}
			onHide={onHide}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Your Campain</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Row className='d-flex justify-content-end p-3'>
						<Col md={9} className='ps-0'>
							<Form>
								<Form.Group controlId='validationCustom01'>
									<FloatingLabel label='Title'>
										<Form.Control
											required
											name='title'
											type='text'
											placeholder='Title'
											value={formData.title}
											onChange={handleChange}
										/>
										<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
									</FloatingLabel>
								</Form.Group>
								<Form.Group controlId='validationCustom01'>
									<FloatingLabel label='Category'>
										<Form.Control
											required
											name='category'
											type='text'
											placeholder='Category'
											value={formData.category}
											onChange={handleChange}
										/>
										<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
									</FloatingLabel>
								</Form.Group>

								<Form.Group controlId='floatingTextarea2'>
									<FloatingLabel label='Story'>
										<Form.Control
											as='textarea'
											name='content'
											value={formData.content}
											placeholder='Leave your story here'
											style={{ height: '100px' }}
											onChange={handleChange}
										/>
									</FloatingLabel>
								</Form.Group>
							</Form>
						</Col>
					</Row>
				</Container>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={(e) => {
						handleOfSubmit(e);
						onHide();
					}}>
					Invia
				</Button>
				<Button onClick={onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default NewBlog;
