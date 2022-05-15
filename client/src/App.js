import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/HomePage";
import TableStock from "./components/TableStock";
import TransactionForm from "./components/TransactionForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />}>
          <Route index element={<TableStock />} />
          <Route path="create-Transaction" element={<TransactionForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
