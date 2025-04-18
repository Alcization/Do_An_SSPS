import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Contentjson from './contentjson.json';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './search';
import view_icon from '../../../assets/view.png';
import edit_icon from '../../../assets/update.png';
import delete_icon from '../../../assets/delete.png';
// api
import { getAllPrinters, deletePrinter } from '../../../api';
function MyTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Trạng thái chờ
    // Calculate the indices of the first and last items on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Get the items for the current page
    // const currentItems = Contentjson.slice(indexOfFirstItem, indexOfLastItem);
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    // Calculate the total number of pages
    const totalPages = Math.ceil(Contentjson.length / itemsPerPage);

    // Create the pagination items
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    const navigate = useNavigate();
    const toAddPrinter = () => {
        navigate('/admin/add_printer');
    }
    const toPrinterDetail = (id_printer) => {
        navigate('/admin/printer_detail', { state: { id: id_printer } });
    }
    const toUpdatePrinter = (id_printer) => {
        navigate('/admin/update_printer', { state: { id: id_printer, data: data } });
    }
    const toDeletePrinter = async (id_printer) => {
        window.alert("Are you sure you want to delete this printer?");
        // connect to backend
        // delete printer with id_printer
        const response = await deletePrinter(id_printer)
        const result = response.metaData
        if (result) {
            fetchUser();
        }
    }
    const fetchUser = async () => {
        setLoading(true); // Bắt đầu loading
        try {
            const result = await getAllPrinters(); // Chờ hàm getUser() trả về kết quả
            // const result = await logoutUser()
            console.log(result); // In kết quả
            if (result) {
                setData(result.metaData); // Lưu thông tin user
            }
        } catch (error) {
            // ở đây nên làm cái allert error message
            // alert(error.message);
            console.error('Error fetching user:', error.message);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };
    useEffect(() => {

        fetchUser();
        // setLoading(false);
    }, []);
    if (loading) {
        return <div>Loading...</div>; // Hiển thị màn hình loading trong khi chờ
    }
    const DisplayData = currentItems.map((info) => {
        return (
            <tr key={info._id}>
                <td className="my-sm-3 text-center">{info._id}</td>
                <td className="my-sm-5 text-center">{info.printerName}</td>
                <td className="my-sm-3 text-center">{info.model}</td>
                <td className="my-sm-3 text-center">{info.desc}</td>
                <td className="my-sm-5 text-center">{info.buildingName}</td>
                <td className="my-sm-5 text-center">{info.room}</td>
                <td className="my-sm-5 text-center">
                    <Row>
                        <Col>
                            <Button variant="info" size="sm-2" style={{ backgroundColor: '#3AC9D6' }} onClick={() => toPrinterDetail(info.id)}>
                                <img src={view_icon} alt="" />
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="outline-light" size='sm-3' style={{ backgroundColor: '#4B9CFC' }} onClick={() => toUpdatePrinter(info._id)}>
                                <img src={edit_icon} alt="" />
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="outline-light" style={{ backgroundColor: '#F5707A' }} onClick={() => toDeletePrinter(info._id)}>
                                <img src={delete_icon} alt="" />
                            </Button>
                        </Col>
                    </Row>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <div className='d-flex justify-content-start align-items-center p-3 border border-dark' style={{ width: '36vh', borderRadius: '15px'}}>
                <h1>Thông tin máy in</h1>
            </div>
            <div className='d-flex justify-content-end'>
                <Button variant="outline-light" style={{
                    backgroundColor: '#4B9CFC',
                    marginRight: '2rem', textAlign: 'center', width: '12rem', height: '3rem', fontSize: '1.5rem'
                }} onClick={() => toAddPrinter()}>Thêm máy in</Button>
            </div>
            <div className='d-flex flex-column  align-items-center'
                style={{ height: '62vh', width: '176vh', marginLeft: '1rem' }}>

                <Search />


                <div className='w-100 bg-white p-4 rounded ' style={{ borderRadius: '20px', overflow: 'hidden' }}>
                    <Table bordered hover className='mb-0' style={{ borderRadius: '20px', overflow: 'hidden', fontSize: '1.3rem' }}>
                        <thead>
                            <tr>
                                <th className="my-sm-3 bg-info text-center">ID</th>
                                <th className="my-sm-5 bg-info text-center">Hãng</th>
                                <th className="my-sm-3 bg-info text-center">Mẫu mã</th>
                                <th className="my-sm-3 bg-info text-center">Mô tả</th>
                                <th className="my-sm-5 bg-info text-center">Tòa</th>
                                <th className="my-sm-5 bg-info text-center">Phòng</th>
                                <th className="my-sm-5 bg-info text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DisplayData}
                        </tbody>
                    </Table>


                </div>
            </div>
            <Pagination className="justify-content-end mt-3" style={{ marginRight: '3rem' }}>
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

    );
}

export default MyTable;