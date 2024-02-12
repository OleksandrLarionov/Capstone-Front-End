import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getGoogleLoginUrl } from '../action/google';

const Google = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const handleGoogleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const url = await dispatch(getGoogleLoginUrl());
			window.location.href = url; // Reindirizza l'utente all'URL di autorizzazione
		} catch (error) {
			console.error("Errore durante il recupero dell'URL di autorizzazione da Google:", error);
		} finally {
			setLoading(false);
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
