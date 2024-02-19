import { Col, ListGroup, Row } from 'react-bootstrap';
import ListComponent from './ListComponent';
import { TbEyeOff, TbEye } from 'react-icons/tb';
import { useState } from 'react';

const Welcome = ({ data }) => {
	const [isListVisible, setListVisibility] = useState(true);
	return (
		<ListGroup>
			<ListGroup.Item className='p-0 align-items-center border-0 my-2'>
				<Row className='d-flex px-2 align-items-center'>
					<Col className='tag' md={6}>
						<Row style={{ backgroundColor: '#F8F9FA' }}>
							<Row className='d-flex align-items-center justify-content-center'>
								<Col className='d-flex justify-content-between'>
									<div className='list-name d-flex align-items-center justify-content-start '>
										<span
											className=' text-white rounded-2 pb-1 px-1 '
											style={{ backgroundColor: '#8abeff' }}>
											{data.name}
										</span>
										<span className='ps-2 pe-3' style={{ backgroundColor: '#c0e9f2' }}>
											{' '}
											D&D
										</span>
									</div>
									<div>
										<span
											onClick={(e) => {
												e.preventDefault();
												setListVisibility(!isListVisible);
											}}>
											{isListVisible ? <TbEyeOff /> : <TbEye />}
										</span>
									</div>
								</Col>
							</Row>
						</Row>
					</Col>
					<Col md={4}></Col>
					<Col md={3}></Col>
				</Row>
			</ListGroup.Item>
			{isListVisible && (
				<ListGroup.Item className='border-top'>
					{data.zoneTopicList?.map((dataTopic, index) => {
						return <ListComponent key={index} dataTopic={dataTopic} />;
					})}
				</ListGroup.Item>
			)}
		</ListGroup>
	);
};

export default Welcome;
