import { useSelector } from "react-redux";
import Transaction from "./Transaction";

export default function Transactions() {
  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transactions
  );
  //   console.log(transactions);

  // decite what to render
  let content = null;
  if (isLoading) content = <p> Loading...</p>;
  if (isLoading && isError) content = <p>{error}</p>;
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }
  if (!isLoading && !isError && transactions.length === 0) {
    content = <p>No Transactions found!</p>;
  }

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
}
