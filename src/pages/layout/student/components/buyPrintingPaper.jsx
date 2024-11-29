import React, { useState, useEffect } from "react";
import "./css/buyPrintingPaper/buyPrintingPaper.css";
import {useLocation, useNavigate} from 'react-router-dom';


function BuyPrintingPaperBody() {
  const [paperNo, setPaperNo] = useState(0);
  const paperPrice = 200;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  useEffect(() => {
    console.log('ID from query params:', id);
    // You can use the id for further logic here
  }, [id]);
  
  const handleBlur = (event) => {
    const value = parseFloat(event.target.value) || 0; 
    setPaperNo(value);
    console.log(value);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted with:', { paperNo, total: paperNo * paperPrice });
    // navigate('/student/payment_status');
  };


  return (
    <div className="container1">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <form className="buyPrintingPaper__body" onSubmit={handleSubmit}>
            <p className="infor-title">Thông tin trang mua</p>
            <div className="buyPrintingPaper-input">
              <label for="number" className="paperNo">
                Số trang muốn mua thêm:
              </label>

              <input
                type="number"
                className="paperNo-input"
                defaultValue={100}
                id="numberInput"
                onBlur={handleBlur}
              />

            </div>
            <div className="buyPrintingPaper-detail">
              <div className="paperSum">
                <p className="title1">Tổng số trang</p>
                {paperNo && <p className="number">{paperNo}</p>}
              </div>
              <div className="PriceSum">
                <p className="title1">Đơn giá</p>
                <p className="number">{paperPrice}</p>
              </div>
            </div>
            <div className="buyPrintingPaper-conclude">
              <p className="title1">Tổng cộng</p>
              <p className="price">{paperNo * paperPrice} VND</p>
            </div>
            <input type="submit" value="Thanh toán" className="transaction" />
          </form>
        </div>
      </div>
    </div>
  );
}

function BuyPrintingPaper() {
  return (
    <div className="buyPrintingPaper">
      <BuyPrintingPaperBody />
    </div>
  );
}

export default BuyPrintingPaper;
