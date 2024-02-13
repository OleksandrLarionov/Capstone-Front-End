import { Col, Image, Nav, NavDropdown, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function UserNavCard() {
	const userData = useSelector((state) => state.user.userData[0]);
	console.log(userData);

	return (
		<Nav>
			<Row>
				<Col className='d-flex justify-content-center align-items-center'>
					<Image
						variant='top'
						src={userData.profileImage}
						alt='profileImage'
						style={{ width: '35px', height: '35px' }}
						className='mr-3 rounded-circle'
					/>
					<NavDropdown
						id='nav-dropdown-dark-example'
						title={
							userData.username ? userData.username : userData.name + ' ' + userData.surname
						}
						menuVariant='dark'
						className='mx-2 pe-2'
						align='end'>
						<NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
					</NavDropdown>
				</Col>
			</Row>
		</Nav>
	);
}

export default UserNavCard;
