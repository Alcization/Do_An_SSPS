
import React, { useEffect } from 'react'
import { Container, Row, Col, Table, Pagination } from 'react-bootstrap';
import './studentAccount.css';
import Avatar from '../../../../assets/user.png';
import InforTransition from './inforTransition';
import axios from 'axios';
const studentAccount = () => {

    //TODO: take student inf: studentCode, givenName, email, phoneNumber
    useEffect(()=>{
        const fetchUserData = async ()=>{
            try{
                const user = await axios.get('http://localhost:5000/user/id');
                console.log(response.data);
             
            }catch(err){
                console.log('Error fetching data',err);
            }  
            fetchUserData(); 
        };
    },[]);

  return (
    <div>
        <div className='main-page-detail'>
        <img src={Avatar} className="avatar" alt="User Avatar" />
            <div className='info-block2'>
                <span className='info2'> 
                    
                    <h1 className='m-2'>  Thông tin sinh viên</h1>
                    <div>
                        <Container className='container_student_info'>
                            <div className='disp-info'>
                            <Row  >
                                    <Col className='student-info student-label'>
                                        <span>MSSV</span>
                                    </Col>
                                    <Col className='student-info student-value' xs={7}>
                                        {/* <span >{user.studentCode}</span> */}
                                        <span>2212432</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='student-info student-label'>
                                        <span>Họ và tên </span>
                                    </Col>
                                    <Col className='student-info student-value' xs={7}>
                                        {/* <span >{user.givenName}</span> */}
                                        <span>Le Nguyen Yen Nhi</span>
                                    </Col>
                                </Row>
                                <Row  >
                                    <Col className='student-info student-label'>
                                        <span>Email </span>
                                    </Col>
                                    <Col className='student-info student-value' xs={7}>
                                        {/* <span >{user.email}</span> */}
                                        <span>nhi.lenguyenyen@hcmut.edu.vn</span>
                                    </Col>
                                </Row>
                                <Row  >
                                    <Col className='student-info student-label'>
                                        <span>Số điện thoại</span>
                                    </Col>
                                    <Col className='student-info student-value' xs={7}>
                                        {/* <span >{user.phoneNumber}</span> */}
                                        <span>123x233x33</span>
                                    </Col>
                                </Row>
                                
                            </div>
                        </Container>
                    </div>
                    <h1 className='m-2'>  Thông tin giao dịch</h1>
                </span>
            </div>
        </div>
        <InforTransition/>
    </div>
  )
}

export default studentAccount
