import React from "react";
import Balance from "./Balance";
import Form from "./Form";
import Transactions from "./Transactions/Transactions";

export default function Home() {
  return (
    <div>
      <Balance />
      <Form />
      <Transactions />
    </div>
  );
}
