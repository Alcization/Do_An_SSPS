



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// import 'font-awesome/css/font-awesome.min.css';
import Search from '../../blank/PrintingLog/search';
import FilterForm from './FilterLibrary';

// Dữ liệu mẫu

const documents = [
  { studentCode: "0000001", givenName: "Admin", email: "admin.spso@hcmut.edu.vn", phoneNumber: "035266xxxx", address: "HCMUT Campus", admin: "Yes" },
  { studentCode: "2211927", givenName: "Nguyễn Khánh Lộc", email: "loc.nguyenkhanh@hcmut.edu.vn", phoneNumber: "034949xxxx", address: "District 1, HCMC", admin: "No" },
  { studentCode: "2211928", givenName: "Trần Văn An", email: "an.tranvan@hcmut.edu.vn", phoneNumber: "034556xxxx", address: "District 3, HCMC", admin: "No" },
  { studentCode: "2211929", givenName: "Lê Thị Thanh", email: "thanh.lethithanh@hcmut.edu.vn", phoneNumber: "035667xxxx", address: "District 5, HCMC", admin: "No" },
  { studentCode: "2211930", givenName: "Phạm Quốc Bảo", email: "bao.phamquoc@hcmut.edu.vn", phoneNumber: "036778xxxx", address: "District 10, HCMC", admin: "No" },
  { studentCode: "2211931", givenName: "Ngô Thị Hạnh", email: "hanh.ngothi@hcmut.edu.vn", phoneNumber: "037889xxxx", address: "District 7, HCMC", admin: "No" },
  { studentCode: "2211932", givenName: "Vũ Minh Quân", email: "quan.vuminh@hcmut.edu.vn", phoneNumber: "038990xxxx", address: "Thu Duc City, HCMC", admin: "No" },
  { studentCode: "2211933", givenName: "Phạm Thị Hòa", email: "hoa.phamthi@hcmut.edu.vn", phoneNumber: "039101xxxx", address: "Binh Thanh, HCMC", admin: "No" },
  { studentCode: "2211934", givenName: "Đinh Văn Tài", email: "tai.dinhvan@hcmut.edu.vn", phoneNumber: "032233xxxx", address: "Tan Binh, HCMC", admin: "No" },
  { studentCode: "2211935", givenName: "Trần Ngọc Phúc", email: "phuc.tranngoc@hcmut.edu.vn", phoneNumber: "033344xxxx", address: "Phu Nhuan, HCMC", admin: "No" },
  { studentCode: "2211936", givenName: "Nguyễn Văn Tiến", email: "tien.nguyenvan@hcmut.edu.vn", phoneNumber: "034455xxxx", address: "District 6, HCMC", admin: "No" },
  { studentCode: "2211937", givenName: "Lê Minh Huy", email: "huy.leminh@hcmut.edu.vn", phoneNumber: "035566xxxx", address: "District 8, HCMC", admin: "No" },
  { studentCode: "2211938", givenName: "Trần Thị Thu", email: "thu.tranthi@hcmut.edu.vn", phoneNumber: "036677xxxx", address: "District 9, HCMC", admin: "No" },
  { studentCode: "2211939", givenName: "Ngô Văn Hoàng", email: "hoang.ngovan@hcmut.edu.vn", phoneNumber: "037788xxxx", address: "District 4, HCMC", admin: "No" },
  { studentCode: "2211940", givenName: "Nguyễn Thị Ngọc", email: "ngoc.nguyenthi@hcmut.edu.vn", phoneNumber: "038899xxxx", address: "District 11, HCMC", admin: "Yes" }
];

  


// Hàm chính
function MyTable() {
  const navigate = useNavigate();
  const [documentsList, setDocumentsList] = useState(documents); // Manage the documents state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showFilter, setShowFilter] = useState(false);

  const handleShowFilter = () => setShowFilter(true);
  const handleCloseFilter = () => setShowFilter(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = documentsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(documentsList.length / itemsPerPage);

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

  const handleAddClick = () => {
    navigate('/admin/add_user');
  };

  const handleUpdateClick = () => {
    navigate('/admin/update_user');
  };

  const handleRemoveClick = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
      setDocumentsList((prevDocuments) => prevDocuments.filter((doc) => doc.id !== id));
      // Reset to the first page if the current page becomes empty after deletion
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    }
  };
  
// TODO: take api Method GET: /user of minh 


  useEffect(()=>{
    const takeUsers = async () =>{
      try{
      const res = await axios.get('http://localhost:5000/user'); // chua dung api
      console.log(res.data);
      setDocumentsList(res.data);
      }
      catch(err){
        console.log('Error fetching data',err);
    }
  };
  takeUsers();
},[]);



  const DisplayData = currentItems.map((info) => (
    <tr key={info.id}>
      <td className="text-center">{info.studentCode}</td>
      <td className="text-center">{info.givenName}</td>
      <td className="text-center">{info.email}</td>
      <td className="text-center">{info.phoneNumber}</td>
      <td className="text-center">{info.address}</td>
      <td className="text-center">{info.admin}</td>
      <td className="text-center">
        <Button variant="primary" className="me-2" onClick={handleUpdateClick}>
          <i className="bi bi-pencil"></i>
        </Button>
        <Button variant="danger" className="me-2" onClick={() => handleRemoveClick(info.id)}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  ));

  return (
    <div>
      <div className='d-flex justify-content-start align-items-center p-3 border border-start-0  border-dark rounded-end-3' style={{ width: '36vh'}}>
        <h1>Thông tin máy in</h1> 
      </div>
      <div className="d-flex align-items-center justify-content-end" style={{ width: '175vh'}}>
          <Button variant="info" onClick={handleShowFilter}>
            <i className="bi bi-funnel"></i> Lọc kết quả
          </Button>
          <Button variant="primary" style={{marginLeft:'1rem'}} onClick={handleAddClick}>
            <i class="bi bi-person-plus-fill"></i> Thêm người dùng
          </Button>
        </div>
      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center p-2" style={{ height: '50vh', width: '175vh' }}>
          <Table bordered hover className="mb-0" style={{ borderRadius: '20px', overflow: 'hidden', fontSize: '1.3rem' }}>
            <thead>
              <tr>
                <th className="my-sm-3 bg-info text-center">MSSV</th>
                <th className="my-sm-3 bg-info text-center">Họ tên</th>
                <th className="my-sm-3 bg-info text-center">Email</th>
                <th className="my-sm-3 bg-info text-center">SDT</th>
                <th className="my-sm-3 bg-info text-center">Địa chỉ</th>
                <th className="my-sm-3 bg-info text-center">Vai trò</th>
                <th className="my-sm-3 bg-info text-center">Hành động</th>
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