import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../action/actionTypes';
import { Button, Col, Row } from 'react-bootstrap';

function LogoutButton() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = useSelector((state) => state.user.token);
	const handleLogout = () => {
		dispatch(logoutUser());
		navigate('/login');
	};
	return (
		<Row>
			<Col>{token !== null && <Button onClick={handleLogout}>Logout</Button>}</Col>
		</Row>
	);
}

export default LogoutButton;
