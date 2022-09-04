import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transactions/transactionsSlice";
import Pagination from "../Pagination";
import Transaction from "../Transactions/Transaction";

export default function TransactionList() {
  const { transactions, page } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchTransactions({ type, search, page }));
  }, [dispatch, type, search, page]);

  const handeSearch = () => {
    setSearch(input);
  };

  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", paddingBottom: "20px" }}
      >
        <div
          style={{ display: "flex", gap: "10px", marginRight: "20px" }}
          className="radio"
        >
          <div className="radio_group">
            <input
              required
              type="radio"
              value="all"
              name="type"
              checked={type === ""}
              onChange={(e) => setType("")}
            />
            <label>All</label>
          </div>
          <div className="radio_group">
            <input
              required
              type="radio"
              value="income"
              name="type"
              checked={type === "income"}
              onChange={(e) => setType("income")}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              required
              type="radio"
              value="expense"
              name="type"
              onChange={(e) => setType("expense")}
            />
            <label>Expense</label>
          </div>
        </div>
        <div>
          <form onClick={handeSearch}>
            <input
              type="text"
              placeholder="Search for..."
              onChange={(e) => setInput(e.target.value)}
            />
            <input
              style={{
                background: "green",
                color: "white",
                border: "2px solid green",
                cursor: "pointer",
              }}
              type="button"
              value="Search"
            />
          </form>
        </div>
      </div>
      {transactions.map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
      <Pagination />
    </div>
  );
}
