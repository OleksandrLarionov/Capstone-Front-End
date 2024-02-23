import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import ListComponent from './ListComponent';
import { TbEyeOff, TbEye } from 'react-icons/tb';
import { useState } from 'react';
import Logo from '../Logo';

const Welcome = ({ data }) => {
	const [isListVisible, setListVisibility] = useState(true);
	return (
		<ListGroup>
			<ListGroup.Item className='p-0 align-items-center border-0 my-2 '>
				<Container fluid>
					<Row className='d-flex align-items-center p-0'>
						<Col className='tag'>
							<Row
								style={{ backgroundColor: '#F8F9FA' }}
								className='d-flex align-items-center justify-content-center'>
								<Col className='d-flex justify-content-between ps-1'>
									<div className='list-name d-flex align-items-center justify-content-start '>
										<div
											className=' text-white rounded-2 pb-1 px-1 fw-semibold'
											style={{ backgroundColor: '#8abeff' }}>
											{data.name}
										</div>
										<div
											className='ps-2 pe-3 d-flex align-items-center'
											style={{ backgroundColor: '#c0e9f2' }}>
											{' '}
											<Logo />
										</div>
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
						</Col>
						<Col md={4}></Col>
						<Col md={3}></Col>
					</Row>
				</Container>
			</ListGroup.Item>
			{isListVisible && (
				<ListGroup.Item className='border-top p-1'>
					{data.zoneTopicList?.map((dataTopic, index) => {
						return <ListComponent key={index} dataTopic={dataTopic} topicZoneId={data.id} />;
					})}
				</ListGroup.Item>
			)}
		</ListGroup>
	);
};

export default Welcome;
