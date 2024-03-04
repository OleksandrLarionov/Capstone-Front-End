import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { blogCommentsNumber } from '../../action/Topic';
import { format } from 'date-fns';

const TopicSection = ({ dataTopic }) => {
	const { token } = useSelector((state) => state.auth);
	const { homeColor } = useSelector((state) => state.reducer);
	const [numberOfComments, setNumberOfComments] = useState(null);
	const formattedDate = format(new Date(dataTopic.creationBlogDate), 'HH:mm:ss dd/MM/yyyy');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { zoneName, topicId } = useParams();

	useEffect(() => {
		dispatch(blogCommentsNumber(token, dataTopic.id)).then((data) => setNumberOfComments(data));
	}, [navigate]);
	return (
		<ListGroup.Item className='p-0 align-items-center my-1 border-0'>
			<Container
				fluid
				style={{
					background: `linear-gradient(266deg, rgba(${homeColor}) 76%, rgba(15,15,15,0.7959558823529411) 100%)`,
				}}
				className='m-0'>
				<Row className='d-flex px-2 align-items-center'>
					<Col className='tag' md={6}>
						<Row>
							<Row className='d-flex flex-column'>
								<Col className='list-name pe-0'>
									<span
										className=' text-white rounded-bottom-2  d-flex  topic-page'
										style={{
											cursor: 'pointer',
											background: `linear-gradient(266deg, rgba(${homeColor}) 66%, rgba(255,255,255,0) 97%)`,
										}}
										onClick={(e) => {
											e.preventDefault();
											navigate(
												`/home/topic/${zoneName}/${dataTopic.title}/${topicId}/${dataTopic.id}`
											);
										}}>
										{dataTopic.title}
									</span>
								</Col>
								<Col className='list-description  text-white my-1'></Col>
							</Row>
						</Row>
					</Col>
					<Col md={3}>
						<Row className='d-flex flex-column text-end ' style={{ color: '	#c0c0c0' }}>
							<Col>Likes: {dataTopic.likes.length}</Col>
							<Col>Commenti : {numberOfComments}</Col>
						</Row>
					</Col>
					<Col md={3}>
						<Row className='d-flex flex-column text-end ' style={{ color: '	#c0c0c0' }}>
							<Col>{formattedDate}</Col>
							<Col>by {dataTopic.user.username}</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</ListGroup.Item>
	);
};

export default TopicSection;
