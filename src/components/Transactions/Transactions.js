import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTransactions } from "../../features/transactions/transactionsSlice";
import Transaction from "./Transaction";

export default function Transactions() {
  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transactions
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransactions({ type: "", search: "" }));
  }, [dispatch]);

  // console.log(transactions);

  // decite what to render
  let content = null;
  if (isLoading) content = <p> Loading...</p>;
  if (isLoading && isError) content = <p>{error}</p>;
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions
      .slice(0, 5)
      .map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ));
  }
  if (!isLoading && !isError && transactions.length === 0) {
    content = <p>No Transactions found!</p>;
  }

  const navigate = useNavigate();
  const handleViewAll = () => {
    navigate("/transactionList");
  };

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
      {transactions?.length > 5 && (
        <div style={{ paddingTop: "10px", textAlign: "end" }}>
          <button onClick={handleViewAll} className="btn view_all_btn">
            View all
          </button>
        </div>
      )}
    </>
  );
}
