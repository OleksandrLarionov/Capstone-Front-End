import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getGoogleLoginUrl } from '../action';
import { useNavigate } from 'react-router-dom';

const Google = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleGoogleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			dispatch(getGoogleLoginUrl());
		} catch (error) {
			console.error("Errore durante il recupero dell'URL di autorizzazione da Google:", error);
		} finally {
			setLoading(false);
			navigate('/home');
		}
	};

	return (
		<Container>
			<div className='App'>
				<Button onClick={handleGoogleLogin} disabled={loading}>
					{loading ? 'Caricamento...' : 'Accedi con Google'}
				</Button>
			</div>
		</Container>
	);
};

export default Google;
