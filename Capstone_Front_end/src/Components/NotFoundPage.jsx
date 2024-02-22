import { useLocation } from 'react-router-dom';

const NotFoundPage = (props) => {
	const location = useLocation();

	return (
		<div className='notFound'>
			<div className='textNotFound'>
				<h3>404 - Page Not Found</h3>
				<p>This box is empty or maybe not.</p>
				<p>
					The requested URL <code>{location.pathname}</code> was not found.
				</p>
			</div>
		</div>
	);
};

export default NotFoundPage;
