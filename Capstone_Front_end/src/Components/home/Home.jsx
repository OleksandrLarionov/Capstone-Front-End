import { useDispatch, useSelector } from 'react-redux';
import HomeComponent from './HomeComponent';
import SpinnerComponent from '../SpinnerComponent';
import { fetchHomeData } from '../../action/homeAction';
import { useEffect } from 'react';

const Home = () => {
	const isLoading = useSelector((state) => state.home.isLoading);
	const { token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchHomeData(token));
	}, [token, dispatch]);

	return <div>{isLoading ? <SpinnerComponent /> : <HomeComponent />}</div>;
};

export default Home;
