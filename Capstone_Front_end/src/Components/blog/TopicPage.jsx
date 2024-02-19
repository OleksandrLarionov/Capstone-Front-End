import { useEffect, useState } from 'react';
import { Col, Container, Image, ListGroup, Pagination, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTopicData } from '../../action/Topic';
import TopicSection from './TopicSection';
import NavBar from '../NavBar';
import backgroundImage from '../../assets/img/concept-cutted.jpg';

const TopicPage = (props) => {
	const { topicId } = useParams();
	const { zoneName } = useParams();
	const topicList = useSelector((state) => state.topic.topicListData[0]);
	const token = useSelector((state) => state.user.token);
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		if (topicList) {
			setTotalPages(topicList.totalPages);
		}
	}, [topicList]);

	useEffect(() => {
		dispatch(fetchTopicData(token, topicId, currentPage));
	}, [dispatch, token, topicId, currentPage]);

	const handlePageChange = (page) => {
		setCurrentPage(Math.min(Math.max(page, 0), totalPages - 1));
	};
	return (
		<>
			<NavBar />
			<Container>
				<Row className='d-flex justify-content-center my-4'>
					<Col>
						{' '}
						<Image
							variant='top'
							src={backgroundImage}
							alt='profileImage'
							style={{ width: '35px', height: '35px' }}
							className='w-100 h-100'
						/>
					</Col>
				</Row>
				<Row className='d-flex justify-content-center'>
					<Col md={8}>
						<ListGroup>
							<ListGroup.Item className='p-0 align-items-center border-0 my-2'>
								<Row className='d-flex px-2 align-items-center'>
									<Col className='tag' md={6}>
										<Row style={{ backgroundColor: '#F8F9FA' }}>
											<Row className='d-flex align-items-center justify-content-center'>
												<Col className='d-flex justify-content-between'>
													<div className='list-name d-flex align-items-center justify-content-start '>
														<span
															className='pointer text-white rounded-2 pb-1 px-1 '
															style={{ backgroundColor: '#8abeff' }}>
															{zoneName}
														</span>
														<span
															className='ps-2 pe-3'
															style={{ backgroundColor: '#c0e9f2' }}>
															{' '}
															D&D
														</span>
													</div>
													<div></div>
												</Col>
											</Row>
										</Row>
									</Col>
								</Row>
							</ListGroup.Item>
							{topicList && (
								<ListGroup.Item className='border-top vh-100'>
									{topicList?.content.map((dataTopic, index) => {
										return <TopicSection key={index} dataTopic={dataTopic} />;
									})}
								</ListGroup.Item>
							)}
						</ListGroup>
						<Row>
							<Col className='d-flex justify-content-end'>
								<Pagination className='my-2'>
									<Pagination.Prev
										onClick={() => handlePageChange(currentPage - 1)}
										disabled={currentPage === 0}
									/>
									{[...Array(totalPages).keys()].map((page) => (
										<Pagination.Item
											key={page}
											active={page === currentPage}
											onClick={() => handlePageChange(page)}>
											{page + 1}
										</Pagination.Item>
									))}
									<Pagination.Next
										onClick={() => handlePageChange(currentPage + 1)}
										disabled={currentPage === totalPages - 1}
									/>
								</Pagination>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default TopicPage;
