import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Image, ListGroup, Pagination, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTopicData } from '../../action/Topic';
import TopicSection from './TopicSection';
import backgroundImage from '../../assets/img/pg2.jpg';
import SpinnerComponent from '../SpinnerComponent';
import NavBar from '../home/NavBar';
import Logo from '../Logo';
import { SetHomeColor } from '../../action/actionTypes';
import { start } from '../../action/getColor';
import NewBlog from '../modals/NewBlog';

const TopicPage = () => {
	const { topicId } = useParams();
	const { zoneName } = useParams();
	const { topicListData } = useSelector((state) => state.topic);
	const { token } = useSelector((state) => state.auth);
	const { homeColor, isLoading } = useSelector((state) => state.reducer);
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const imageRef = useRef(null);
	const [modalShow, setModalShow] = useState(false);

	const loadImageAndExtractColor = () => {
		const img = imageRef.current;
		if (!img.complete) {
			img.onload = () => {
				const color = start(img);
				dispatch(SetHomeColor(color));
			};
		} else {
			const color = start(img);
			dispatch(SetHomeColor(color));
		}
	};

	useEffect(() => {
		loadImageAndExtractColor();
	}, [imageRef]);

	useEffect(() => {
		if (topicListData) {
			setTotalPages(topicListData[0].totalPages);
		}
	}, [topicListData]);

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
				<Container
					className='pb-5'
					fluid
					style={{
						paddingTop: '12vh',
						background: `linear-gradient(135deg, rgba(${homeColor}, 0.70) 33%, rgba(${homeColor}, 0.839) 62%)`,
					}}>
					<NewBlog
						show={modalShow}
						onHide={() => setModalShow(false)}
						topicId={topicId}
						currentPage={currentPage}
					/>
					<Row className='d-flex justify-content-center mb-5'>
						<Col md={7} className='p-0'>
							{' '}
							<Image
								variant='top'
								src={backgroundImage}
								alt='image'
								className='w-100 h-100'
								ref={imageRef}
							/>
						</Col>
					</Row>
					<Row className='d-flex justify-content-center'>
						<Col md={7} className='p-0'>
							<Row>
								<Col className='d-flex justify-content-end'>
									<Pagination className='my-2 ' size='sm'>
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
							<ListGroup className='border border-5'>
								<ListGroup.Item style={{ background: `rgb(${homeColor})` }}>
									<Row className='d-flex px-2 align-items-center'>
										<Col className='tag' md={6}>
											<Row
												style={{
													background: `linear-gradient(0deg, rgba(${homeColor},0) 0%, rgba(186,186,186,0.6110819327731092) 23%)`,
												}}>
												<Row className='d-flex align-items-center justify-content-center '>
													<Col className='d-flex  '>
														<span
															className='pointer text-white rounded-2 px-2'
															style={{
																whiteSpace: 'nowrap',
																background: `radial-gradient(circle, rgba(107,107,107,0.947391456582633) 0%, rgba(${homeColor}) 85%)`,
															}}>
															{zoneName}
														</span>
														<span
															className='ps-2 pe-3'
															style={{
																background: `linear-gradient(0deg, rgba(${homeColor},0.9051995798319328) 2%, rgba(186,186,186,0.6110819327731092) 52%)`,
															}}>
															{' '}
															<Logo />
														</span>
													</Col>
												</Row>
											</Row>
										</Col>
										<Col>
											<Button
												size='sm'
												variant='primary'
												onClick={() => setModalShow(true)}>
												new post
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
								{topicListData && (
									<ListGroup.Item
										className='border-top '
										style={{
											background: `linear-gradient(180deg, rgba(107,107,107,0.947391456582633) 0%, rgba(${homeColor}) 86%)`,
										}}>
										{topicListData?.[0]?.content.map((dataTopic, index) => {
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
