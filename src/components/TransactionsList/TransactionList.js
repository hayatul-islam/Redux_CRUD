import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transactions/transactionsSlice";
import Transaction from "../Transactions/Transaction";

export default function TransactionList() {
  const { transactions } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchTransactions({ type, search }));
  }, [dispatch, type, search]);

  const handeSearch = () => {
    setSearch(input);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="form-group radio">
          <div className="radio_group">
            <input
              required
              type="radio"
              value="income"
              name="type"
              //   checked={type === "income"}
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
              //   checked={type === "expense"}
              placeholder="Expense"
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
    </div>
  );
}
