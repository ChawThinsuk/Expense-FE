import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_EXPENSE_API_URL;
const TransactionEditPage = () => {
  const { transaction_id } = useParams();
  const [transaction, setTransaction] = useState({
    account_id: "",
    category_id: "",
    amount: "",
    date: "",
    comment: "",
    transaction_type: "",
  });
  const [newImage, setNewImage] = useState(null);
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deleteImage, setDeleteImage] = useState(false);
  const [originalTransaction, setOriginalTransaction] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${apiUrl}/transaction/gettransaction/${transaction_id}`,
          { headers }
        );

        if (response.data && response.data.results) {
          setTransaction(response.data.results);
          setOriginalTransaction(response.data.results);
        } else {
          throw new Error("No data found");
        }
      } catch (err) {
        setError("Error fetching transaction details");
        console.error(err);
      }
    };

    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${apiUrl}/account/getallaccount`, {
          headers,
        });

        if (response.data && response.data.results) {
          setAccounts(response.data.results);
        } else {
          throw new Error("No account data found");
        }
      } catch (err) {
        setError("Error fetching accounts");
        console.error(err);
      }
    };

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${apiUrl}/category/getallcategory`, {
          headers,
        });

        if (response.data && response.data.results) {
          setCategories(response.data.results);
        } else {
          throw new Error("No category data found");
        }
      } catch (err) {
        setError("Error fetching categories");
        console.error(err);
      }
    };

    fetchTransaction();
    fetchAccounts();
    fetchCategories();
  }, [transaction_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
    setDeleteImage(false);
  };

  const handleDeleteImageToggle = () => {
    setDeleteImage(!deleteImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const formData = new FormData();

      if (transaction.account_id !== originalTransaction.account_id) {
        formData.append("account_id", transaction.account_id);
      }
      if (transaction.category_id !== originalTransaction.category_id) {
        formData.append("category_id", transaction.category_id);
      }
      if (transaction.amount !== originalTransaction.amount) {
        formData.append("amount", transaction.amount);
      }
      if (transaction.date !== originalTransaction.date) {
        formData.append("date", transaction.date);
      }
      if (transaction.comment !== originalTransaction.comment) {
        formData.append("comment", transaction.comment);
      }
      if (
        transaction.transaction_type !== originalTransaction.transaction_type
      ) {
        formData.append("transaction_type", transaction.transaction_type);
      }

      if (deleteImage) {
        formData.append("deleteImage", "true");
      }
      if (newImage) {
        formData.append("image", newImage);
      }

      const response = await axios.put(
        `${apiUrl}/transaction/updatetransaction/${transaction_id}`,
        formData,
        { headers }
      );

      if (response.status === 200) {
        console.log("Update successful");
        console.log(response.data.defaults);
        navigate("/transaction-list");
      } else {
        throw new Error("Failed to update transaction");
      }
    } catch (err) {
      setError("Error updating transaction");
      console.error(err);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!transaction) {
    return <div>Loading...</div>;
  }
  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div  style={{textAlign:"center"}}>
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
      <form onSubmit={handleSubmit} style={{ margin: "15px", width: "400px" }}>
        <h2>Edit Transaction</h2>

        <label>
          Account:
          <select
            name="account_id"
            value={transaction.account_id}
            onChange={handleChange}
            style={{ margin: "15px", width: "400px" }}
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account.account_id} value={account.account_id}>
                {account.account_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Category:
          <select
            name="category_id"
            value={transaction.category_id}
            onChange={handleChange}
            style={{ margin: "15px", width: "400px" }}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            style={{ margin: "15px", width: "400px" }}
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={transaction.date.split("T")[0]}
            onChange={handleChange}
            style={{ margin: "15px", width: "400px" }}
          />
        </label>

        <label>
          Comment:
          <textarea
            name="comment"
            value={transaction.comment}
            onChange={handleChange}
            style={{ margin: "15px", width: "400px", height:"150px"}}
          />
        </label>

        <label>
          Transaction Type:
          <select
            name="transaction_type"
            value={transaction.transaction_type}
            onChange={handleChange}
            style={{ margin: "15px", width: "400px" }}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <div>
          <h5>Slip Image:</h5>
          {transaction.slip_image_url && !deleteImage && (
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center"}}>
              <img
                src={transaction.slip_image_url}
                alt="Slip Image"
                style={{ width: "400px", height: "auto", marginBottom:"20px"}}
              />
              <button type="button" onClick={handleDeleteImageToggle}  style={{ margin: "15px"}}>
                Delete Image
              </button>
            </div>
          )}

          {deleteImage && (
            <div>
              <button type="button" onClick={handleDeleteImageToggle} style={{ margin: "15px"}}>
                Cancel Delete
              </button>
            </div>
          )}

          {!transaction.slip_image_url || deleteImage ? (
            <div style={{ display:"flex",justifyContent:"center", marginBottom:"20px"}}>
              <input type="file" onChange={handleImageChange} style={{ paddingLeft: "15px"}} />
            </div>
          ) : null}
        </div>

        <button type="submit" style={{ margin: "10px", width: "400px",alignItems:"center"}}>Update Transaction</button>
      </form>
    </div>
  );
};

export default TransactionEditPage;
