import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { googleCallBack } from '../../action/google';

const GoogleCallBack = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	useEffect(() => {
		const authorizationCode = searchParams.get('code');
		if (authorizationCode) {
			dispatch(googleCallBack(authorizationCode, navigate)).catch((error) =>
				console.error('Error during Google callback:', error)
			);
		}
	}, [dispatch, navigate, searchParams]);

	return null;
};

export default GoogleCallBack;
