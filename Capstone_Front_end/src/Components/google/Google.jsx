import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { getGoogleLoginUrl } from '../../action/google';

const Google = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const handleGoogleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const url = await dispatch(getGoogleLoginUrl());
			window.location.href = url;
		} catch (error) {
			console.error("Errore durante il recupero dell'URL di autorizzazione da Google:", error);
		} finally {
			setLoading(false);
		}
	};
	return <FcGoogle onClick={handleGoogleLogin} />;
};

export default Google;
