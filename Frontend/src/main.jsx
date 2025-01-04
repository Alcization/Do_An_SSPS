import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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

import PaymentStatus from './pages/layout/student/components/paymentStatus.jsx';
import StudentHome from './pages/layout/student/components/home.jsx';
import UploadFile from './pages/layout/student/components/uploadFiles.jsx';
import ConfirmPrinting from './pages/layout/student/components/confirmPrinting.jsx';
import BuyPrintingPaper from './pages/layout/student/components/buyPrintingPaper.jsx';
import PrintingLog from './pages/layout/blank/PrintingLog/myTable.jsx';
import StudentAccount from './pages/layout/blank/StudentAccount/studentAccount.jsx';
import Library from './pages/layout/blank/Library/library.jsx';
import WatchDocument from './pages/layout/blank/Library/watchDocument.jsx';
// import for admin pages
import Admin from './pages/layout/admin/Admin.jsx';

import AdminHome from './pages/admin/admin_home/admin_home.jsx';
import PrinterStatus from './pages/admin/printer_operation_status/printer_status.jsx';
import PrinterInfo from './pages/admin/printer_info/printer_info.jsx';
import PrinterDetail from './pages/admin/printer_info/printer_detail.jsx';
import AddPrinter from './pages/admin/printer_info/add_printer.jsx';
import UpdatePrinter from './pages/admin/printer_info/update_printer.jsx';

import Report from './pages/layout/student/components/admin/report.jsx'
import Allocation from "./pages/layout/student/components/admin/allocation.jsx";
import AddCalendar from "./pages/layout/student/components/admin/addCalendar.jsx";
import FileType from "./pages/layout/student/components/admin/fileType.jsx";


import AdminPrintHis from './pages/layout/admin/AdminPrintHis/AdminPrintHis.jsx';
import AdminPayment from './pages/layout/admin/AdminPayment/AdminPayment.jsx';
import AdminLibrary from './pages/layout/admin/AdminLibrary/AdminLibrary.jsx';
import AddDocumnet from './pages/layout/admin/AdminLibrary/AddDocument.jsx';
import UpdateDocumnet from './pages/layout/admin/AdminLibrary/UpdateDocument';
import AddUser from './pages/layout/admin/AdminUser/AddUser';
import AdminListUser from './pages/layout/admin/AdminUser/AdminListUser';
import UpdateUser from './pages/layout/admin/AdminUser/UpdateUser.jsx';
import PrivateRoute from './pages/privateRoute.jsx';
import PrivateRouteAdmin from './pages/privateRouteAdmin.jsx';


//api
import { getUser } from './api/index.js';

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true); // Trạng thái chờ
  // Kiểm tra hoặc đặt giá trị `user` từ API, localStorage, hoặc state management.
  React.useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        const result = await getUser(); // Chờ hàm getUser() trả về kết quả
        // const result = await logoutUser()
        console.log(result); // In kết quả
        if (result) {
          setUser(result.metaData); // Lưu thông tin user
        }
      } catch (error) {
        // ở đây nên làm cái allert error message
        // alert(error.message);
        console.error('Error fetching user:', error.message);
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };
    fetchUser();
    // setLoading(false);
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Hiển thị màn hình loading trong khi chờ
  }
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
          element: <Login user = {user}/>,
        },
        {
          path: 'student',
          // element: <Student />,
          element: (
            <PrivateRoute user={user}>
              <Student />
            </PrivateRoute>
            // <Student />
          ),
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
              path: 'payment_status',
              element: <PaymentStatus/> ,
            },
            {
              path: 'printingLog',
              element: <PrintingLog />,
            },
            {
              path: 'student_account',
              element: <StudentAccount />
            },
            {
              path: 'library',
              element: <Library />
            },
            {
              path: 'watch_document',
              element: <WatchDocument />
            }
          ]
        },
        {
          path: 'admin',
          // element: <Admin />,
          element: (
            <PrivateRouteAdmin user={user}>
              <Admin />
            </PrivateRouteAdmin>
          ),
          children: [
            {
              path: 'admin_home',
              element: <AdminHome />,
            },
            {
              path: 'printer_status',
              element: <PrinterStatus />,
            },
            {
              path: 'printer_info',
              element: <PrinterInfo />,
            },
            {
              path: 'add_printer',
              element: <AddPrinter />,
            },
            {
              path: 'update_printer',
              element: <UpdatePrinter />,
            },
            {
              path: 'printer_detail',
              element: <PrinterDetail />,
            },
            {
              path: 'allocation',
              element: <Allocation />,
            },
            {
              path: 'add_calendar',
              element: <AddCalendar />,
            },
            {
              path: 'file_type',
              element: <FileType />,
            },
            {
              path: 'report',
              element: <Report />,
            },
            {
              path: 'history',
              element: <AdminPrintHis />
            },
            {
              path: 'admin_payment',
              element: <AdminPayment />
            },
            {
              path: 'library',
              element: <AdminLibrary />,
  
            },
            {
              path: 'library/add_document',
              element: <AddDocumnet />,
            },
            {
              path: 'library/update_document',
              element: <UpdateDocumnet />,
            },
            {
              path: 'users',
              element: <AdminListUser />,
            },
            {
              path: 'add_user',
              element: <AddUser />,
            },
            {
              path: 'update_user',
              element: <UpdateUser />,
            }
          ]
        }
      ],
    },
  
  ]);
  return (
    //<React.StrictMode>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    //</React.StrictMode>
  );
};
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
// ReactDOM.createRoot(document.getElementById('root')).render(
  
//   <React.StrictMode>
//     <HelmetProvider>
//       <RouterProvider router={router} />
//     </HelmetProvider>
//   </React.StrictMode>
// )
