import React, { useState, useEffect } from "react";
import {useLocation, useNavigate} from 'react-router-dom';

function paymentStatus() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Add variables needed from query params here
  const vnp_Amount = queryParams.get('vnp_Amount');
  const vnp_Command = queryParams.get('vnp_Command');


  useEffect(() => {
    console.log('ID from query params:', vnp_Amount);
    console.log('ID from query params:', vnp_Command);
  }, [vnp_Amount]);

  return (
    <div className="d-flex justify-content-center"> 
      <h1>Thanh toán thành công</h1>
    </div>
  );
}
export default paymentStatus;