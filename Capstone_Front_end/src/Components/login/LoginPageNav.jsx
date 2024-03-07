import { Navbar, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../../css/nav.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
function LoginPageNav() {
	const { isAuthenticated } = useSelector((state) => state.auth);
	return (
		<Navbar expand='md' id='login-page-nav'>
			<Navbar.Brand className='py-3 text-center'>
				{/* <img src='' alt='' className='invert' /> */}
				<Logo />
			</Navbar.Brand>
			<Navbar.Toggle
				className='navbar-dark text-center my-2 w-75'
				aria-controls='navbarNavDropdown'
			/>
			<Navbar.Collapse id='navbarNavDropdown'>
				<Nav className='navbar-nav mx-auto'>
					<Nav.Item>
						{isAuthenticated && (
							<Nav.Link as={Link} to='/home' aria-current='page'>
								Home
							</Nav.Link>
						)}
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href='#' className='nav-link invisible'>
							News
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href='#about' className='nav-link'>
							About Us
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default LoginPageNav;
