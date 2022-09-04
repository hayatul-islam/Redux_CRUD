import axios from "../../utils/axios";

export const getTransactions = async (type = "", search = "", page = 0) => {
  let queryString = "";
  let pagination = "";
  let limit = 10;

  if (type !== "") {
    queryString += `type=${type}`;
  }
  if (search !== "") {
    queryString += `&q=${search}`;
  }
  if (page > 0) {
    pagination += `&_page=${page}&_limit=${limit}`;
  }

  const response = await axios.get(`/transactions?${queryString}${pagination}`);
  const data = response.data.sort(function (a, b) {
    return b.id - a.id;
  });

  const totalCount = await axios.get(`/transactions?${queryString}`);

  return { data: data, totalCount: totalCount.data.length };
};

export const addTransaction = async (data) => {
  const response = await axios.post("/transactions", data);

  return response.data;
};

export const editTransaction = async (id, data) => {
  const response = await axios.put(`/transactions/${id}`, data);

  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`/transactions/${id}`);

  return response.data;
};
