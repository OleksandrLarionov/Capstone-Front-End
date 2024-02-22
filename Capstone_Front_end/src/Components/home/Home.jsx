import { useDispatch, useSelector } from 'react-redux';
import HomeComponent from './HomeComponent';
import SpinnerComponent from '../SpinnerComponent';
import { fetchHomeData } from '../../action/homeAction';
import { useEffect } from 'react';

const Home = () => {
	const isLoading = useSelector((state) => state.home.isLoading);
	const { isAuthenticated, token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(fetchHomeData(token));
		}
	}, [isAuthenticated, token, dispatch]);

	return <div>{isLoading ? <SpinnerComponent /> : <HomeComponent />}</div>;
};

export default Home;
