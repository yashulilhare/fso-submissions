import axios from "axios";

const baseURl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  return axios.get(`${baseURl}/all`).then((res) => res.data);
};

export default {
  getAll,
};
