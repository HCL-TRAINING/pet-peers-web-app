const { default: axios } = require("axios");
const { default: authHeader } = require("./auth-header");

const url = 'http://localhost:8000/';

const getPets = () => {
    return axios.get(`${url}pets`, {headers: authHeader()});
}

const buyPet = (id) => {
    return axios.patch(`${url}buy_pet/${id}`, {}, {headers: authHeader()});
}

const addPet = payload => {
    return axios.post(`${url}pet`, payload, {headers: authHeader()});
}

const petService = {
    getPets,
    buyPet,
    addPet
};

export default petService;