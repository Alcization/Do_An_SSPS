import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'

import Blank from './pages/layout/blank/Blank.jsx'
import Error from './pages/ErrorPage.jsx'
// import for not login pages
import Root from './pages/layout/not_login/Root.jsx'

import MainContent from './pages/not_log_in/Main/MainContent.jsx';
import AboutContent from './pages/not_log_in/About/AboutContent.jsx';
import ServiceContent from './pages/not_log_in/Service/ServiceContent.jsx';
import Login from './pages/not_log_in/Login/Login.jsx';
// import for student pages
import Student from './pages/layout/student/student.jsx';

import StudentHome from './pages/layout/student/components/home.jsx';
import UploadFile from './pages/layout/student/components/uploadFiles.jsx';
import ConfirmPrinting from './pages/layout/student/components/confirmPrinting.jsx';
import BuyPrintingPaper from './pages/layout/student/components/buyPrintingPaper.jsx';
import PrintingLog from './pages/layout/blank/PrintingLog/myTable.jsx';
import StudentAccount from './pages/layout/blank/StudentAccount/studentAccount.jsx';
import Library from './pages/layout/blank/Library/library.jsx';
import WatchDocument from './pages/layout/blank/Library/watchDocument.jsx';
// import for admin pages
import AdminHome from './pages/layout/admin/Admin.jsx';
import AdminPrintHis from './pages/layout/admin/AdminPrintHis/AdminPrintHis.jsx';
import AdminPayment from './pages/layout/admin/AdminPayment/AdminPayment.jsx';
import AdminLibrary from './pages/layout/admin/AdminLibrary/AdminLibrary.jsx';
import AddDocumnet from './pages/layout/admin/AdminLibrary/AddDocument.jsx';
import UpdateDocumnet from './pages/layout/admin/AdminLibrary/UpdateDocument';
import AddUser from './pages/layout/admin/AdminUser/AddUser';
import AdminListUser from './pages/layout/admin/AdminUser/AdminListUser';
import UpdateUser from './pages/layout/admin/AdminUser/UpdateUser.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Blank />, 
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <Root />,
        children: [
          {
            path: '',
            element: <MainContent />,
          },
          {
            path: 'aboutcontent',
            element: <AboutContent />,
          },
          {
            path: 'servicecontent',
            element: <ServiceContent />,
          }
        ]
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'student',
        element: <Student />,
        children: [
          {
            path: 'student_home',
            element: <StudentHome />,
          },
          {
            path: 'upload_file',
            element: <UploadFile />,
          },
          {
            path: 'confirm_printing',
            element: <ConfirmPrinting />,
          },
          {
            path: 'buy_printing_paper',
            element: <BuyPrintingPaper />,
          },
          {
            path: 'printingLog',
            element: <PrintingLog />,
          },
          {
            path: 'student_account',
            element: <StudentAccount/>
          },
          {
            path:'library',
            element: <Library/>
            
          },
          {
            path:'watch_document',
            element: <WatchDocument/>
          }
        ]
      },
      {
        path: 'admin_home',
        element: <AdminHome />,
        children: [
          // add admin pages here
          {
            path: 'history',
            element: <AdminPrintHis />
          },
          {
            path:'admin_payment',
            element: <AdminPayment/>
          },
          {
            path: 'library',
            element: <AdminLibrary/>,
            
          },
          {
            path: 'library/add_document',
            element: <AddDocumnet/>,
          },
          {
            path: 'library/update_document',
            element: <UpdateDocumnet/>,
          },
          {
            path: 'users',
            element: <AdminListUser/>,
          },
          {
            path: 'users/add_user',
            element: <AddUser/>,
          },
          {
            path: 'users/update_user',
            element: <UpdateUser/>,
          }

          
        ]
      },
     
    ],
  },


  
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
)
