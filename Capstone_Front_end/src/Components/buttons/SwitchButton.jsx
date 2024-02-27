import { Col, Row, Form } from 'react-bootstrap';

const SwitchButton = ({ switchButton, handleSwitchChange, name }) => {
	return (
		<Row>
			<Col className='d-flex justify-content-center'>
				<Form.Label className='pe-2'>{name}</Form.Label>
				<Form.Check
					type='switch'
					checked={switchButton}
					onChange={handleSwitchChange}
					id='custom-switch'
				/>
			</Col>
		</Row>
	);
};

export default SwitchButton;
