import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Image, ListGroup, Pagination, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTopicData } from '../../action/Topic';
import TopicSection from './TopicSection';
import backgroundImage from '../../assets/img/pgformatblog.webp';
import SpinnerComponent from '../SpinnerComponent';
import NavBar from '../home/NavBar';
import Logo from '../Logo';
import { SetHomeColor } from '../../action/actionTypes';
import NewBlog from '../modals/NewBlog';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import Footer from '../Footer';
import { FastAverageColor } from 'fast-average-color';

const TopicPage = () => {
	const { topicId } = useParams();
	const { zoneName } = useParams();
	const { topicListData } = useSelector((state) => state.topic);
	const { token } = useSelector((state) => state.auth);
	const { homeColor, isLoading } = useSelector((state) => state.reducer);
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [modalShow, setModalShow] = useState(false);
	const navigate = useNavigate();

	const getColor = () => {
		const fac = new FastAverageColor();
		fac.getColorAsync(document.querySelector('#image'))
			.then((color) => {
				const avColor = color.rgb;

				let valoriRGBA = avColor.replace('rgb(', '').replace(')', '').split(',');
				let valori = valoriRGBA.slice(0, 4);
				const onlyRGBA = valori.join(',');
				dispatch(SetHomeColor(onlyRGBA));
				// if (container) {
				// 	const isToDarkOrWhite = color.isDark ? '#fff' : '#000';
				// 	container.style.color = isToDarkOrWhite;
				// }
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		getColor();
	}, [homeColor]);

	useEffect(() => {
		if (topicListData) {
			setTotalPages(topicListData[0].totalPages);
		}
	}, [topicListData]);

	useEffect(() => {
		dispatch(fetchTopicData(token, topicId, currentPage));
	}, [dispatch, token, topicId, currentPage, navigate]);

	const handlePageChange = (page) => {
		setCurrentPage(Math.min(Math.max(page, 0), totalPages - 1));
	};
	return (
		<>
			{}
			<NavBar />

			<Container
				fluid
				style={{
					paddingTop: '12vh',
					background: `linear-gradient(135deg, rgba(${homeColor}) 33%, rgba(${homeColor}) 62%)`,
				}}>
				<NewBlog
					show={modalShow}
					onHide={() => setModalShow(false)}
					topicId={topicId}
					currentPage={currentPage}
					zoneName={zoneName}
				/>
				<Row className='d-flex justify-content-center mb-5'>
					<Col md={7} className='p-0'>
						{' '}
						<Image
							variant='top'
							src={backgroundImage}
							alt='image'
							className='w-100 h-100'
							id='image'
						/>
					</Col>
				</Row>
				<Row className='d-flex justify-content-center '>
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
							<ListGroup.Item style={{ background: `rgba(${homeColor})` }}>
								<Row className='d-flex px-2 align-items-center'>
									<Col className='tag' md={6}>
										<Row
											style={{
												background: `linear-gradient(266deg, rgba(${homeColor}) 66%, rgba(255,255,255,0) 97%)`,
											}}>
											<Row className='d-flex align-items-center justify-content-center '>
												<Col className='d-flex  '>
													<span
														className='pointer text-white rounded-2 px-2'
														style={{
															whiteSpace: 'nowrap',
															background: `radial-gradient(circle, rgba(40,43,40,0.6699054621848739) 95%, rgba(${homeColor}) 85%)`,
														}}>
														{zoneName}
													</span>
													<span
														className='ps-2 pe-3'
														style={{
															background: `linear-gradient(0deg, rgba(${homeColor}) 2%, rgba(40,43,40,0.6699054621848739) 95%`,
														}}>
														{' '}
														<Logo />
													</span>
												</Col>
											</Row>
										</Row>
									</Col>
									<Col className='d-flex justify-content-end'>
										<Button
											size='sm'
											className='bg-transparent border-white fw-bold'
											onClick={() => setModalShow(true)}>
											new post
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
							<Row className='navigation-container'>
								<Col>
									{' '}
									<span
										style={{ cursor: 'pointer', fontSize: '1.2rem' }}
										onClick={(e) => {
											e.preventDefault();
											navigate('/home');
										}}>
										Home
										<MdOutlineKeyboardDoubleArrowRight />
									</span>{' '}
									<span style={{ fontSize: '1.2rem' }}>{zoneName} </span>
								</Col>
							</Row>
							{isLoading ? (
								<SpinnerComponent />
							) : (
								<ListGroup.Item
									className='border-top pb-5'
									style={{
										background: `linear-gradient(180deg, rgba(40,43,40,0.6699054621848739) 95%, rgba(${homeColor}) 86%)`,
									}}>
									{topicListData?.[0]?.content.map((dataTopic, index) => {
										return <TopicSection key={index} dataTopic={dataTopic} />;
									})}
								</ListGroup.Item>
							)}
						</ListGroup>
					</Col>
				</Row>
				<Footer />
			</Container>
		</>
	);
};

export default TopicPage;
