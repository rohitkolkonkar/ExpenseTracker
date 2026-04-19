import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const BarChart = ({ transactions }) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const monthLabel = `${MONTH_NAMES[currentMonth]} ${currentYear}`;

  // Create a slot for each day of the current month
  const dailyData = {};
  for (let day = 1; day <= daysInMonth; day++) {
    dailyData[day] = { income: 0, expense: 0 };
  }

  // Fill in transaction data for the current month
  transactions.forEach((t) => {
    const date = new Date(t.date);
    if (date.getFullYear() === currentYear && date.getMonth() === currentMonth) {
      const day = date.getDate();
      if (dailyData[day]) {
        if (t.type === 'income') {
          dailyData[day].income += t.amount;
        } else {
          dailyData[day].expense += t.amount;
        }
      }
    }
  });

  const labels = [];
  const incomeData = [];
  const expenseData = [];

  for (let day = 1; day <= daysInMonth; day++) {
    labels.push(day.toString());
    incomeData.push(dailyData[day].income);
    expenseData.push(dailyData[day].expense);
  }

  // Check if there's any data this month
  const hasData = incomeData.some((v) => v > 0) || expenseData.some((v) => v > 0);

  if (!hasData) {
    return (
      <div className="chart-card">
        <h3>{monthLabel} - Daily Trends</h3>
        <div className="empty-state">
          <div className="empty-icon">--</div>
          <p>Add transactions to see daily trends</p>
        </div>
      </div>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: 'rgba(0, 255, 255, 1)',
        backgroundColor: 'rgba(0, 255, 255, 0.06)',
        pointBackgroundColor: (ctx) => {
          return incomeData[ctx.dataIndex] > 0 ? 'rgba(0, 255, 255, 1)' : 'transparent';
        },
        pointBorderColor: (ctx) => {
          return incomeData[ctx.dataIndex] > 0 ? '#151B54' : 'transparent';
        },
        pointBorderWidth: 2,
        pointRadius: (ctx) => (incomeData[ctx.dataIndex] > 0 ? 5 : 0),
        pointHoverRadius: 8,
        tension: 0.3,
        fill: true,
        borderWidth: 2,
      },
      {
        label: 'Expense',
        data: expenseData,
        borderColor: 'rgba(255, 107, 107, 1)',
        backgroundColor: 'rgba(255, 107, 107, 0.06)',
        pointBackgroundColor: (ctx) => {
          return expenseData[ctx.dataIndex] > 0 ? 'rgba(255, 107, 107, 1)' : 'transparent';
        },
        pointBorderColor: (ctx) => {
          return expenseData[ctx.dataIndex] > 0 ? '#151B54' : 'transparent';
        },
        pointBorderWidth: 2,
        pointRadius: (ctx) => (expenseData[ctx.dataIndex] > 0 ? 5 : 0),
        pointHoverRadius: 8,
        tension: 0.3,
        fill: true,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#a0b4d0',
          font: { family: 'Inter', size: 12 },
          padding: 15,
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
          title: (items) => `Day ${items[0].label}, ${monthLabel}`,
          label: (context) => {
            if (context.parsed.y === 0) return null;
            const value = new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              minimumFractionDigits: 0,
            }).format(context.parsed.y);
            return `${context.dataset.label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6580a0',
          font: { family: 'Inter', size: 10 },
          maxRotation: 0,
          // Show every 5th day label to avoid clutter
          callback: function (value, index) {
            const day = index + 1;
            if (day === 1 || day % 5 === 0 || day === daysInMonth) {
              return day;
            }
            return '';
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 255, 255, 0.04)',
        },
        ticks: {
          color: '#6580a0',
          font: { family: 'Inter', size: 11 },
          callback: (value) => 'Rs.' + value.toLocaleString('en-IN'),
        },
        border: {
          display: false,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-card">
      <h3>{monthLabel} - Daily Trends</h3>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
