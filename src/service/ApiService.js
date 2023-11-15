import axios from "axios";

async function GetPatientList() {
  const data = await axios.get("http://localhost:8080/Uber_Doctor/api/v1/patient/list");
  return data.data;
}

async function GetPatientDetail(id) {
  const data = await axios.get(`http://localhost:8080/Uber_Doctor/api/v1/patient/${id}`);
  return data.data;
}

async function PutPatient(id, newData) {
  const data = await axios.put(
    `http://localhost:8080/Uber_Doctor/api/v1/update-patient/${id}`,
    newData
  );
  return data.data;
}

async function PostPatient(newData) {
  const data = await axios.post("http://localhost:8080/Uber_Doctor/api/v1/patient/create", newData);
  return data.data;
}

async function DeletePatientByID(id) {
  const data = await axios.get(`http://localhost:8080/Uber_Doctor/api/v1/delete-patient/${id}`);
  return data.data;
}
/delete-patient/;
async function PostLogin(account) {
  const data = await axios.post("http://localhost:8080/Uber_Doctor/auth/login", account);
  return data;
}

export { GetPatientList, GetPatientDetail, PutPatient, PostPatient, PostLogin, DeletePatientByID };
