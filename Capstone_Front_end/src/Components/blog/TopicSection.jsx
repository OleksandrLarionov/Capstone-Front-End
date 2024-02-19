import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TopicSection = ({ dataTopic }) => {
	const navigate = useNavigate();
	return (
		<ListGroup.Item className='p-0 align-items-center my-1 border-0'>
			<Container style={{ backgroundColor: '#F8F9FA' }}>
				<Row className='d-flex px-2 align-items-center'>
					<Col className='tag' md={6}>
						<Row>
							<Col
								className=' m-0 rounded-start-3'
								style={{ backgroundColor: '#8abeff' }}></Col>
							<Row className='d-flex flex-column'>
								<Col className='list-name pe-0'>
									<span
										className=' text-white rounded-bottom-2 pb-1 px-2'
										style={{ backgroundColor: '#8abeff', cursor: 'pointer' }}
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
							<Col>numero : discussioni</Col>
							<Col>numero : risposte</Col>
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
