import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from './action/user';
import { setLoading } from './action/actionTypes';
import { useEffect } from 'react';
import GoogleCallBack from './Components/GoogleCallback';
import LoginForm from './Components/LoginForm';

function App() {
	const token = useSelector((state) => state.user.token);
	const dispatch = useDispatch();
	useEffect(() => {
		if (token !== null) {
			dispatch(fetchUserData(token)).then((data) => {
				if (data) {
					dispatch(setLoading(false));
				}
			});
		} else {
			dispatch(setLoading(false));
		}
	}, []);
	return (
		<Container fluid>
			<BrowserRouter>
				<Routes>
					<Route path='/login' element={<LoginForm />} />
					<Route path='/home' element={<Home />} />
					<Route path='/google/callback' element={<GoogleCallBack />} />
				</Routes>
			</BrowserRouter>
		</Container>
	);
}

export default App;
