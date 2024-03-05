import { Col, Container, Image, Row } from 'react-bootstrap';
import { format } from 'date-fns';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../action/Topic';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ConfirmModal from '../modals/ConfirmModal';

const CommentArea = ({ commentsData, userData, isToDarkOrWhite, blogPostId, currentPage }) => {
	const dispatch = useDispatch();
	const formattedDate = format(new Date(commentsData.date), 'HH:mm:ss dd/MM/yyyy');
	const { token, user } = useSelector((state) => state.auth);
	const [modalShow, setModalShow] = useState(false);
	const handleDelete = (e) => {
		e.preventDefault();
		dispatch(deleteComment(token, commentsData.id, blogPostId, currentPage));
	};
	const sameUser = (commentUserId) => {
		return commentUserId === user.id;
	};
	return (
		<Container className='mt-4'>
			<ConfirmModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				name={'Comment'}
				deleteCommet={handleDelete}
			/>
			<Row className='d-flex border'>
				<Col md={2}>
					<Image
						variant='top'
						src={userData.profileImage}
						alt='profileImage'
						style={{ width: '35px', height: '35px' }}
						className='w-100 h-100 py-5'
					/>
				</Col>
				<Col md={10}>
					<Row className='mb-2 mt-1'>
						<Col className='d-flex align-items-center border me-1 justify-content-between'>
							<div>
								<span className='fw-bold p-1 me-2  '>{userData.username}</span>
								<span>Postato il: {formattedDate}</span>
							</div>
							{sameUser(commentsData.user.id) && (
								<DropdownButton
									size='sm'
									id='dropdown-comment'
									title='options'
									className='my-1'>
									<Dropdown.Item href='#/action-1'>Modify</Dropdown.Item>
									<Dropdown.Item
										className='fw-bold text-danger'
										onClick={() => {
											setModalShow(true);
										}}>
										Delete
									</Dropdown.Item>
								</DropdownButton>
							)}
						</Col>
					</Row>

					<Row className='m-1'>
						<Col style={{ color: `${isToDarkOrWhite}` }}>{commentsData.comment}</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default CommentArea;
