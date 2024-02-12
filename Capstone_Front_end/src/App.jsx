import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginPage from './Components/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, setLoading } from './action';
import { useEffect } from 'react';

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
					<Route path='/login' element={<LoginPage />} />
					<Route path='/home' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</Container>
	);
}

export default App;
