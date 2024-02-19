import { useEffect, useState } from 'react';
import { Col, Container, ListGroup, Pagination, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTopicData } from '../../action/Topic';
import TopicSection from './TopicSection';

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
		<Container>
			<ListGroup>
				<ListGroup.Item className='p-0 align-items-center border-0 my-2'>
					<Row className='d-flex px-2 align-items-center'>
						<Col className='tag' md={6}>
							<Row style={{ backgroundColor: '#F8F9FA' }}>
								<Row className='d-flex align-items-center justify-content-center'>
									<Col className='d-flex justify-content-between'>
										<div className='list-name d-flex align-items-center justify-content-start '>
											<span
												className=' text-white rounded-2 pb-1 px-1 '
												style={{ backgroundColor: '#8abeff' }}>
												{zoneName}
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
				</ListGroup.Item>
				{topicList && (
					<ListGroup.Item className='border-top'>
						{topicList?.content.map((dataTopic, index) => {
							return <TopicSection key={index} dataTopic={dataTopic} />;
						})}
					</ListGroup.Item>
				)}
			</ListGroup>
			<Pagination>
				<Pagination.Prev
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 0} // Disabilita il pulsante se currentPage è 0
				/>
				{[...Array(totalPages).keys()].map((page) => (
					<Pagination.Item
						key={page}
						active={page === currentPage}
						onClick={() => handlePageChange(page)}>
						{page}
					</Pagination.Item>
				))}
				<Pagination.Next
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages - 1} // Disabilita il pulsante se currentPage è uguale a totalPages - 1
				/>
			</Pagination>
		</Container>
	);
};

export default TopicPage;
