import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddUser = () => {
  const [formData, setFormData] = useState({
    id: '0',
    courseCode: '', // This corresponds to the user name
    semester: '',   // This corresponds to the email
    documentName: '', // This corresponds to the phone number
    file: null, // This could be removed if not needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data object to send to the API
    const data = {
      id: formData.id,
      username: formData.courseCode,
      email: formData.semester,
      phoneNumber: formData.documentName,
    };

    try {
      // Replace `your-api-endpoint` with the actual API URL
      const response = await axios.post('your-api-endpoint', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response.data);
      alert('Người dùng đã được thêm thành công!');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Có lỗi xảy ra khi thêm người dùng.');
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
              <h3 className="text-center mb-4">Thêm người dùng</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">MSSV</label>
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
                  <label className="form-label">Tên người dùng</label>
                  <input
                    type="text"
                    className="form-control"
                    name="courseCode"
                    value={formData.courseCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">SDT</label>
                  <input
                    type="text"
                    className="form-control"
                    name="documentName"
                    value={formData.documentName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="d-flex justify-content-center gap-3">
                  <button type="submit" className="btn btn-primary px-4">
                    Thêm người dùng
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

export default AddUser;
