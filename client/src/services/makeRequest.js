import axios from 'axios';
export default ({
    url = '/',
    method = 'get',
    params = {},
    data = {},
    headers = {}
}) => {
    if (headers && headers.Authorization) {
        headers.Authorization = localStorage.getItem("access_token");
    }
    return axios({
        url,
        method,
        headers: {
            ...headers,
            Authorization: localStorage.getItem("access_token"),
        },
        params,
        data
    });
};
