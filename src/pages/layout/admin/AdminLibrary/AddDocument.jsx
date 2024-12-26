import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Upload from '../../../../assets/upload.svg'
// api
import { createDocument } from '../../../../api';
const AddDocumnet = () => {
  const [formData, setFormData] = useState({
    id: '0357',
    subjectCode: '',
    semester: '',
    title: '',
    file: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "costPerPage" ? parseFloat(value) || 0 : value, // Chuyển đổi sang số
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Xử lý logic upload tại đây
    console.log('Form data:', formData);
    const result = await createDocument(formData)
    if (result.metaData) {
      alert("Them tai lieu thanh cong !")
    }
  };

  const handleCancel = () => {
    setFormData({
      id: '0357',
      subjectCode: '',
      semester: '',
      title: '',
      file: null
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
                    name="subjectCode"
                    value={formData.subjectCode}
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
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tên môn học </label>
                  <input
                    type="text"
                    className="form-control"
                    name="subjectName"
                    value={formData.subjectName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Mô tả tài liệu</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Loại môn học</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subjectCategory"
                    value={formData.subjectCategory}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Loại tài liệu </label>
                  <input
                    type="text"
                    className="form-control"
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Loại giấy </label>
                  <input
                    type="text"
                    className="form-control"
                    name="allowedPaperSizes"
                    value={formData.allowedPaperSizes}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Màu giấy </label>
                  <input
                    type="text"
                    className="form-control"
                    name="allowColor"
                    value={formData.allowColor}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Giá mỗi trang </label>
                  <input
                    type="text"
                    className="form-control"
                    name="costPerPage"
                    value={formData.costPerPage}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số lượng in bản in tối đa </label>
                  <input
                    type="text"
                    className="form-control"
                    name="maxCopies"
                    value={formData.maxCopies}
                    onChange={handleInputChange}
                  />
                </div>
                <select
                  className="printingOption-option"
                  name="doubleSidedAllowed"
                  value={formData.doubleSidedAllowed}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn số mặt in</option>
                  <option value="false">In 1 mặt</option>
                  <option value="true">In 2 mặt</option>
                </select>
                {/* <div className="mb-3">
                  <label className="form-label">In hai mặt</label>
                  <input
                    type="text"
                    className="form-control"
                    name="doubleSidedAllowed"
                    value={formData.doubleSidedAllowed}
                    onChange={handleInputChange}
                  />
                </div> */}
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

export default AddDocumnet;