import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content fade-in">
          <div className="hero-badge">Smart Money Management</div>
          <h1 className="hero-title">
            Take Control of Your
            <span className="gradient-text"> Finances</span>
          </h1>
          <p className="hero-subtitle">
            Track your income and expenses, visualize spending patterns with
            beautiful charts, and make smarter financial decisions — all in one place.
          </p>
          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-ghost btn-lg">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Floating Cards */}
        <div className="hero-visual fade-in">
          <div className="floating-card card-1">
            <div className="floating-card-icon income-icon">IN</div>
            <div className="floating-card-label">Income</div>
            <div className="floating-card-value income-value">+₹45,000</div>
          </div>
          <div className="floating-card card-2">
            <div className="floating-card-icon expense-icon">EX</div>
            <div className="floating-card-label">Expenses</div>
            <div className="floating-card-value expense-value">-₹12,350</div>
          </div>
          <div className="floating-card card-3">
            <div className="floating-card-icon balance-icon">BAL</div>
            <div className="floating-card-label">Balance</div>
            <div className="floating-card-value balance-value">₹32,650</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">
          Everything you need to manage money
        </h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">//</div>
            <h3>Visual Charts</h3>
            <p>
              Beautiful pie and bar charts to visualize your spending patterns
              and income distribution at a glance.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">[=]</div>
            <h3>Secure & Private</h3>
            <p>
              Your data is protected with Firebase authentication. Only you can
              access your financial information.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&gt;&gt;</div>
            <h3>Real-time Tracking</h3>
            <p>
              Add transactions instantly and see your balance update in
              real-time. No delays, no fuss.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">#</div>
            <h3>Smart Categories</h3>
            <p>
              Organize transactions by category — Food, Transport, Bills,
              Entertainment, and more.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to start tracking?</h2>
          <p>Join now and take the first step towards financial clarity.</p>
          {!isAuthenticated && (
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Free Account
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          ExpenseTracker | {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Home;
