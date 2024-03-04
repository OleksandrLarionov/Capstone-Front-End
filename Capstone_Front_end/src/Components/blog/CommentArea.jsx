import { Col, Container, Image, Row } from 'react-bootstrap';
import { format } from 'date-fns';

const CommentArea = ({ commentsData, userData, isToDarkOrWhite }) => {
	const formattedDate = format(new Date(commentsData.date), 'HH:mm:ss dd/MM/yyyy');
	return (
		<Container className='mt-4'>
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
						<Col className='d-flex align-items-center border me-1'>
							<span className='fw-bold p-1 me-2  '>{userData.username}</span>
							<span>Postato il: {formattedDate}</span>
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
