import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Upload from '../../../../assets/upload.svg';

const AddDocument = () => {
  const [formData, setFormData] = useState({
    id: '0',
    courseCode: '',
    semester: '',
    documentName: '',
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for sending via Axios
    const data = new FormData();
    data.append('id', formData.id);
    data.append('courseCode', formData.courseCode);
    data.append('semester', formData.semester);
    data.append('documentName', formData.documentName);
    if (formData.file) {
      data.append('file', formData.file);
    }

    try {
      // Replace `your-api-endpoint` with the actual API URL
      const response = await axios.post('your-api', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      alert('Tài liệu đã được thêm thành công!');
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Có lỗi xảy ra khi thêm tài liệu.');
    }
  };

  const handleCancel = () => {
    setFormData({
      id: '0',
      courseCode: '',
      semester: '',
      documentName: '',
      file: null,
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center mb-4">Thêm tài liệu mới</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Mã số (ID)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Mã môn học</label>
                  <input
                    type="text"
                    className="form-control"
                    name="courseCode"
                    value={formData.courseCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Học kỳ</label>
                  <input
                    type="text"
                    className="form-control"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tên tài liệu</label>
                  <input
                    type="text"
                    className="form-control"
                    name="documentName"
                    value={formData.documentName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Upload</label>
                  <div className="border rounded p-3 text-center">
                    <div className="mb-3">
                      <img
                        src={Upload}
                        alt="Upload icon"
                        style={{ width: '64px', height: '64px' }}
                      />
                    </div>
                    <input
                      type="file"
                      className="form-control"
                      name="file"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-center gap-3">
                  <button type="submit" className="btn btn-primary px-4">
                    Thêm tài liệu
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger px-4"
                    onClick={handleCancel}
                  >
                    Hủy bỏ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
