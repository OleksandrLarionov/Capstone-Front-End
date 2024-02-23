import { useEffect, useState } from 'react';
import { Col, Container, Image, Pagination, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import backgroundImage from '../../assets/img/concept-cutted.jpg';
import {
	addLike,
	blogCommentsData,
	blogPostData,
	getLikesNumber,
	removeLike,
} from '../../action/Topic';
import { FcLike } from 'react-icons/fc';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import CommentArea from './CommentArea';
import NewCommentArea from './NewCommentArea';
import NavBar from '../home/NavBar';

const SingleTopicArea = (props) => {
	const { blogPostId } = useParams();
	const { topicName } = useParams();
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const { token } = useSelector((state) => state.auth);
	const blogData = useSelector((state) => state.topic.blogpostData?.[0]);
	const commentsData = useSelector((state) => state.topic.blogCommentsData?.[0]);
	const [hide, setHide] = useState(false);
	const dispatch = useDispatch();

	const handlerHideCommentArea = (e) => {
		e.preventDefault();
		setHide(!hide);
	};

	useEffect(() => {
		dispatch(blogPostData(token, blogPostId));
		dispatch(blogCommentsData(token, blogPostId, currentPage));
		dispatch(getLikesNumber(token, blogPostId));
	}, [blogPostId, currentPage]);

	useEffect(() => {
		if (commentsData) {
			setTotalPages(commentsData.totalPages);
		}
	}, [commentsData]);

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
				<Row className='d-flex px-2 align-items-center'>
					<Col className='tag' md={6}>
						<Row style={{ backgroundColor: '#F8F9FA' }}>
							<Row className='d-flex align-items-center justify-content-center'>
								<Col className='d-flex justify-content-between'>
									<div className='list-name d-flex align-items-center justify-content-start '>
										<span
											className='pointer text-white rounded-2 pb-1 px-1 '
											style={{ backgroundColor: '#8abeff' }}>
											{topicName}
										</span>
										<span className='ps-2 pe-3' style={{ backgroundColor: '#c0e9f2' }}>
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
				{blogData && (
					<Row className='d-flex'>
						<Col md={2}>
							<Image
								variant='top'
								src={blogData.user.profileImage}
								alt='profileImage'
								style={{ width: '35px', height: '35px' }}
								className='w-100 h-100 py-5'
							/>
						</Col>
						<Col md={10}>
							<Row className='mb-2 mt-1'>
								<Col className='d-flex align-items-center'>
									<span className='bg-black text-white p-1 me-2  '>
										{blogData.user.username}
									</span>
									<span>Postato il: {blogData.creationBlogDate}</span>
									<span className='ms-3 d-flex align-items-center'>
										<FcLike className='me-2' />
										{blogData.likes ? blogData.likes.length : 0}
									</span>
									<span className='ms-2 d-flex'>
										<div
											style={{ cursor: 'pointer' }}
											className='mx-3'
											onClick={(e) => {
												e.preventDefault();
												dispatch(addLike(token, blogPostId));
											}}>
											<AiOutlineLike />
										</div>
										<div
											style={{ cursor: 'pointer' }}
											onClick={(e) => {
												e.preventDefault();
												dispatch(removeLike(token, blogPostId));
											}}>
											<AiOutlineDislike />
										</div>
									</span>
								</Col>
								<Col className='d-flex justify-content-end'>
									<Button onClick={handlerHideCommentArea}>Commenta</Button>
								</Col>
							</Row>
							<Row>
								<Col>
									<span>{blogData.category}</span>
								</Col>
							</Row>
							<Row className='m-2'>
								<Col>{blogData.content}</Col>
							</Row>
						</Col>
					</Row>
				)}

				{hide && <NewCommentArea page={currentPage} />}
				<Row>
					{commentsData?.content.map((comment, index) => {
						return <CommentArea key={index} commentsData={comment} userData={comment.user} />;
					})}
				</Row>
				<Pagination>
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
			</Container>
		</>
	);
};

export default SingleTopicArea;
