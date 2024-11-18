import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_EXPENSE_API_URL;

const CategoryPage = () => {
  const [categoryNameInput, setCategoryNameInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategoryNameInput(e.target.value);
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
        `${apiUrl}/category/createcategory`,
        {
          category_name: categoryNameInput,
        },
        {
          headers: headers,
        }
      );

      if (response.status === 200) {
        console.log("Create Category successful");
        navigate("/login");
      } else {
        setError(`Error when Create Category: ${response.data.message}`);
      }
    } catch (err) {
      if (err.response) {
        setError(`Error when Create Category: ${err.response.data.message}`);
      } else {
        setError("Error when Create Category");
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
        name="Category_name"
        placeholder="Category Name"
        value={categoryNameInput}
        onChange={handleChange}
        style={{margin:"10px"}}
      />
      <button type="submit"  style={{ margin: "10px", width: "400px" }}>Add Category Name</button>
      {error && <p>{error}</p>}
    </form>
    </div>
  );
};

export default CategoryPage;
