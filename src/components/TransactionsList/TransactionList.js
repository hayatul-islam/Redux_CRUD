import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transactions/transactionsSlice";
import Transaction from "../Transactions/Transaction";

export default function TransactionList() {
  const { transactions } = useSelector((state) => state.transactions);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransactions(type));
  }, [dispatch, type]);

  return (
    <div>
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
      {transactions.map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}
