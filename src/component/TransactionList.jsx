import React from "react";
import { Link } from 'react-router-dom';

function TransactionList({ transactions }) {
  return (
    <ul>
      {transactions.map((transaction, index) => (
        <li key={index}>
          <Link to={`/transaction/${transaction.transaction_id}`}>
            <div>
              <h4>
                {transaction.account_name} - {transaction.category_name}
              </h4>
              <p>Amount: {transaction.amount}</p>
              <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
              <p>Comment: {transaction.comment}</p>
              {transaction.slip_image_url && (
                <div>
                  <h5>Slip Image:</h5>
                  <img
                    src={transaction.slip_image_url}
                    alt="Slip Image"
                    style={{ width: "200px", height: "auto" }}
                  />
                </div>
              )}
              <p>Transaction_Type: {transaction.transaction_type}</p>
            </div>
          </Link>
          <hr />
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
