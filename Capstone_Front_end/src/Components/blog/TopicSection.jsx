import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { blogCommentsNumber } from '../../action/Topic';

const TopicSection = ({ dataTopic }) => {
	const { token } = useSelector((state) => state.auth);
	const { homeColor } = useSelector((state) => state.reducer);
	const [numberOfComments, setNumberOfComments] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(blogCommentsNumber(token, dataTopic.id)).then((data) => setNumberOfComments(data));
	}, [navigate]);
	return (
		<ListGroup.Item className='p-0 align-items-center my-1 border-0'>
			<Container
				style={{
					background: `linear-gradient(304deg, rgba(107,107,107,0.947391456582633) 0%, rgba(${homeColor}) 86%)`,
				}}>
				<Row className='d-flex px-2 align-items-center'>
					<Col className='tag' md={6}>
						<Row>
							<Row className='d-flex flex-column'>
								<Col className='list-name pe-0'>
									<span
										className=' text-white rounded-bottom-2  d-flex'
										style={{
											cursor: 'pointer',
											background: `linear-gradient(304deg, rgba(107,107,107,0.947391456582633) 0%, rgba(${homeColor}) 86%)`,
										}}
										onClick={(e) => {
											e.preventDefault();
											navigate(
												`/home/topic/${dataTopic.title}/${dataTopic.id}/${dataTopic.id}`
											);
										}}>
										{dataTopic.title}
									</span>
								</Col>
								<Col
									className='list-description  text-white my-1'
									style={{ backgroundColor: '#c0e9f2' }}></Col>
							</Row>
						</Row>
					</Col>
					<Col md={3}>
						<Row className='d-flex flex-column text-end '>
							<Col>Likes: {dataTopic.likes.length}</Col>
							<Col>Commenti : {numberOfComments}</Col>
						</Row>
					</Col>
					<Col md={3}>
						<Row className='d-flex flex-column text-end '>
							<Col>{dataTopic.creationBlogDate}</Col>
							<Col>by {dataTopic.user.username}</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</ListGroup.Item>
	);
};

export default TopicSection;
