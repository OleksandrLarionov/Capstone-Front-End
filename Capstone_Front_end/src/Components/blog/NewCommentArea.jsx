import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addANewComment } from '../../action/Topic';

const NewCommentArea = ({ page }) => {
	const [textArea, SetTextArea] = useState('');
	const { token } = useSelector((state) => state.auth);
	const { blogPostId } = useParams();
	const dispatch = useDispatch();

	const handleOfSubmit = (e) => {
		e.preventDefault();
		dispatch(addANewComment(token, blogPostId, textArea, page));
		SetTextArea('');
	};
	return (
		<Container>
			<Row className='d-flex justify-content-end p-3'>
				<Col md={9} className='ps-0'>
					<Form onSubmit={handleOfSubmit}>
						<FloatingLabel controlId='floatingTextarea2' label='Comments'>
							<Form.Control
								as='textarea'
								value={textArea}
								placeholder='Leave a comment here'
								style={{ height: '100px' }}
								onChange={(e) => {
									SetTextArea(e.target.value);
								}}
							/>
						</FloatingLabel>
						<Row className='d-flex justify-content-end '>
							<Col className='d-flex justify-content-end py-3'>
								<Button type='submit'>Invia</Button>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default NewCommentArea;
