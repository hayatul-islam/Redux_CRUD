import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterType,
  searched,
} from "../../features/transactions/transactionsSlice";

export default function Header() {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [input, setInput] = useState("");

  const handeSearch = () => {
    dispatch(searched(input));
  };

  const handeSubmit = (e) => {
    e.preventDefault();
    dispatch(searched(input));
  };

  useEffect(() => {
    dispatch(filterType(type));
  }, [dispatch, type]);

  return (
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
        <form onSubmit={handeSubmit}>
          <input
            type="text"
            placeholder="Search for..."
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            onClick={handeSearch}
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
  );
}
