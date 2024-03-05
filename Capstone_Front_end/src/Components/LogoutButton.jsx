import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import { logout } from '../reducers/authSlice';

function LogoutButton() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token } = useSelector((state) => state.auth);

	const handleLogout = () => {
		dispatch(logout());
		navigate('/login');
	};
	return (
		<Row>
			<Col>
				{token !== null && (
					<Button size='sm' className='bg-transparent border-warning' onClick={handleLogout}>
						Logout
					</Button>
				)}
			</Col>
		</Row>
	);
}

export default LogoutButton;
