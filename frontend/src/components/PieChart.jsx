import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (income === 0 && expense === 0) {
    return (
      <div className="chart-card">
        <h3>Income vs Expense</h3>
        <div className="empty-state">
          <div className="empty-icon">--</div>
          <p>Add transactions to see the chart</p>
        </div>
      </div>
    );
  }

  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: [
          'rgba(0, 255, 255, 0.7)',
          'rgba(255, 107, 107, 0.7)',
        ],
        borderColor: [
          'rgba(0, 255, 255, 1)',
          'rgba(255, 107, 107, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#a0b4d0',
          font: { family: 'Inter', size: 13 },
          padding: 20,
          usePointStyle: true,
          pointStyleWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(21, 27, 84, 0.95)',
        titleFont: { family: 'Inter', size: 13 },
        bodyFont: { family: 'Inter', size: 12 },
        padding: 12,
        borderColor: 'rgba(0, 255, 255, 0.15)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const total = income + expense;
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            const value = formatCurrency(context.parsed);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    cutout: '65%',
  };

  return (
    <div className="chart-card">
      <h3>Income vs Expense</h3>
      <div className="chart-totals">
        <div className="chart-total-item">
          <span className="chart-total-label">Total Income</span>
          <span className="chart-total-value income-value">{formatCurrency(income)}</span>
        </div>
        <div className="chart-total-item">
          <span className="chart-total-label">Total Expense</span>
          <span className="chart-total-value expense-value">{formatCurrency(expense)}</span>
        </div>
      </div>
      <div className="chart-container">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
