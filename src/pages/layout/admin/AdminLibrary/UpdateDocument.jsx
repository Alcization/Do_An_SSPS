import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Upload from '../../../../assets/upload.svg'
import { useSearchParams } from 'react-router-dom';
//api 
import { updateDocument } from '../../../../api';
const UpdateDocumnet = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    maxCopies: '',
    costPerPage: '',
    status: 'active',
    title: '',
    file: null
  });
  const id = searchParams.get('id'); // "123"
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: name === "costPerPage" || name === "maxCopies" ? parseFloat(value) || 0 : value,
      };
    });
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
    const data = {
      ...formData,
      status: formData.status,
      title: formData.title,
      file: formData.file,
      printSettings: {
        ...(formData.maxCopies != '' && { maxCopies: formData.maxCopies }),
        ...(formData.costPerPage != '' && { costPerPage: formData.costPerPage })
      }
    }
    console.log('Form data:', data);
    console.log('Form id:', id);

    const result = await updateDocument(id, data)
    if (result.metaData) {
      alert("Chinh sua thanh cong !")
    }
  };

  const handleCancel = () => {
    setFormData({
      maxCopies: '',
      costPerPage: '',
      status: 'active',
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
              <h3 className="text-center mb-4">Chỉnh sửa tài liệu</h3>
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">Số bản sao tối đa</label>
                  <input
                    type="text"
                    className="form-control"
                    name="maxCopies"
                    value={formData.maxCopies}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Giá tiền của 1 trang giấy</label>
                  <input
                    type="text"
                    className="form-control"
                    name="costPerPage"
                    value={formData.costPerPage}
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
                <select
                  className="printingOption-option"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="">Chia sẻ</option>
                  <option value="active">Bật</option>
                  <option value="inactive">tắt</option>
                </select>
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
                    Chỉnh sửa tài liệu
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

export default UpdateDocumnet;