import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import TransactionList from "./components/TransactionsList/TransactionList";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactionList" element={<TransactionList />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
