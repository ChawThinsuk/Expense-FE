import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_EXPENSE_API_URL;

const DashboardPage = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    const device_id = localStorage.getItem("authDevice_id");

    if (!token || !device_id) {
      alert("No valid token or device_id found");
      return;
    }
    
    try {
        console.log(token,device_id);
        
      const response = await axios.post(
        `${apiUrl}/auth/logoutfromdevice`,
        {
          device_id: device_id,
        },
        {
          headers: {Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      
      localStorage.removeItem("authToken");
      localStorage.removeItem("authDevice_id");

      console.log("Token:", response.data.token);
      console.log("Device_id:", response.data.device_id);

      console.log("Logged out successfully");

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        alert(`Error when logging out: ${err.response.data.message}`);
      } else {
        alert("Error when logging out");
      }
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <Link to="/createcategory">
          <button style={{ margin: "10px", width: "250px" }}>
            Create Category
          </button>
        </Link>
      </div>
      <div>
        <Link to="/createaccount">
          <button style={{ margin: "10px", width: "250px" }}>
            Create Account
          </button>
        </Link>
      </div>
      <div>
        <Link to="/createtransaction">
          <button style={{ margin: "10px", width: "250px" }}>
            Create Transaction
          </button>
        </Link>
      </div>
      <div>
        <Link to="/transaction">
          <button style={{ margin: "10px", width: "250px" }}>
            View Transaction
          </button>
        </Link>
      </div>
      <div>
        <button
          style={{ margin: "10px", width: "250px" }}
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
