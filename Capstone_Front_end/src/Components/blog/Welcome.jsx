import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import ListComponent from './ListComponent';
import { TbEyeOff, TbEye } from 'react-icons/tb';
import { useState } from 'react';
import Logo from '../Logo';
import { useSelector } from 'react-redux';

const Welcome = ({ data }) => {
	const [isListVisible, setListVisibility] = useState(true);
	const { homeColor } = useSelector((state) => state.reducer);
	return (
		<ListGroup style={{ background: `rgb(${homeColor})` }} className='m-1'>
			<ListGroup.Item className='p-0 align-items-center border-0 my-2 '>
				<Container fluid>
					<Row
						className='d-flex align-items-center p-0'
						style={{ background: `rgb(${homeColor})` }}>
						<Col className='tag'>
							<Row
								style={{
									background: `linear-gradient(135deg, rgba(${homeColor},0) 39%, rgba(40,43,40,0.6699054621848739) 95%)`,
								}}
								className='d-flex align-items-center justify-content-center'>
								<Col className='d-flex justify-content-between ps-1'>
									<div className='list-name d-flex align-items-center justify-content-start '>
										<div
											className=' text-white rounded-2 pb-1 px-1 fw-semibold'
											style={{
												whiteSpace: 'nowrap',
												background: `linear-gradient(0deg, rgba(${homeColor},0.9051995798319328) 2%, rgba(40,43,40,0.6699054621848739) 95%)`,
											}}>
											{data.name}
										</div>
										<div
											className='ps-2 pe-3 d-flex align-items-center'
											style={{
												background: `linear-gradient(0deg, rgba(${homeColor},0.9051995798319328) 2%, rgba(40,43,40,0.6699054621848739) 95%)`,
											}}>
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
				<ListGroup.Item
					className='border-top p-1'
					style={{
						background: `linear-gradient(135deg, rgba(40,43,40,0.6699054621848739) 39%, rgba(${homeColor}) 86%)`,
					}}>
					{data.zoneTopicList?.map((dataTopic, index) => {
						return <ListComponent key={index} dataTopic={dataTopic} topicZoneId={data.id} />;
					})}
				</ListGroup.Item>
			)}
		</ListGroup>
	);
};

export default Welcome;
