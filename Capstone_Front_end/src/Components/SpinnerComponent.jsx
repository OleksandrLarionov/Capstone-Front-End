import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const SpinnerComponent = (props) => {
	return (
		<>
			<Button variant='primary' disabled>
				<Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
				<span className='visually-hidden'>Loading...</span>
			</Button>{' '}
		</>
	);
};

export default SpinnerComponent;
