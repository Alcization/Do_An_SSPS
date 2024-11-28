import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Contentjson from '../../blank/PrintingLog/contentjson.json';
import FilterForm from './FilterForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function MyTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [document,setDocument] = useState(Contentjson); //replace when have api
    // State để quản lý modal
    const [showFilter, setShowFilter] = useState(false);

    // Các hàm điều khiển modal
    const handleShowFilter = () => setShowFilter(true);
    const handleCloseFilter = () => setShowFilter(false);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = document.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(document.length / itemsPerPage);

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
//TODO: Take all user Printing history: studentName, printingID, printingTime, fileName, paperSize  
useEffect(()=>{
    const fetchHistoryPrint = async ()=>{
        try{
            const response = await axios.get('http://localhost:5000/printing'); //ch dung api
            setDocument(response.data);
        }catch(err){
            console.log('Error fetching data',err);
        }
        fetchHistoryPrint();
    }
    },[]);
    const DisplayData = currentItems.map((info) => (
        <tr key={info.id}>
            
            <td className="my-sm-5 text-center">{info.studentName}</td>
            <td className="my-sm-3 text-center">{info.printingID}</td>
            <td className="my-sm-5 text-center">{info.printingTime}</td>
            <td className="my-sm-5 text-center">{info.fileName}</td>
          
            <td className="my-sm-5 text-center">{info.paperSize}</td>
        </tr>
    ));

    return (
        <div>
            <div className='d-flex justify-content-start align-items-center p-3 border border-start-0  border-dark rounded-end-3' style={{ width: '22vh'}}>
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
       
                                <th className="my-sm-5 bg-info text-center">Tên sinh viên</th>
                                <th className="my-sm-3 bg-info text-center">Mã máy in</th>
                                <th className="my-sm-5 bg-info text-center">Thời gian in</th>
                                <th className="my-sm-5 bg-info text-center">Tên file</th>
                                
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
