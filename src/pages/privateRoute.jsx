import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ user, children }) => {

  // Nếu đang load, hiển thị một thông báo hoặc spinner

  // Nếu không có user (chưa đăng nhập), chuyển hướng đến trang login
  return user ? children : <Navigate to="/login" />; // Nếu đã có user, hiển thị trang con (children)
};

export default PrivateRoute;