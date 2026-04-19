import React from 'react';

const Summary = ({ transactions }) => {
  // Calculate totals from transaction data
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="summary-grid fade-in">
      <div className="summary-card income">
        <span className="card-icon">IN</span>
        <div className="card-label">Total Income</div>
        <div className="card-value">{formatCurrency(income)}</div>
      </div>

      <div className="summary-card expense">
        <span className="card-icon">EX</span>
        <div className="card-label">Total Expense</div>
        <div className="card-value">{formatCurrency(expense)}</div>
      </div>

      <div className="summary-card balance">
        <span className="card-icon">BAL</span>
        <div className="card-label">Balance</div>
        <div className="card-value">{formatCurrency(balance)}</div>
      </div>
    </div>
  );
};

export default Summary;
