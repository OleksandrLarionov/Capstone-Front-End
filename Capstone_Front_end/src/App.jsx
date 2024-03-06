import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import GoogleCallBack from './Components/google/GoogleCallback';
import RegistrationPage from './Components/login/RegistrationPage';
import ProfileSection from './Components/user/ProfileSection';
import TopicPage from './Components/blog/TopicPage';
import SingleTopicArea from './Components/blog/SingleTopicArea';
import NotFoundPage from './Components/NotFoundPage';
import './App.css';
import LoginForm from './Components/login/LoginForm';
import AdminPage from './Components/user/AdminPage';

function App() {
	const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

	return (
		<Container fluid className='vh-100'>
			<Routes>
				<Route path='/login' element={<LoginForm />} />
				<Route path='/google/callback' element={<GoogleCallBack />} />
				<Route path='/register' element={<RegistrationPage />} />

				{isAuthenticated && <Route path='/home' element={<Home />} />}
				{isAuthenticated && <Route path='/home/profile' element={<ProfileSection />} />}
				{isAuthenticated && (
					<Route path='/home/topic/:zoneName/:topicId' element={<TopicPage />} />
				)}
				{isAuthenticated && (
					<Route
						path='/home/topic/:zoneName/:topicName/:topicId/:blogPostId'
						element={<SingleTopicArea />}
					/>
				)}
				{isAuthenticated && isAdmin && (
					<Route path='/home/back/office' element={<AdminPage />} />
				)}
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Container>
	);
}

export default App;
