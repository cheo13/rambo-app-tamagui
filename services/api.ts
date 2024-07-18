import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082",
});

export default api;
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://192.168.1.100:8082", // Reemplaza con la dirección IP de tu computadora
// });

// export default api;
