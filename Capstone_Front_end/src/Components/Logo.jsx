import { SiDungeonsanddragons } from 'react-icons/si';
import { useSelector } from 'react-redux';

const Logo = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	return (
		<>
			{isAuthenticated ? (
				<span className=' fw-semibold' id='site-logo'>
					Dungeons
					<span className='text-danger '>
						<SiDungeonsanddragons />
					</span>
					<span>Dragons</span>
				</span>
			) : (
				<span className='pe-1 fw-semibold d-flex flex-column mb-5' id='site-logo'>
					Dungeons
					<span className='text-danger simbol-and'>
						<SiDungeonsanddragons />
					</span>
					<span className='ps-4 simbol-d'>Dragons</span>
				</span>
			)}
		</>
	);
};

export default Logo;
