// import { useState } from 'react';
// import { Button, ListGroup, Collapse } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import { Link } from 'react-router-dom';
// import LibraryContent from './libraryContent.json';

// function Library() {
//     const [openItems, setOpenItems] = useState({});
//     const subjects = LibraryContent;

//     const toggleOpen = (id) => {
//         setOpenItems((prevState) => ({ ...prevState, [id]: !prevState[id] }));
//     };

//     return (
//         <div className="container p-3" style={{height: "70vh", fontSize: '1.2rem', marginTop:'2vh'}}>
//             <h4>Danh sách môn học</h4>
//             <div className="row">
//                 {subjects.map((subject) => (
//                     <div key={subject.id} className="col-md-6 mb-3">
//                         <ListGroup variant="flush">
//                             <ListGroup.Item
//                                 style={{ background: 'rgb(199, 206, 199'}}
//                                 action
//                                 onClick={() => toggleOpen(subject.id)}
//                                 aria-controls={`collapse-subtopics-${subject.id}`}
//                                 aria-expanded={openItems[subject.id] || false}
//                             >
//                                 {subject.title}
//                             </ListGroup.Item>
//                             <Collapse in={openItems[subject.id]}>
//                                 <div id={`collapse-subtopics-${subject.id}`}>
//                                     <ListGroup variant="flush" className="ml-3">
//                                         {subject.subTopics.map((subTopic, index) => (
//                                             <div key={index}>
//                                                 <ListGroup.Item
//                                                  style={{ background: 'rgba(164, 217, 255, 1)', marginLeft:'3vh', width:'90%', marginTop: '0'}}
//                                                     action
//                                                     onClick={() => toggleOpen(`${subject.id}-${index}`)}
//                                                     aria-controls={`collapse-files-${subject.id}-${index}`}
//                                                     aria-expanded={openItems[`${subject.id}-${index}`] || false}
//                                                 >
//                                                     {subTopic.name} - {subTopic.courseCode} ({subTopic.semester})
//                                                 </ListGroup.Item>
//                                                 <Collapse in={openItems[`${subject.id}-${index}`]}>
//                                                     <div id={`collapse-files-${subject.id}-${index}`}>
//                                                         <p className="m-0">{subTopic.description}</p>
//                                                         <ListGroup variant="flush" className="ml-3">
//                                                             {subTopic.subFiles.map((file, fileIndex) => (
//                                                                 <ListGroup.Item
//                                                                 style={{ background: 'rgb(160, 250, 160)', marginLeft:'8vh', width:'80%', marginTop: '0'}}
//                                                                     key={fileIndex}
//                                                                     className="d-flex justify-content-between align-items-center"
//                                                                 >
//                                                                         {/* <Link to={`/watch_document`} className="text-decoration-none"> */}
//                                                                          {file.name}: {file.description}
//                                                                          {/* </Link> */}
//                                                                     {file.pdfUrl && (
//                                                                         <Button
//                                                                             variant="link"
//                                                                             href={file.pdfUrl}
//                                                                             target="_blank"
//                                                                             className="text-decoration-none"
//                                                                         >
//                                                                             Xem PDF
//                                                                         </Button>
//                                                                     )}
//                                                                 </ListGroup.Item>
//                                                             ))}
//                                                         </ListGroup>
//                                                     </div>
//                                                 </Collapse>
//                                             </div>
//                                         ))}
//                                     </ListGroup>
//                                 </div>
//                             </Collapse>
//                         </ListGroup>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Library;

import { useState, useEffect } from 'react';
import { Button, ListGroup, Collapse, Spinner, Badge, Form } from 'react-bootstrap';
// api
import { getLibraryStructure, getSubjectDocuments } from '../../../../api';

function Library() {
    const [openItems, setOpenItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [documents, setDocuments] = useState({});
    const [filters, setFilters] = useState({
        documentType: null,
        semester: ''
    });

    const categoryNames = {
        'general': 'Đại cương',
        'political': 'Chính trị',
        'basic': 'Cơ sở',
        'specialized': 'Chuyên ngành'
    };

    const documentTypeNames = {
        'theory': 'Lý thuyết',
        'exam': 'Đề thi'
    };

    useEffect(() => {
        const fetchStructure = async () => {
            try {
                const response = await getLibraryStructure();
                console.log('API Response:', response);


                const categorizedSubjects = [];


                if (response.metaData) {
                    Object.entries(response.metaData).forEach(([categoryKey, categoryData]) => {
                        if (categoryData && categoryData.subjects) {
                            categorizedSubjects.push({
                                id: categoryKey,
                                name: categoryData.name || categoryNames[categoryKey],
                                subjects: categoryData.subjects.map(subject => ({
                                    ...subject,
                                    categoryName: categoryData.name || categoryNames[categoryKey]
                                }))
                            });
                        }
                    });
                }

                setCategories(categorizedSubjects);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching library structure:', err);
                setError('Không thể tải cấu trúc thư viện');
                setLoading(false);
            }
        };
        fetchStructure();
    }, []);

    const handleSubjectOpen = async (subjectCode) => {
        if (!documents[subjectCode] ||
            filters.documentType !== documents[subjectCode].filters?.documentType ||
            filters.semester !== documents[subjectCode].filters?.semester) {
            try {
                const response = await getSubjectDocuments(subjectCode, filters);
                console.log('Documents Response:', response); // Debug

                if (response.metaData) {
                    setDocuments(prev => ({
                        ...prev,
                        [subjectCode]: {
                            data: response.metaData,
                            filters: { ...filters }
                        }
                    }));
                }
            } catch (err) {
                console.error('Error fetching documents:', err);
                setError(`Không thể tải tài liệu cho môn học ${subjectCode}`);
            }
        }
    };

    const handleFilterChange = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: value
        }));

        setDocuments({});
    };

    const toggleOpen = (id) => {
        setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
        if (!openItems[id]) {
            handleSubjectOpen(id);
        }
    };

    if (loading) {
        return <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Đang tải...</span>
            </Spinner>
        </div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container p-3" style={{ height: "70vh", fontSize: '1.2rem', marginTop: '2vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Danh sách môn học</h4>
                <div className="d-flex gap-3">
                    <Form.Select
                        value={filters.documentType || ''}
                        onChange={(e) => handleFilterChange('documentType', e.target.value || null)}
                        style={{ width: '200px' }}
                    >
                        <option value="">Tất cả loại tài liệu</option>
                        {Object.entries(documentTypeNames).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </Form.Select>
                    <Form.Select
                        value={filters.semester}
                        onChange={(e) => handleFilterChange('semester', e.target.value)}
                        style={{ width: '200px' }}
                    >
                        <option value="">Tất cả học kỳ</option>
                        <option value="2023-2024-1">HK1 2023-2024</option>
                        <option value="2023-2024-2">HK2 2023-2024</option>
                    </Form.Select>
                </div>
            </div>

            <div className="row">
                {categories.map((category) => (
                    <div key={category.id} className="col-md-6 mb-3">
                        <ListGroup variant="flush">
                            <ListGroup.Item
                                style={{ background: 'rgb(199, 206, 199' }}
                                action
                                onClick={() => toggleOpen(category.id)}
                                aria-controls={`collapse-${category.id}`}
                                aria-expanded={openItems[category.id] || false}
                            >
                                {category.name}
                            </ListGroup.Item>
                            <Collapse in={openItems[category.id]}>
                                <div id={`collapse-${category.id}`}>
                                    <ListGroup variant="flush">
                                        {category.subjects?.map((subject) => (
                                            <div key={subject.code}>
                                                <ListGroup.Item
                                                    style={{ background: 'rgba(164, 217, 255, 1)', marginLeft: '3vh' }}
                                                    action
                                                    onClick={() => toggleOpen(subject.code)}
                                                >
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span>{subject.name} - {subject.code}</span>
                                                        <small className="text-muted">{subject.categoryName}</small>
                                                    </div>
                                                </ListGroup.Item>
                                                <Collapse in={openItems[subject.code]}>
                                                    <div>
                                                        {documents[subject.code]?.data?.map((doc) => (
                                                            <ListGroup.Item
                                                                key={doc._id || doc.id}
                                                                style={{ background: 'rgb(160, 250, 160)', marginLeft: '8vh' }}
                                                            >
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div>
                                                                        <span>{doc.title}</span>
                                                                        <Badge bg="info" className="ms-2">
                                                                            {documentTypeNames[doc.documentType]}
                                                                        </Badge>
                                                                        <small className="d-block text-muted">
                                                                            {doc.totalPages} trang | Lượt xem: {doc.metadata?.views || 0}
                                                                        </small>
                                                                    </div>
                                                                    <Button
                                                                        variant="link"
                                                                        onClick={() => window.open(doc.previewUrl, '_blank')}
                                                                    >
                                                                        Xem PDF
                                                                    </Button>
                                                                </div>
                                                            </ListGroup.Item>
                                                        ))}
                                                    </div>
                                                </Collapse>
                                            </div>
                                        ))}
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