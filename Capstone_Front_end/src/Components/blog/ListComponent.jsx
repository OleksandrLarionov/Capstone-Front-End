import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListComponent = ({ dataTopic }) => {
	const navigate = useNavigate();
	return (
		<ListGroup.Item className='p-0 align-items-center my-1 border-0'>
			<Container fluid>
				<Row className='d-flex px-2 align-items-center'>
					<Col className='tag' md={6}>
						<Row className='d-flex'>
							<Row className='d-flex flex-column'>
								<Col className='list-name p-0 mb-1'>
									<span
										className=' text-white rounded-bottom-2 p-1 fw-bold'
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
							<Col>Posts: {dataTopic.blogPostList.length}</Col>
						</Row>
					</Col>
					<Col md={3}>
						<Row className='d-flex flex-column text-end '>
							<Col> {dataTopic.blogPostList.slice().reverse()[0].creationBlogDate}</Col>
							<Col>{dataTopic.blogPostList.slice().reverse()[0].category}</Col>
							<Col>{dataTopic.blogPostList.slice().reverse()[0].user.username}</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</ListGroup.Item>
	);
};

export default ListComponent;
