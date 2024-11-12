import React from "react";

import BuyPrintingPaper from "./img/BuyPrintingPaper.png";
import Library from "./img/Library.png";
import Printer from "./img/printer.png";
import PrintingHistory from "./img/PrintingHistory.png";

import { NavLink } from "react-router-dom";
import "./css/home/home.css";

function Home() {
  return (
    <div className="home container">
      <div className="Home row">
        <div className="home-block printingDocument col-md-3">
          <NavLink to="/user/uploadFiles" className="link printingDocument-nav-link">
            <img
              src={Printer}
              alt="Printer"
              className="img printingDocument-logo__img"
            />
            <p>IN TÀI LIỆU</p>
          </NavLink>
        </div>

        <div className="home-block library col-md-3">
          <NavLink to="/" className="link library-nav-link">
            <img
              src={Library}
              alt="Library"
              className="img library-logo__img"
            />
            <p>THƯ VIỆN TÀI LIỆU</p>
          </NavLink>
        </div>
        <div className="home-block buyPrintingPaper col-md-3">
          <NavLink
            to="/user/buyPrintingPaper"
            className="link buyPrintingPaper-nav-link"
          >
            <img
              src={BuyPrintingPaper}
              alt="BuyPrintingPaper"
              className="img buyPrintingPaper-logo__img"
            />

            <p>MUA TRANG IN</p>
          </NavLink>
        </div>
        <div className="home-block printingHistory col-md-3">
          <NavLink to="/" className="link printingHistory-nav-link">
            <img
              src={PrintingHistory}
              alt="PrintingHistory"
              className="img printingHistory-logo__img"
            />
            <p>LỊCH SỬ IN ẤN</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;