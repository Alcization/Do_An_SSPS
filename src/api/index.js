import axios from 'axios'

axios.defaults.withCredentials = true
// export const create_url_payment = async (reqBody) => {
//   const response = await axios.post(`http://localhost:8000/v1/order/test2`, reqBody)
//   return response.data
// }
export const getUser = async () => {
  const response = await axios.get(`http://localhost:8000/v1/user/getUser`, { withCredentials: true })
  return response.data
}

export const loginUser = async (reqBody) => {
  const response = await axios.post(`http://localhost:8000/v1/user/login`, reqBody, { withCredentials: true })
  return response.data
}

export const getDocumentOfUser = async () => {
  const response = await axios.get(`http://localhost:8000/v1/document/getDocumentOfUser`, { withCredentials: true })
  return response.data
}
export const logoutUser = async () => {
  const response = await axios.post(`http://localhost:8000/v1/user/logout`, {
    withCredentials: true
  })
  return response.data
}

export const createCartUser = async ({
  oldQuantity = 0,
  newQuantity = 0
}) => {
  const response = await axios.post(`http://localhost:8000/v1/cart/createCart`, {
    oldQuantity: oldQuantity,
    newQuantity: newQuantity
  }, {
    withCredentials: true
  })
  return response.data
}

export const create_url_payment = async (reqBody) => {
  const response = await axios.post(`http://localhost:8000/v1/order/createPaymentUrl`, reqBody)
  return response.data
}
export const getAllOrderOfUser = async () => {
  const response = await axios.get(`http://localhost:8000/v1/order/user`, {
    withCredentials: true
  })
  return response.data
}

export const updateCart = async (reqBody) => {
  const response = await axios.patch(`http://localhost:8000/v1/cart/updateQuantity`, reqBody, {
    withCredentials: true
  })
  return response.data
}

export const getUrl = async (queryParams) => {
  const response = await axios.get(`http://localhost:8000/v1/order/return_url?${queryParams}`, {
    withCredentials: true
  })
  return response.data
}

export const generateOTPToPrint = async () => {
  const response = await axios.post(`http://localhost:8000/v1/document/generateOtpForUser`, {}, {
    withCredentials: true
  })
  return response.data
}
export const veriFyToPrint = async (formData) => {
  const response = await axios.post(`http://localhost:8000/v1/document/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true
  });
  return response.data
}
