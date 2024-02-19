import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListComponent = ({ dataTopic }) => {
	const navigate = useNavigate();

	return (
		<ListGroup.Item className='p-0 align-items-center my-1 border-0'>
			<Container style={{ backgroundColor: '#F8F9FA' }}>
				<Row className='d-flex px-2 align-items-center'>
					<Col className='tag' md={6}>
						<Row>
							<Col
								className=' m-0 rounded-start-3 pe-0'
								style={{ backgroundColor: '#8abeff' }}></Col>
							<Row className='d-flex flex-column'>
								<Col className='list-name'>
									<span
										className=' text-white rounded-bottom-2'
										style={{ backgroundColor: '#8abeff', cursor: 'pointer' }}
										onClick={(e) => {
											e.preventDefault();
											navigate(`/home/topic/${dataTopic.name}/${dataTopic.id}`);
										}}>
										{dataTopic.name}
									</span>
								</Col>
								<Col
									className='list-description  text-white my-1'
									style={{ backgroundColor: '#c0e9f2' }}>
									{dataTopic.description}
								</Col>
							</Row>
						</Row>
					</Col>
					<Col md={3}>
						<Row className='d-flex flex-column text-end '>
							<Col>blog: {dataTopic.blogPostList.length}</Col>
							<Col>commenti : non si sa</Col>
						</Row>
					</Col>
					<Col md={3}>
						<Row className='d-flex flex-column text-end '>
							<Col>ultima data</Col>
							<Col>ultimo post nome</Col>
							<Col>proprietario post</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</ListGroup.Item>
	);
};

export default ListComponent;
