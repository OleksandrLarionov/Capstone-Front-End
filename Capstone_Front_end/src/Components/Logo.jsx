import { SiDungeonsanddragons } from 'react-icons/si';

const Logo = (props) => {
	return (
		<>
			<span className='pe-1 fw-semibold' style={{ whiteSpace: 'nowrap' }} id='site-logo'>
				Dungeons
				<SiDungeonsanddragons />
				Dragons
			</span>
		</>
	);
};

export default Logo;
