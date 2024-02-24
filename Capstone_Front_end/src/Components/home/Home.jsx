import { useDispatch, useSelector } from 'react-redux';
import HomeComponent from './HomeComponent';
import SpinnerComponent from '../SpinnerComponent';
import { fetchHomeData } from '../../action/homeAction';
import { useEffect } from 'react';

const Home = () => {
	const { token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { homeColor, isLoading } = useSelector((state) => state.reducer);
	useEffect(() => {
		dispatch(fetchHomeData(token));
	}, [token, dispatch]);

	return (
		<div
			style={{
				background: `linear-gradient(135deg, rgba(${homeColor}, 0.70) 33%, rgba(${homeColor}, 0.839) 62%)`,
			}}>
			{isLoading ? <SpinnerComponent /> : <HomeComponent />}
		</div>
	);
};

export default Home;
