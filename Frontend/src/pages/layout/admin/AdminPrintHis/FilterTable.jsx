import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Contentjson from '../../blank/PrintingLog/contentjson.json';
import FilterForm from './FilterForm';
import 'bootstrap/dist/css/bootstrap.min.css';
// api
import { getAllDocument } from '../../../../api';
function MyTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = React.useState(true);
    const itemsPerPage = 10;

    // State để quản lý modal
    const [showFilter, setShowFilter] = useState(false);

    // Các hàm điều khiển modal
    const handleShowFilter = () => setShowFilter(true);
    const handleCloseFilter = () => setShowFilter(false);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = Contentjson.slice(indexOfFirstItem, indexOfLastItem);
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(Contentjson.length / itemsPerPage);

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    const DisplayData = currentItems.map((info, index) => (
        <tr key={index + 1}>
            <td className="my-sm-3 text-center">{index + 1}</td>
            <td className="my-sm-5 text-center">{info.studentId.givenName}</td>
            <td className="my-sm-3 text-center">{info.printerId}</td>
            <td className="my-sm-5 text-center">{info.printTime}</td>
            <td className="my-sm-5 text-center">{info.fileName}</td>
            <td className="my-sm-5 text-center">{info.pageBefore}</td>
            <td className="my-sm-5 text-center">{info.pageType}</td>
        </tr>
    ));
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true); // Bắt đầu loading
            try {
                const result = await getAllDocument(); // Chờ hàm getUser() trả về kết quả
                // const result = await logoutUser()
                console.log(result.metaData); // In kết quả
                if (result) {
                    setData(result.metaData)// Lưu thông tin user
                }
            } catch (error) {
                // ở đây nên làm cái allert error message
                // alert(error.message);
                console.error('Error fetching user:', error.message);
            } finally {
                setLoading(false); // Kết thúc loading
            }
        };
        fetchUser();
        // setLoading(false);
    }, []);
    if (loading) {
        return <div>Loading...</div>; // Hiển thị màn hình loading trong khi chờ
    }
    return (
        <div>
            <div className='d-flex justify-content-start align-items-center p-3 border border-dark' style={{ width: '22vh', borderRadius: '15px' }}>
                <h1>Lịch sử in</h1>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center m-2 p-2" style={{ height: '74vh', width: '176vh' }}>

                <div className="d-flex justify-content-end w-100 mb-3">
                    <Button variant="info" onClick={handleShowFilter}>
                        Lọc kết quả
                    </Button>
                </div>
                <div className="w-100 bg-white p-4 rounded" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                    <Table bordered hover className="mb-0" style={{ borderRadius: '20px', overflow: 'hidden', fontSize: '1.3rem' }}>
                        <thead>
                            <tr>
                                <th className="my-sm-3 bg-info text-center">STT</th>
                                <th className="my-sm-5 bg-info text-center">Tên sinh viên</th>
                                <th className="my-sm-3 bg-info text-center">Mã máy in</th>
                                <th className="my-sm-5 bg-info text-center">Thời gian in</th>
                                <th className="my-sm-5 bg-info text-center">Tên file</th>
                                <th className="my-sm-5 bg-info text-center">Số trang</th>
                                <th className="my-sm-5 bg-info text-center">Size</th>
                            </tr>
                        </thead>
                        <tbody>{DisplayData}</tbody>
                    </Table>
                    <Pagination className="justify-content-end mt-3">
                        <Pagination.Prev
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        />
                        {paginationItems}
                        <Pagination.Next
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </div>

                <Modal show={showFilter} onHide={handleCloseFilter} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Lọc kết quả</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FilterForm />
                    </Modal.Body>
                </Modal>
            </div>
        </div>

    );
}

export default MyTable;
