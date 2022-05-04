const { default: axios } = require("axios");

const url = 'http://localhost:8000/auth/';

const register = (username, email, password) => {
    return axios.post(`${url}register`, {
        username,
        email,
        password
    });
};

const login = (email, password) => {
    return axios.post(`${url}login`, {
        email,
        password
    })
    .then(res => {
        console.log('login res', res);
        if (res.data.access_token) {
            localStorage.setItem('user', JSON.stringify(res.data));
        }
        return res.data;
    })
}

const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout
};

export default authService;