import { useEffect, useState } from 'react';
import { Col, Container, Image, ListGroup, Pagination, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTopicData } from '../../action/Topic';
import TopicSection from './TopicSection';
import backgroundImage from '../../assets/img/pg2.jpg';
import SpinnerComponent from '../SpinnerComponent';
import NavBar from '../home/NavBar';
import Logo from '../Logo';

const TopicPage = (props) => {
	const { topicId } = useParams();
	const { zoneName } = useParams();
	const topicList = useSelector((state) => state.topic.topicListData);
	const isLoading = useSelector((state) => state.reducer.isLoading);
	const { token } = useSelector((state) => state.auth);
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
			{}
			<NavBar />
			{isLoading ? (
				<SpinnerComponent />
			) : (
				<Container fluid style={{ marginTop: '12vh' }} className='mb-5'>
					<Row className='d-flex justify-content-center mb-5'>
						<Col md={7} className='p-0'>
							{' '}
							<Image
								variant='top'
								src={backgroundImage}
								alt='image'
								className='w-100 h-100'
							/>
						</Col>
					</Row>
					<Row className='d-flex justify-content-center'>
						<Col md={7} className='p-0'>
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
							<ListGroup>
								<ListGroup.Item>
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
																<Logo />
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
									<ListGroup.Item className='border-top'>
										{topicList?.[0]?.content?.map((dataTopic, index) => {
											return <TopicSection key={index} dataTopic={dataTopic} />;
										})}
									</ListGroup.Item>
								)}
							</ListGroup>
						</Col>
					</Row>
				</Container>
			)}
		</>
	);
};

export default TopicPage;
