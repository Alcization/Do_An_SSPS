import { useEffect, useState } from 'react';
import { Button, ListGroup, Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
// import LibraryContent from './libraryContent.json';

function Library() {
    const [openItems, setOpenItems] = useState({});
    const [LibraryContent, setLibraryContent] = useState([]);
    // Toggle open state for items
    const toggleOpen = (id) => {
        setOpenItems((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    };

    // Reusable styles
    const styles = {
        container: {
            height: '70vh',
            fontSize: '1.2rem',
            marginTop: '2vh',
        },
        subjectItem: {
            background: 'rgb(199, 206, 199)',
        },
        fileItem: {
            background: 'rgb(160, 250, 160)',
            marginLeft: '3vh',
            width: '90%',
        },
    };

    // Fetch library content from be
    //TODO: Take library content Method GET: /library: chua thong nhat vs Hanh :(
    useEffect(() => {
        const fetchLibraryContent = async () => {
            try {
                const response = await axios.get('http://localhost:5000/library'); // chua dung api
                setLibraryContent(response.data);
            } catch (err) {
                console.log('Error fetching data', err);
            }
        };
        fetchLibraryContent();
    },[])

    return (
        <div className="container p-3" style={styles.container}>
            <h4>Danh sách tài liệu</h4>
            <div className="row">
                {LibraryContent.map((document, index) => (
                    <div key={index} className="col-md-6 mb-3">
                        <ListGroup variant="flush">
                            {/* Document Item */}
                            <ListGroup.Item
                                style={styles.subjectItem}
                                action
                                onClick={() => toggleOpen(index)}
                                aria-controls={`collapse-files-${index}`}
                                aria-expanded={openItems[index] || false}
                            >
                                {document.title} - {document.category}
                            </ListGroup.Item>
                            {/* Document Details Collapse */}
                            <Collapse in={openItems[index]}>
                                <div id={`collapse-files-${index}`}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item style={styles.fileItem}>
                                            <strong>Mô tả:</strong> {document.description}
                                        </ListGroup.Item>
                                        <ListGroup.Item style={styles.fileItem}>
                                            <strong>Tổng số trang:</strong> {document.totalPages}
                                        </ListGroup.Item>
                                        <ListGroup.Item style={styles.fileItem}>
                                            <strong>Trạng thái:</strong> {document.status}
                                        </ListGroup.Item>
                                        <ListGroup.Item style={styles.fileItem}>
                                            <strong>Chi phí mỗi trang:</strong> {document.printSettings.costPerPage} VND
                                        </ListGroup.Item>
                                        <ListGroup.Item style={styles.fileItem}>
                                            <strong>Kích thước giấy:</strong> {document.printSettings.allowedPaperSizes.join(', ')}
                                        </ListGroup.Item>
                                        {document.fileUrl && (
                                            <ListGroup.Item style={styles.fileItem}>
                                                <Button
                                                    variant="link"
                                                    href={document.fileUrl}
                                                    target="_blank"
                                                    className="text-decoration-none"
                                                >
                                                    Xem tài liệu
                                                </Button>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </div>
                            </Collapse>
                        </ListGroup>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Library;
