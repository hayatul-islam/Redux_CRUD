import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transactions/transactionsSlice";
import Pagination from "../Pagination";
import Transaction from "../Transactions/Transaction";
import Header from "./Header";

export default function TransactionList() {
  const { transactions, page, type, search, totalCount } = useSelector(
    (state) => state.transactions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions({ type, search, page }));
  }, [dispatch, type, search, page]);

  let content = null;
  if (totalCount === 0) content = <p>No Transactions found!</p>;
  if (totalCount > 0) {
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }

  return (
    <div>
      <Header />
      {content}
      <Pagination />
    </div>
  );
}
