import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionFilter from "../component/TransactionFilter";
import TransactionList from "../component/TransactionList";
import Pagination from "../component/Pagination";
const apiUrl = import.meta.env.VITE_EXPENSE_API_URL;
import { useNavigate } from "react-router-dom";

function TransactionPage() {
  const [accounts, setAccounts] = useState([]);
  const [category, setCategory] = useState([]);
  const [month, setMonth] = useState(11);
  const [year, setYear] = useState(2024);
  const [accountName, setAccountName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [transactionResults, setTransactionResults] = useState({
    results: [],
    totalCount: 0,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const buildUrl = () => {
    const baseUrl = `${apiUrl}/transaction/getfiltertransaction`;
    const params = {};

    if (categoryName) params.category_name = categoryName;
    if (accountName) params.account_name = accountName;
    if (transactionType) params.transaction_type = transactionType;
    if (month) params.month = month;
    if (year) params.year = year;
    if (pageSize) params.limit = pageSize;
    if (page) params.page = page;

    const query = new URLSearchParams(params).toString();
    return `${baseUrl}?${query}`;
  };

  const fetchTransactions = async (params) => {
    try {
      const url = buildUrl(params);
      const token = localStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`Can not fetch to ${url}`);
      }
      const data = await response.json();
      console.log("data", data);

      setTransactionResults(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("account", accountName);

    fetchCategory();
    fetchAccounts();
    fetchTransactions();
  }, [month, year, accountName, categoryName, transactionType, page, pageSize]);

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`${apiUrl}/account/getallaccount`, {
        method: "GET",
        headers: headers,
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`Can not fetch to ${apiUrl}/account/getallaccount`);
      }
      const data = await response.json();
      setAccounts(data.results);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const fetchCategory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`${apiUrl}/category/getallcategory`, {
        method: "GET",
        headers: headers,
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error(`Can not fetch to${apiUrl}/category/getallcategory`);
      }
      const data = await response.json();
      setCategory(data.results);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };
  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <button
        onClick={handleBackToDashboard}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "10px",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back to Dashboard
      </button>
      <h1 style={{ textAlign: 'center' }}>Transactions</h1>
      {error && <p>{error}</p>}

      <TransactionFilter
        month={month}
        year={year}
        accountName={accountName}
        categoryName={categoryName}
        transactionType={transactionType}
        accounts={accounts}
        category={category}
        onMonthChange={setMonth}
        onYearChange={setYear}
        onAccountNameChange={setAccountName}
        onCategoryNameChange={setCategoryName}
        onTransactionTypeChange={setTransactionType}
      />

      <TransactionList transactions={transactionResults.results} />

      <Pagination
        page={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        totalCount={
          transactionResults.pagination
            ? transactionResults.pagination.totalCount
            : 0
        }
      />
    </div>
  );
}

export default TransactionPage;
