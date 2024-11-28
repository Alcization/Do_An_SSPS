import  { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Contentjson from './contentjson.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './search';
import axios from 'axios';

function MyTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [document,setDocument] = useState([]);

    // Calculate the indices of the first and last items on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Get the items for the current page
    const currentItems = document.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate the total number of pages
    const totalPages = Math.ceil(document.length / itemsPerPage);

    // Create the pagination items
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }
//TODO: Take user Printing history: ID, studentName, printingID, printingTime, fileName, numberPage, paperSize  
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

    const DisplayData = currentItems.map((info) => {
        return (
            <tr key={info.id}>
                <td className="my-sm-3 text-center">{info.id}</td>
                <td className="my-sm-5 text-center">{info.studentName}</td>
                <td className="my-sm-3 text-center">{info.printingID}</td>
                <td className="my-sm-5 text-center">{info.printingTime}</td>
                <td className="my-sm-5 text-center">{info.fileName}</td>
                <td className="my-sm-5 text-center">{info.numberPage}</td>
                <td className="my-sm-5 text-center">{info.paperSize}</td>
            </tr>
        );
    });

    return (
        <div className='d-flex flex-column justify-content-center align-items-center m-2 p-2' style={{ height: '84vh', width: '198vh'}}>
        <div> <h1 className='text-primary'>Printing Log</h1></div>
        <Search/>
            <div className='w-100 bg-white p-4 rounded ' style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <Table bordered hover className='mb-0 ' style={{ borderRadius: '20px', overflow: 'hidden', fontSize: '1.3rem'  }}>
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
                    <tbody>
                        {DisplayData}
                    </tbody>
                </Table>
                <Pagination className="justify-content-end mt-3">
                    <Pagination.Prev 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                        disabled={currentPage === 1}
                    />
                    {paginationItems}
                    <Pagination.Next 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </div>
        </div>
    );
}

export default MyTable;