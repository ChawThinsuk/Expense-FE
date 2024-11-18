import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './page/login';
import TransactionPage from './page/TransactionPage';
import RegisterPage from './page/RegisterPage';
import CreateTransactionPage from './page/CreateTransactionPage';
import TransactionEditPage from './page/TransactionEditPage';
import AccountPage from './page/AccountPage';
import CategoryPage from './page/CategoryPage';
import DashboardPage from './page/DashBoardPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createaccount" element={<AccountPage />} />
        <Route path="/createcategory" element={<CategoryPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/createtransaction" element={<CreateTransactionPage />} />
        <Route path="/transaction/:transaction_id" element={<TransactionEditPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;