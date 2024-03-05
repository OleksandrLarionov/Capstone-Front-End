import { useEffect, useState } from 'react';
import { Col, Container, Image as BootstrapImage, Pagination, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
	addLike,
	deleteBlogPost,
	fetchBlogCommentsData,
	fetchBlogPostData,
	getLikesNumber,
	removeLike,
} from '../../action/Topic';
import { FcLike } from 'react-icons/fc';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import CommentArea from './CommentArea';
import NewCommentArea from './NewCommentArea';
import NavBar from '../home/NavBar';
import Logo from '../Logo';
import { format } from 'date-fns';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import SpinnerComponent from '../SpinnerComponent';
import { FastAverageColor } from 'fast-average-color';
import Footer from '../Footer';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ConfirmModal from '../modals/ConfirmModal';

const SingleTopicArea = () => {
	const { blogPostId } = useParams();
	const { topicName, zoneName, topicId } = useParams();
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const { token, user } = useSelector((state) => state.auth);
	const { blogPostData, blogCommentsData } = useSelector((state) => state.topic);
	const [hide, setHide] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoading } = useSelector((state) => state.reducer);
	const [averageColor, setAverageColor] = useState(null);
	const [contrast, setContrast] = useState('');
	const formattedDate = format(new Date(blogPostData.creationBlogDate), 'HH:mm:ss dd/MM/yyyy');
	const [modalShow, setModalShow] = useState(false);

	const getColor = () => {
		const fac = new FastAverageColor();
		const container = document.querySelector('#blog-content');
		fac.getColorAsync(blogPostData.cover)
			.then((color) => {
				const avColor = color.rgba;
				setAverageColor(avColor);
				if (container) {
					const isToDarkOrWhite = color.isDark ? '#fff' : '#000';
					setContrast(isToDarkOrWhite);
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const sameUser = (blogPostUserId) => {
		return blogPostUserId === user.id;
	};

	useEffect(() => {}, [blogPostData, averageColor]);

	const handlerHideCommentArea = (e) => {
		e.preventDefault();
		setHide(!hide);
	};

	useEffect(() => {
		dispatch(fetchBlogPostData(token, blogPostId));
		dispatch(fetchBlogCommentsData(token, blogPostId, currentPage));
		dispatch(getLikesNumber(token, blogPostId));
		getColor();
	}, [blogPostId, currentPage]);

	useEffect(() => {
		if (blogCommentsData) {
			setTotalPages(blogCommentsData.totalPages);
		}
	}, [blogCommentsData]);

	const handlePageChange = (page) => {
		setCurrentPage(Math.min(Math.max(page, 0), totalPages - 1));
	};

	const handleDeleteBlog = (e) => {
		e.preventDefault();
		setModalShow(true);
	};
	return (
		<>
			<NavBar />
			{isLoading ? (
				<SpinnerComponent />
			) : (
				<Container
					fluid
					className='p-0'
					style={{
						background: `linear-gradient(135deg, ${averageColor} 33%, ${averageColor} 62%)`,
					}}>
					<ConfirmModal
						show={modalShow}
						onHide={() => setModalShow(false)}
						name={'Blog'}
						deleteBlog={() => {
							dispatch(deleteBlogPost(token, blogPostId, navigate, zoneName, topicId));
						}}
					/>

					<Row className='d-flex justify-content-center mb-5' style={{ paddingTop: '12vh' }}>
						<Col md={7} className='p-0'>
							{' '}
							<BootstrapImage
								variant='top'
								src={blogPostData.cover}
								alt='profileImage'
								className='w-100 h-100'
								id='image'
							/>
						</Col>
					</Row>
					<Row className='d-flex justify-content-center'>
						<Col md={7} className='border'>
							<Row className='d-flex align-items-center'>
								<Col
									md={12}
									style={{ backgroundColor: `${averageColor}` }}
									className=' text-white rounded-2 p-2 px-1 d-flex align-items-center'>
									<span className='mx-1'>{topicName}</span>
									<span className='d-flex justify-content-center align-items-center border border-2 rounded p-1'>
										<Logo />
									</span>
								</Col>

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
										<span
											onClick={(e) => {
												e.preventDefault();
												navigate(`/home/topic/${zoneName}/${topicId}`);
											}}
											style={{ fontSize: '1.2rem', cursor: 'pointer' }}>
											{zoneName}
											<MdOutlineKeyboardDoubleArrowRight />
										</span>
										<span style={{ fontSize: '1.2rem' }}>{topicName}</span>
									</Col>
									<Col>
										{sameUser(blogPostData.user.id) && (
											<DropdownButton
												size='sm'
												id='dropdown-comment'
												title='options'
												className='my-1 d-flex justify-content-end'>
												<Dropdown.Item href='#/action-1'>Modify</Dropdown.Item>
												<Dropdown.Item
													className=' text-danger '
													onClick={handleDeleteBlog}>
													Delete
												</Dropdown.Item>
											</DropdownButton>
										)}
									</Col>
								</Row>
							</Row>
							{blogPostData && (
								<Row className='d-flex'>
									<Col md={2}>
										<BootstrapImage
											variant='top'
											src={blogPostData.user.profileImage}
											alt='profileImage'
											style={{ width: '35px', height: '35px' }}
											className='w-100 h-100 py-5'
										/>
									</Col>
									<Col md={10} className='mt-2'>
										<Row className='mb-2 mt-1 d-flex align-items-center'>
											<Col className='border  p-1 me-2 '>
												{blogPostData.user.username}
											</Col>
											<Col style={{ whiteSpace: 'nowrap' }}>
												{' '}
												Postato il: {formattedDate}
											</Col>
											<Col className='ms-3 d-flex align-items-center'>
												{' '}
												<FcLike />
												<span className='mx-2'>
													{blogPostData.likes ? blogPostData.likes.length : 0}
												</span>
												<span
													className='mx-2'
													style={{ cursor: 'pointer' }}
													onClick={(e) => {
														e.preventDefault();
														dispatch(addLike(token, blogPostId));
													}}>
													<AiOutlineLike />
												</span>
												<span
													className='mx-2'
													style={{ cursor: 'pointer' }}
													onClick={(e) => {
														e.preventDefault();
														dispatch(removeLike(token, blogPostId));
													}}>
													<AiOutlineDislike />
												</span>
											</Col>

											<Row>
												<Col className='d-flex justify-content-end'>
													<Button
														className='bg-transparent fw-bold border-black'
														size='sm'
														onClick={handlerHideCommentArea}>
														Commenta
													</Button>
												</Col>
											</Row>
										</Row>
										<Row>
											<Col>
												<span>{blogPostData.category}</span>
											</Col>
										</Row>
										<Row className='m-2'>
											<Col id='blog-content' style={{ color: `${contrast}` }}>
												{blogPostData.content}
											</Col>
										</Row>
									</Col>
								</Row>
							)}

							{hide && <NewCommentArea page={currentPage} />}
							<Row>
								<Col className='comment-area-component overflow-y-scroll'>
									{blogCommentsData?.content.map((comment, index) => {
										return (
											<CommentArea
												key={index}
												blogPostId={blogPostId}
												currentPage={currentPage}
												commentsData={comment}
												userData={comment.user}
												isToDarkOrWhite={contrast}
											/>
										);
									})}
								</Col>
							</Row>
							<Row>
								<Col className='d-flex justify-content-end'>
									<Pagination size='sm'>
										<Pagination.Prev
											onClick={() => handlePageChange(currentPage - 1)}
											disabled={currentPage === 0} //
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
					<Footer />
				</Container>
			)}
		</>
	);
};

export default SingleTopicArea;
