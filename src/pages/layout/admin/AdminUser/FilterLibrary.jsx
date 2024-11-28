
import React, { useState } from 'react';
import axios from 'axios';  // Import Axios
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Row } from 'react-bootstrap';

function FilterForm() {
    const [studentCode, setStudentCode] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [givenName, setGivenName] = useState('');
    const [address, setAddress] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [sortOrder, setSortOrder] = useState('newest');




    //TODO: admin search các trường studentCode, email, phoneNumber, firstName, giveName, address) Method PUT: /user/filter

    const handleFilter = async () => {
        const filterData = {
            studentCode,
            email,
            phoneNumber,
            firstName,
            givenName,
            address,
        };

        try {
            const response = await axios.put('/user/filter', filterData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Filtered Data:', response.data); // Handle the filtered data here
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div
            className="justify-container-center rounded"
            style={{ maxWidth: '400px', backgroundColor: '#fff', padding: '2vh', marginLeft:'3vh' }}
        >
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Mã số sinh viên</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập mã số sinh viên"
                        value={studentCode}
                        onChange={(e) => setStudentCode(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Nhập email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập số điện thoại"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập họ và tên"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tên gọi</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên gọi"
                        value={givenName}
                        onChange={(e) => setGivenName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập địa chỉ"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Thời gian</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control
                                type="date"
                                value={dateRange.start}
                                onChange={(e) =>
                                    setDateRange({ ...dateRange, start: e.target.value })
                                }
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="date"
                                value={dateRange.end}
                                onChange={(e) =>
                                    setDateRange({ ...dateRange, end: e.target.value })
                                }
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Sắp xếp</Form.Label>
                    <InputGroup>
                        <Form.Check
                            type="switch"
                            id="sortOrderSwitch"
                            label={sortOrder === 'newest' ? 'Mới nhất' : 'Cũ nhất'}
                            checked={sortOrder === 'newest'}
                            onChange={(e) =>
                                setSortOrder(e.target.checked ? 'newest' : 'oldest')
                            }
                        />
                    </InputGroup>
                </Form.Group>

                <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleFilter}
                >
                    Lọc
                </Button>
            </Form>
        </div>
    );
}

export default FilterForm;
