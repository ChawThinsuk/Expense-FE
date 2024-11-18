import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_EXPENSE_API_URL;
const AccountPage = () => {
  const [accountNameInput, setAccountNameInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAccountNameInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(
        `${apiUrl}/account/createaccount`,
        {
          account_name: accountNameInput,
        },
        {
          headers: headers,
        }
      );

      if (response.status === 200) {
        console.log("Create Account successful");
        navigate("/dashboard");
      } else {
        setError(`Error when Create Account: ${response.data.message}`);
      }
    } catch (err) {
      if (err.response) {
        setError(`Error when Create Account: ${err.response.data.message}`);
      } else {
        setError("Error when Create Account");
      }
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="account_name"
          placeholder="Account Name"
          value={accountNameInput}
          onChange={handleChange}
          style={{margin:"10px"}}
        />
        <button type="submit" style={{ margin: "10px", width: "400px" }}>Add Account Name</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default AccountPage;
