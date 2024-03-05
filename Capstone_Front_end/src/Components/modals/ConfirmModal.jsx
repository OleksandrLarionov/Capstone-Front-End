import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal({ name, show, onHide, deleteBlog, deleteCommet }) {
	return (
		<>
			<Modal show={show} onHide={onHide} backdrop='static' keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to delete this {name}?</Modal.Title>
				</Modal.Header>
				<Modal.Body>If you choose 'DELETE', you won't be able to go back.</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={onHide}>
						Close
					</Button>
					{deleteBlog && (
						<Button
							variant='danger'
							onClick={(e) => {
								e.preventDefault();
								deleteBlog();
								onHide();
							}}>
							Delete
						</Button>
					)}
					{deleteCommet && (
						<Button
							variant='danger'
							onClick={(e) => {
								e.preventDefault();
								deleteCommet(e);
								onHide();
							}}>
							Delete
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ConfirmModal;
