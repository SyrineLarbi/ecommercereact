import axios from "axios"; // module pr la consommation d'API
export default axios.create({
    baseURL: "http://localhost:3000" //url backend
})