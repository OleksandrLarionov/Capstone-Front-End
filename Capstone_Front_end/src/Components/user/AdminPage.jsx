import {
	Button,
	Col,
	Container,
	Dropdown,
	Form,
	ListGroup,
	Pagination,
	Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteUserByAdmin, fetchAllUsersData } from '../../action/user';
import NavBar from '../home/NavBar';
import Footer from '../home/Footer';
const AdminPage = () => {
	const dispatch = useDispatch();
	const { usersData } = useSelector((state) => state.admin);
	const { token } = useSelector((state) => state.auth);
	const [usersList, setUsersList] = useState([null]);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [size, setSize] = useState({
		inputValue: '',
		size: '5',
	});
	const [orderBy, setOrderBy] = useState({
		orderSelected: 'email',
		order: ['email', 'name', 'surname', 'username', 'userCreationDate'],
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		setSize({
			...size,
			size: size.inputValue,
			inputValue: '',
		});
	};

	useEffect(() => {
		if (usersData) {
			setTotalPages(usersData.totalPages);
		}
	}, [usersData]);

	useEffect(() => {
		dispatch(fetchAllUsersData(token, currentPage, size.size, orderBy.orderSelected));
		setUsersList(usersData);
	}, [currentPage, orderBy, size]);

	const handlePageChange = (page) => {
		if (page >= totalPages) {
			setCurrentPage(totalPages - 1);
		} else if (page < 0) {
			setCurrentPage(0);
		} else {
			setCurrentPage(page);
		}
	};
	return (
		<>
			<NavBar />
			<Container fluid className='vh-100 overflow-y-scroll'>
				<Row className='py-5'>
					<Col className='my-4'>
						<Pagination className='my-2' size='sm'>
							<Pagination.Prev
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 0}
							/>
							{[...Array(totalPages > 9 ? 7 : totalPages).keys()].map((index) => {
								let page;
								if (totalPages > 9) {
									if (currentPage < 5) {
										page = index;
									} else if (currentPage >= totalPages - 5) {
										page = totalPages - 7 + index;
									} else {
										page = currentPage - 3 + index;
									}
								} else {
									page = index;
								}
								return (
									<Pagination.Item
										key={page}
										active={page === currentPage}
										onClick={() => handlePageChange(page)}>
										{page + 1}
									</Pagination.Item>
								);
							})}
							{totalPages > 7 && currentPage < totalPages - 5 && (
								<Pagination.Ellipsis disabled />
							)}
							{totalPages > 7 && (
								<Pagination.Item onClick={() => handlePageChange(totalPages - 1)}>
									{totalPages}
								</Pagination.Item>
							)}
							<Pagination.Next
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages - 1}
							/>
							<Dropdown className='px-1'>
								<Dropdown.Toggle size='sm' variant='success' id='dropdown-basic'>
									OrderBy
								</Dropdown.Toggle>
								<Dropdown.Menu>
									{usersData &&
										orderBy.order.map((orderName, index) => {
											return (
												<Dropdown.Item
													className='text-center'
													key={index}
													onClick={() => {
														setOrderBy({
															orderSelected: orderName,
															order: orderBy.order,
														});
													}}>
													{orderName}
												</Dropdown.Item>
											);
										})}
								</Dropdown.Menu>
							</Dropdown>
							<Dropdown>
								<Dropdown.Toggle size='sm' variant='success' id='dropdown-basic'>
									page
								</Dropdown.Toggle>
								<Dropdown.Menu>
									{usersData &&
										Array.from({ length: usersData.totalPages }).map((_, index) => (
											<Dropdown.Item className='text-center' key={index}>
												<div
													onClick={(e) => {
														setCurrentPage(index);
													}}>
													{index + 1}
												</div>
											</Dropdown.Item>
										))}
								</Dropdown.Menu>
							</Dropdown>
							<Form onSubmit={handleSubmit} className='d-flex py-0 px-1'>
								<Form.Group controlId='formValue'>
									<Form.Control
										placeholder='users number'
										className='p-1'
										type='number'
										value={size.inputValue}
										size='sm'
										onChange={(event) =>
											setSize({ ...size, inputValue: event.target.value })
										}
									/>
								</Form.Group>
							</Form>
						</Pagination>
						<ListGroup>
							{usersData &&
								usersData.content.map((user, id) => {
									return (
										<ListGroup.Item key={id} className='d-flex justify-content-between'>
											<span className='fs-4'>
												Nome: {user.name} <span className='fw-bold'>|</span> Cognome:{' '}
												{user.surname} <span className='fw-bold'>|</span> Username:{' '}
												{user.username} <span className='fw-bold'>|</span> Email:{' '}
												{user.email}
											</span>
											<Button
												onClick={(e) => {
													e.preventDefault();
													dispatch(deleteUserByAdmin(token, user.id)).then(() =>
														dispatch(
															fetchAllUsersData(
																token,
																currentPage,
																size.size,
																orderBy.orderSelected
															)
														)
													);
												}}
												className='bg-danger border-0'>
												delete
											</Button>
										</ListGroup.Item>
									);
								})}
						</ListGroup>
					</Col>
				</Row>
				<Row>
					<Col md={9}>
						<Row></Row>
					</Col>
				</Row>
			</Container>
			<Footer />
		</>
	);
};

export default AdminPage;
