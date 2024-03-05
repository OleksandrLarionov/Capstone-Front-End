import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const ListComponent = ({ dataTopic }) => {
	const navigate = useNavigate();
	const { homeColor } = useSelector((state) => state.reducer);

	const formattedDate = format(
		new Date(dataTopic.blogPostList.slice().reverse()[0].creationBlogDate),
		'HH:mm, dd/MM/yyyy'
	);

	return (
		<ListGroup.Item
			className='p-0 align-items-center my-1 border-0'
			style={{
				background: `linear-gradient(0deg, rgba(${homeColor},0.9051995798319328) 2%, rgba(40,43,40,0.6699054621848739) 95%)`,
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
											background: `linear-gradient(0deg, rgba(${homeColor},0.9051995798319328) 2%, rgba(40,43,40,0.6699054621848739) 95%)`,
										}}
										onClick={(e) => {
											e.preventDefault();
											navigate(`/home/topic/${dataTopic.name}/${dataTopic.id}`);
										}}>
										{dataTopic.name}
									</span>
								</Col>
								<Col className='list-description  text-white my-1'>
									{dataTopic.description}
								</Col>
							</Row>
						</Row>
					</Col>
					<Col md={3}>
						<Row className='d-flex flex-column text-end ' style={{ color: '	#c0c0c0' }}>
							<Col>Posts: {dataTopic.blogPostList.length}</Col>
						</Row>
					</Col>
					<Col md={3}>
						<Row className='d-flex flex-column text-end ' style={{ color: '	#c0c0c0' }}>
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
