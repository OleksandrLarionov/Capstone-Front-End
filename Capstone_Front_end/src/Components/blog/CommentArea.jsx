import { Col, Container, Image, Row } from 'react-bootstrap';
import { FcLike } from 'react-icons/fc';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { format } from 'date-fns';
import { useState } from 'react';

const CommentArea = ({ commentsData, userData }) => {
	const formattedDate = format(new Date(commentsData.date), 'HH:mm:ss dd/MM/yyyy');
	return (
		<Container className='mt-4'>
			<Row className='d-flex'>
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
						<Col className='d-flex align-items-center'>
							<span className='bg-black text-white p-1 me-2  '>{userData.username}</span>
							<span>Postato il: {formattedDate}</span>
							<span className='ms-3 d-flex align-items-center'>
								<FcLike className='me-2' />
								{/* {blogData.likes ? blogData.likes.length : 0} */}likes?
							</span>
							<span className='ms-2 d-flex'>
								<div
									style={{ cursor: 'pointer' }}
									className='mx-3'
									onClick={(e) => {
										e.preventDefault();
									}}>
									<AiOutlineLike />
								</div>
								<div
									style={{ cursor: 'pointer' }}
									onClick={(e) => {
										e.preventDefault();
									}}>
									<AiOutlineDislike />
								</div>
							</span>
						</Col>
					</Row>

					<Row className='m-1'>
						<Col>{commentsData.comment}</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default CommentArea;
