import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const ListComponent = ({ dataTopic }) => {
	console.log(dataTopic);
	const navigate = useNavigate();
	const color = useSelector((state) => state.reducer.homeColor);
	const formattedDate = format(
		new Date(dataTopic.blogPostList.slice().reverse()[0].creationBlogDate),
		'HH:mm:ss dd/MM/yyyy'
	);

	return (
		<ListGroup.Item
			className='p-0 align-items-center my-1 border-0'
			style={{
				background: `linear-gradient(304deg, rgba(107,107,107,0.947391456582633) 0%, rgba(${color}) 86%)`,
			}}>
			<Container fluid>
				<Row className='d-flex px-2 align-items-center'>
					<Col className='tag' md={6}>
						<Row className='d-flex'>
							<Row className='d-flex flex-column'>
								<Col className='list-name p-0 mb-1'>
									<span
										className=' text-white rounded-bottom-2 p-1 fw-bold'
										style={{
											cursor: 'pointer',
											background: `linear-gradient(304deg, rgba(107,107,107,0.947391456582633) 0%, rgba(${color}) 86%)`,
										}}
										onClick={(e) => {
											e.preventDefault();
											navigate(`/home/topic/${dataTopic.name}/${dataTopic.id}`);
										}}>
										{dataTopic.name}
									</span>
								</Col>
								<Col
									className='list-description  text-white my-1'
									style={{
										background: `linear-gradient(304deg, rgba(107,107,107,0.947391456582633) 0%, rgba(${color}) 86%)`,
									}}>
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
							<Col> {formattedDate}</Col>
							<Col>{dataTopic.blogPostList.slice().reverse()[0].title}</Col>
							<Col>{dataTopic.blogPostList.slice().reverse()[0].user.username}</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</ListGroup.Item>
	);
};

export default ListComponent;
