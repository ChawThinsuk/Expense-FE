import React from "react";

function TransactionFilter({
  month,
  year,
  accountName,
  categoryName,
  transactionType,
  accounts,
  category,
  onMonthChange,
  onYearChange,
  onAccountNameChange,
  onCategoryNameChange,
  onTransactionTypeChange,
}) {
  return (
    <div>
        <h2  style={{ textAlign: 'center' }}>Select Filter</h2>

    <div style={{ display:"flex",alignItems:"center"}}>
      
      <label  style={{ marginRight:"10px"}}>Month:</label>
      <input
        type="number"
        value={month}
        onChange={(e) => onMonthChange(Number(e.target.value))}
        style={{ marginRight:"10px"}}
      />
      <label style={{ marginRight:"10px"}}>Year:</label>
      <input
        type="number"
        value={year}
        onChange={(e) => onYearChange(Number(e.target.value))}
        style={{ marginRight:"10px"}}
      />

      <label style={{ marginRight:"10px"}}>Account:</label>
      <select
        value={accountName}
        onChange={(e) => onAccountNameChange(e.target.value)}
        style={{ marginRight:"10px"}}
      >
        <option value="">Select Account</option>
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <option key={account.account_id} value={account.account_name}>
              {account.account_name}
            </option>
          ))
        ) : (
          <option value="">Loading...</option>
        )}
      </select>

      <label style={{ marginRight:"10px"}}>Category:</label>
      <select
        value={categoryName}
        onChange={(e) => onCategoryNameChange(e.target.value)}
        style={{ marginRight:"10px"}}
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

      <label style={{ marginRight:"10px"}}>Transaction_Type:</label>
      <select
        value={transactionType}
        onChange={(e) => onTransactionTypeChange(e.target.value)}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
    </div>
  );
}

export default TransactionFilter;
