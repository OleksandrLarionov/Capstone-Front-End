import 'bootstrap/dist/css/bootstrap.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import GoogleCallBack from './Components/google/GoogleCallback';
import LoginForm from './Components/LoginForm';
import RegistrationPage from './Components/RegistrationPage';
import ProfileSection from './Components/ProfileSection';
import TopicPage from './Components/blog/TopicPage';
import { tokenValidation } from './action/user';
import SingleTopicArea from './Components/blog/SingleTopicArea';

function App() {
	const token = useSelector((state) => state.user.token);
	const dispatch = useDispatch();

	const isValidToken = () => {
		if (token) {
			dispatch(tokenValidation(token));
			return true;
		} else {
			return false;
		}
	};

	const requireAuth = (element) => {
		if (isValidToken) {
			return element;
		} else {
			return <Navigate to='/login' />;
		}
	};

	return (
		<Container fluid>
			<Routes>
				<Route path='/login' element={<LoginForm />} />
				<Route path='/google/callback' element={<GoogleCallBack />} />
				<Route path='/home' element={requireAuth(<Home />)} />
				<Route path='/home/profile' element={requireAuth(<ProfileSection />)} />
				<Route path='/home/topic/:zoneName/:topicId' element={requireAuth(<TopicPage />)} />
				<Route
					path='/home/topic/:topicName/:topicId/:blogPostId'
					element={requireAuth(<SingleTopicArea />)}
				/>
				<Route path='/register' element={<RegistrationPage />} />
			</Routes>
		</Container>
	);
}

export default App;
