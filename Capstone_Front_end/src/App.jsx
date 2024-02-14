import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import GoogleCallBack from './Components/google/GoogleCallback';
import LoginForm from './Components/LoginForm';
import RegistrationPage from './Components/RegistrationPage';
import ProfileSection from './Components/ProfileSection';

function App() {
	const token = useSelector((state) => state.user.token);
	return (
		<Container fluid>
			<Routes>
				<Route path='/login' element={<LoginForm />} />
				<Route path='/google/callback' element={<GoogleCallBack />} />
				{token && <Route path='/home' element={<Home />} />}
				{token && <Route path='/home/profile' element={<ProfileSection />} />}
				<Route path='/register' element={<RegistrationPage />} />
			</Routes>
		</Container>
	);
}

export default App;
