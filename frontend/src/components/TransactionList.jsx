import React from 'react';

// Map categories to short text labels (no emojis)
const CATEGORY_LABELS = {
  Salary: 'SAL',
  Freelance: 'FRL',
  Investment: 'INV',
  Food: 'FD',
  Transport: 'TR',
  Shopping: 'SH',
  Entertainment: 'ENT',
  Bills: 'BIL',
  Health: 'HLT',
  Education: 'EDU',
  Rent: 'RNT',
  Other: 'OTH',
};

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  // Format date nicely
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

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
    <div className="dashboard-section transaction-list-section">
      <h3>Recent Transactions</h3>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">--</div>
          <p>No transactions yet. Add your first one above!</p>
        </div>
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction, index) => (
            <div
              key={transaction._id}
              className="transaction-item slide-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="transaction-item-left">
                <div className={`transaction-icon ${transaction.type}`}>
                  {CATEGORY_LABELS[transaction.category] || 'OTH'}
                </div>
                <div>
                  <div className="transaction-category">
                    {transaction.category}
                  </div>
                  <div className="transaction-date">
                    {formatDate(transaction.date)}
                  </div>
                </div>
              </div>

              <div className="transaction-item-right">
                <span className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => onDeleteTransaction(transaction._id)}
                  title="Delete transaction"
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
