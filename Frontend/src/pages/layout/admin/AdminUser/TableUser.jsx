import React, { useState } from 'react';
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
    { id: "0000001", name: "Admin", email: "admin.spso@hcmut.edu.vn", phone: "035266xxxx", role: "Admin" },
    { id: "2211927", name: "Nguyễn Khánh Lộc", email: "loc.nguyenkhanh@hcmut.edu.vn", phone: "034949xxxx", role: "Sinh viên" },
    { id: "2211928", name: "Trần Văn An", email: "an.tranvan@hcmut.edu.vn", phone: "034556xxxx", role: "Sinh viên" },
    { id: "2211929", name: "Lê Thị Thanh", email: "thanh.lethithanh@hcmut.edu.vn", phone: "035667xxxx", role: "Sinh viên" },
    { id: "2211930", name: "Phạm Quốc Bảo", email: "bao.phamquoc@hcmut.edu.vn", phone: "036778xxxx", role: "Giáo viên" },
    { id: "2211931", name: "Ngô Thị Hạnh", email: "hanh.ngothi@hcmut.edu.vn", phone: "037889xxxx", role: "Sinh viên" },
    { id: "2211932", name: "Vũ Minh Quân", email: "quan.vuminh@hcmut.edu.vn", phone: "038990xxxx", role: "Sinh viên" },
    { id: "2211933", name: "Phạm Thị Hòa", email: "hoa.phamthi@hcmut.edu.vn", phone: "039101xxxx", role: "Sinh viên" },
    { id: "2211934", name: "Đinh Văn Tài", email: "tai.dinhvan@hcmut.edu.vn", phone: "032233xxxx", role: "Sinh viên" },
    { id: "2211935", name: "Trần Ngọc Phúc", email: "phuc.tranngoc@hcmut.edu.vn", phone: "033344xxxx", role: "Sinh viên" },
    { id: "2211936", name: "Nguyễn Văn Tiến", email: "tien.nguyenvan@hcmut.edu.vn", phone: "034455xxxx", role: "Sinh viên" },
    { id: "2211937", name: "Lê Minh Huy", email: "huy.leminh@hcmut.edu.vn", phone: "035566xxxx", role: "Sinh viên" },
    { id: "2211938", name: "Trần Thị Thu", email: "thu.tranthi@hcmut.edu.vn", phone: "036677xxxx", role: "Giáo viên" },
    { id: "2211939", name: "Ngô Văn Hoàng", email: "hoang.ngovan@hcmut.edu.vn", phone: "037788xxxx", role: "Sinh viên" },
    { id: "2211940", name: "Nguyễn Thị Ngọc", email: "ngoc.nguyenthi@hcmut.edu.vn", phone: "038899xxxx", role: "Admin" }
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

  const DisplayData = currentItems.map((info) => (
    <tr key={info.id}>
      <td className="text-center">{info.id}</td>
      <td className="text-center">{info.name}</td>
      <td className="text-center">{info.email}</td>
      <td className="text-center">{info.phone}</td>
      <td className="text-center">{info.role}</td>
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
      <div className='d-flex justify-content-start align-items-center p-3 border border-dark' style={{ width: '52vh', borderRadius: '15px'}}>
        <h1>Thông tin người dùng</h1> 
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