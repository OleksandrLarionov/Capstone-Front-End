import { Image } from 'react-bootstrap';
import dadoImage from '../assets/img/dado.png';

const SpinnerComponent = (props) => {
	return (
		<>
			<div id='custom-spinner' role='status'>
				<Image src={dadoImage} className='spinner-img' alt='Loading spinner' />
			</div>
		</>
	);
};

export default SpinnerComponent;
