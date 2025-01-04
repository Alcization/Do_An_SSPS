import axios from 'axios'

axios.defaults.withCredentials = true
// ++++++++++++++++++++ STUDENT ++++++++++++++++++++++++
// ----------------------user
export const getUser = async () => {
  const response = await axios.get(`http://localhost:8000/v1/user/getUser`, { withCredentials: true })
  return response.data
}

export const loginUser = async (reqBody) => {
  const response = await axios.post(`http://localhost:8000/v1/user/login`, reqBody, { withCredentials: true })
  return response.data
}
export const logoutUser = async () => {
  const response = await axios.post(`http://localhost:8000/v1/user/logout`, {
    withCredentials: true
  })
  return response.data
}
export const getInFoStudent = async () => {
  const response = await axios.get(`http://localhost:8000/v1/user/getStudentInfo`, {
    withCredentials: true
  });
  return response.data
}

//-----------------document 
export const getDocumentOfUser = async () => {
  const response = await axios.get(`http://localhost:8000/v1/document/getDocumentOfUser`, { withCredentials: true })
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

// --------------cart
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
export const updateCart = async (reqBody) => {
  const response = await axios.patch(`http://localhost:8000/v1/cart/updateQuantity`, reqBody, {
    withCredentials: true
  })
  return response.data
}


// ------------order
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
export const getUrl = async (queryParams) => {
  const response = await axios.get(`http://localhost:8000/v1/order/return_url?${queryParams}`, {
    withCredentials: true
  })
  return response.data
}


// -----------------LIBRARY

export const getLibraryStructure = async () => {
  const response = await axios.get(`http://localhost:8000/v1/library/structure`, {
    withCredentials: true
  });
  return response.data;
}

export const getSubjectDocuments = async (subjectCode, filters = {}) => {
  const { documentType, semester } = filters;
  const params = {};
  if (documentType) params.documentType = documentType;
  if (semester) params.semester = semester;

  const response = await axios.get(
    `http://localhost:8000/v1/library/subject/${subjectCode}/documents`,
    {
      params,
      withCredentials: true
    }
  );
  return response.data;
}

export const getDocumentPreview = async (documentId) => {
  const response = await axios.get(
    `http://localhost:8000/v1/library/document/${documentId}/preview`,
    {
      withCredentials: true
    }
  );
  return response.data;
}




// ++++++++++++++++++++ ADMIN ++++++++++++++++++++++++

//---------------------------document  
export const getAllDocument = async () => {
  const response = await axios.get(`http://localhost:8000/v1/document`, {
    withCredentials: true
  })
  return response.data
}

// ------------------------- order

export const getAllOrders = async () => {
  const response = await axios.get(`http://localhost:8000/v1/order/getAllOrders`, {
    withCredentials: true
  })
  return response.data
}

//  -----------------------printer
export const getAllPrinters = async () => {
  const response = await axios.get(`http://localhost:8000/v1/printer`, {
    withCredentials: true
  })
  return response.data
}
export const createPrinter = async (reqBody) => {
  const response = await axios.post(`http://localhost:8000/v1/printer/create`, reqBody, {
    withCredentials: true
  })
  return response.data
}
export const updatePrinter = async (printer_id, infoStatus) => {
  let reqBody

  if (infoStatus === 'ACTIVE') {
    reqBody = { status: 'DISABLED' }
  }
  else {
    reqBody = { status: 'ACTIVE' }
  }
  console.log("reqBody", reqBody)
  const response = await axios.patch(`http://localhost:8000/v1/printer/${printer_id}`, reqBody, {
    withCredentials: true
  })
  return response.data
}
export const updateInfoPrinter = async (printer_id, reqBody) => {
  console.log("reqBody", reqBody)
  const response = await axios.patch(`http://localhost:8000/v1/printer/${printer_id}`, reqBody, {
    withCredentials: true
  })
  return response.data
}
export const deletePrinter = async (printer_id) => {
  const response = await axios.delete(`http://localhost:8000/v1/printer/${printer_id}`, {
    withCredentials: true
  })
  return response.data
}
export const getCountPrinters = async () => {
  const response = await axios.get(`http://localhost:8000/v1/printer/count`, {
    withCredentials: true
  })
  return response.data
}
//----------------------defaultPage

export const createDefaultPage = async (reqBody) => {
  console.log("reqBody", reqBody)
  const response = await axios.post(`http://localhost:8000/v1/defaultPage`, reqBody, {
    withCredentials: true
  })
  return response.data
}
export const getAllDefaultPage = async (reqBody) => {
  console.log("reqBody", reqBody)
  const response = await axios.get(`http://localhost:8000/v1/defaultPage`, {
    withCredentials: true
  })
  return response.data
}

// -------------------report
export const getReport = async (reqBody) => {
  console.log("reqBody", reqBody)
  const response = await axios.put(`http://localhost:8000/v1/report/filter`, reqBody, {
    withCredentials: true
  })
  return response.data
}

// -----------------LIBRARY
export const getAllDocumentsByAdmin = async () => {
  const response = await axios.get(
    `http://localhost:8000/v1/library/getByAdmin`,
    {
      withCredentials: true
    }
  );
  return response.data;
}
export const createDocument = async (formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/v1/library/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response?.status === 413) {
      throw new Error('File size too large. Maximum size is 50MB.');
    }
    if (error.response?.status === 415) {
      throw new Error('Invalid file type. Supported types: PDF, DOC, DOCX, TXT');
    }
    throw error;
  }
};

export const updateDocument = async (documentId, formData) => {
  console.log("formData---->", formData)
  const response = await axios.patch(
    `http://localhost:8000/v1/library/${documentId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true
    }
  );
  return response.data;
}

export const deleteDocument = async (documentId) => {
  const response = await axios.delete(
    `http://localhost:8000/v1/library/${documentId}`,
    {
      withCredentials: true
    }
  );
  return response.data;
}