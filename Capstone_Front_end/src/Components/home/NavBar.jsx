import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import '../../css/nav.css';
import { SiDungeonsanddragons } from 'react-icons/si';
import { Link } from 'react-router-dom';
import UserNavCard from '../UserNavCard';
function NavBar() {
	return (
		<div id='mainNavigation'>
			<Navbar expand='md'>
				<Navbar.Brand className='py-3 text-center'>
					{/* <img src='' alt='' className='invert' /> */}
					<span className='pe-1 fw-semibold'>Dungeons</span>
					<SiDungeonsanddragons />
					<span className='fw-semibold'> Dragons</span>
				</Navbar.Brand>
				<Navbar.Toggle
					className='navbar-dark text-center my-2 w-75'
					aria-controls='navbarNavDropdown'
				/>
				<Navbar.Collapse id='navbarNavDropdown'>
					<Nav className='navbar-nav mx-auto'>
						<Nav.Item>
							<Nav.Link as={Link} to='/home' aria-current='page'>
								Home
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href='#' className='nav-link'>
								News
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href='#' className='nav-link'>
								Adventures
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href='#' className='nav-link'>
								About the Game
							</Nav.Link>
						</Nav.Item>
						<NavDropdown title='Menu' id='navbarDropdownMenuLink'>
							<NavDropdown.Item href='#'>Blog</NavDropdown.Item>
							<NavDropdown.Item href='#'>About Us</NavDropdown.Item>
							<NavDropdown.Item href='#'>Contact us</NavDropdown.Item>
						</NavDropdown>
						<UserNavCard />
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

export default NavBar;