import axios from "axios";

axios.defaults.baseURL = 'https://moonshot-api-ff76437bf02f.herokuapp.com/'
axios.defaults.headers.post['Content Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true