import { useDispatch, useSelector } from "react-redux";
import { pagination } from "../features/transactions/transactionsSlice";

export default function Pagination() {
  const dispatch = useDispatch();
  const { totalCount, page } = useSelector((state) => state.transactions);

  let pageCount = Math.ceil(totalCount / 10);
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  const handlePagination = (page) => {
    dispatch(pagination(page));
  };

  return (
    <section>
      {totalCount > 10 && (
        <div style={{ display: "flex", justifyContent: "end" }}>
          {pages?.map((p) => (
            <div
              onClick={() => handlePagination(p)}
              key={p}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "30px",
                height: "30px",
                background: `${page === p ? "green" : "#9eef9e"}`,
                color: `${page === p ? "white" : "green"}`,
                margin: "5px",
                borderRadius: "10px",
              }}
            >
              {p}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
