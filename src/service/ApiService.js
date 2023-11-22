import axios from "axios";

async function GetPatientList() {
  const data = await axios.get("http://localhost:8080/api/v1/patient/list");
  return data.data;
}

async function GetPatientDetail(id) {
  const data = await axios.get(`http://localhost:8080/api/v1/patient/${id}`);
  return data.data;
}

async function PutPatient(id, newData) {
  const data = await axios.put(`http://localhost:8080/api/v1/update-patient/${id}`, newData);
  return data.data;
}

async function PostPatient(newData) {
  const data = await axios.post("http://localhost:8080/api/v1/patient/create", newData);
  return data.data;
}

async function DeletePatientByID(id) {
  const data = await axios.get(`http://localhost:8080/api/v1/delete-patient/${id}`);
  return data.data;
}

async function PostLogin(account) {
  const data = await axios.post("http://localhost:8080/auth/login", account);
  return data;
}

//Booking =========================================================
async function GetBookingList() {
  const data = await axios.get("http://localhost:8080/api/v1/booking/list");
  return data.data;
}

async function GetBookingDetail(id) {
  const data = await axios.get(`http://localhost:8080/api/v1/booking/${id}`);
  return data.data;
}

async function PutBooking(id, newData) {
  try {
    console.log("reqestdata", newData);
    const data = await axios.put(`http://localhost:8080/api/v1/booking/update/${id}`, newData);
    return data.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
}


async function PostBooking(newData) {
  const data = await axios.post("http://localhost:8080/api/v1/booking/create", newData);
  return data.data;
}

async function DeleteBookingByID(id) {
  const data = await axios.get(`http://localhost:8080/api/v1/booking/delete/${id}`);
  return data.data;
}
export {
  GetPatientList,
  GetPatientDetail,
  PutPatient,
  PostPatient,
  PostLogin,
  DeletePatientByID,
  GetBookingList,
  GetBookingDetail,
  PostBooking,
  PutBooking,
  DeleteBookingByID,
};
