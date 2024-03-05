import { useDispatch, useSelector } from 'react-redux';
import HomeComponent from './HomeComponent';
import SpinnerComponent from '../SpinnerComponent';
import { fetchHomeData } from '../../action/homeAction';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const { isAuthenticated, token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { homeColor, isLoading } = useSelector((state) => state.reducer);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(fetchHomeData(token));
		} else {
			navigate('/login');
		}
	}, [navigate, dispatch]);

	return (
		<div
			style={{
				background: `linear-gradient(135deg, rgba(${homeColor}) 33%, rgba(${homeColor}) 60%)`,
			}}>
			{isLoading ? <SpinnerComponent /> : <HomeComponent />}
		</div>
	);
};

export default Home;
