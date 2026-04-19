import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getTransactions as fetchTransactions,
  addTransaction as createTransaction,
  deleteTransaction as removeTransaction,
} from '../services/api';
import Summary from '../components/Summary';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import { auth } from '../firebase';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch transactions from Firestore
  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);

      // Wait for Firebase auth to be ready
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const response = await fetchTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Small delay to ensure Firebase auth.currentUser is populated
      const timer = setTimeout(() => {
        loadTransactions();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, loadTransactions]);

  // Add a new transaction — OPTIMISTIC UPDATE (instant UI)
  const handleAddTransaction = async (transactionData) => {
    const tempId = 'temp_' + Date.now();
    const optimisticTransaction = {
      _id: tempId,
      ...transactionData,
      createdAt: new Date().toISOString(),
    };

    // Instantly add to UI
    setTransactions((prev) => [optimisticTransaction, ...prev]);

    // Save to Firebase in background
    try {
      const response = await createTransaction(transactionData);
      setTransactions((prev) =>
        prev.map((t) => (t._id === tempId ? response.data : t))
      );
    } catch (error) {
      setTransactions((prev) => prev.filter((t) => t._id !== tempId));
      throw error;
    }
  };

  // Delete a transaction — OPTIMISTIC UPDATE (instant UI)
  const handleDeleteTransaction = async (id) => {
    const previousTransactions = transactions;
    setTransactions((prev) => prev.filter((t) => t._id !== id));

    try {
      await removeTransaction(id);
    } catch (error) {
      setTransactions(previousTransactions);
      console.error('Failed to delete transaction:', error);
    }
  };

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.name}! Here's your financial overview.</p>
      </div>

      {/* Summary Cards */}
      <Summary transactions={transactions} />

      {/* Charts */}
      <div className="charts-grid">
        <PieChart transactions={transactions} />
        <BarChart transactions={transactions} />
      </div>

      {/* Form + List Grid */}
      <div className="dashboard-grid">
        <TransactionForm onAddTransaction={handleAddTransaction} />
        <TransactionList
          transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </div>
    </div>
  );
};

export default Dashboard;
