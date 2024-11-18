import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_EXPENSE_API_URL;

const CreateTransactionPage = () => {
  const [category, setCategory] = useState([]);
  const [account, setAccount] = useState([]);
  const [userInput, setUserInput] = useState({
    account_id: "",
    category_id: "",
    amount: "",
    date: "",
    comment: "",
    transaction_type: "",
    slip_image_url: null,
  });
  const [error, setError] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        throw new Error(`Can not fetch to ${apiUrl}/category/getallcategory`);
      }
      const data = await response.json();
      setCategory(data.results);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccount = async () => {
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
      setAccount(data.results);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchAccount();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleCategoryChange = (categoryName) => {
    setCategoryName(categoryName);
    const selectedCategory = category.find(
      (cat) => cat.category_name === categoryName
    );
    setUserInput((prevInput) => ({
      ...prevInput,
      category_id: selectedCategory?.category_id || "",
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserInput((prevInput) => ({
      ...prevInput,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("account_id", userInput.account_id);
    formData.append("category_id", userInput.category_id);
    formData.append("amount", userInput.amount);
    formData.append("date", userInput.date);
    formData.append("comment", userInput.comment);
    formData.append("transaction_type", userInput.transaction_type);
    if (userInput.image) {
      formData.append("slip_image_url", userInput.image);
    }
    try {
      const response = await axios.post(
        `${apiUrl}/transaction/createtransaction`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Transaction created successfully");
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Error when creating transaction");
      console.error(err);
    }
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
      <h1>Create Transaction</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} style={{textAlign:"center"}}>
          <label  style={{marginBottom:"15px"}}>Account:</label>
          <select
            name="account_id"
            value={userInput.account_id}
            onChange={(e) => handleChange(e)}
            style={{marginBottom:"15px"}}
          >
            <option value="">Select Account</option>
            {account.length > 0 ? (
              account.map((accountItem) => (
                <option
                  key={accountItem.account_id}
                  value={accountItem.account_id}
                >
                  {accountItem.account_name}
                </option>
              ))
            ) : (
              <option value="">Loading...</option>
            )}
          </select>

          <label  style={{marginBottom:"15px"}}>Category:</label>
          <select
            name="category_name"
            value={categoryName}
            onChange={(e) => handleCategoryChange(e.target.value)}
            style={{marginBottom:"15px"}}
          >
            <option value="">Select Category</option>
            {category.length > 0 ? (
              category.map((categoryItem) => (
                <option
                  key={categoryItem.category_id}
                  value={categoryItem.category_name}
                >
                  {categoryItem.category_name}
                </option>
              ))
            ) : (
              <option value="">Loading...</option>
            )}
          </select>

          <label  style={{marginBottom:"15px"}}>Amount:</label>
          <input
            type="number"
            name="amount"
            value={userInput.amount}
            onChange={handleChange}
            placeholder="Amount"
            style={{marginBottom:"15px"}}
          />

          <label  style={{marginBottom:"15px"}}>Date:</label>
          <input
            type="date"
            name="date"
            value={userInput.date}
            onChange={handleChange}
            style={{marginBottom:"15px"}}
          />

          <label  style={{marginBottom:"15px"}}>Comment:</label>
          <input
            type="text"
            name="comment"
            value={userInput.comment}
            onChange={handleChange}
            placeholder="Add a comment"
            style={{marginBottom:"15px"}}
          />

          <label  style={{marginBottom:"15px"}}>Transaction Type:</label>
          <select
            name="transaction_type"
            value={userInput.transaction_type}
            onChange={handleChange}
            style={{marginBottom:"15px"}}
          >
            <option value="">Select Transaction Type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <label  style={{marginBottom:"15px"}}>Upload Image (optional):</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            style={{marginBottom:"15px"}}
          />

          <button type="submit">Create Transaction</button>

          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default CreateTransactionPage;
