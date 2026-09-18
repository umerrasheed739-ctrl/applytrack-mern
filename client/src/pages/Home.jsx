import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiBarChart2,
} from "react-icons/fi";

const Home = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-logo">
          <div className="brand-icon">A</div>
          <span>ApplyTrack</span>
        </div>

        <div className="landing-actions">
          <Link to="/login" className="nav-login-btn">
            Login
          </Link>

          <Link to="/register" className="nav-register-btn">
            Get Started
          </Link>
        </div>
      </header>

      <main className="hero-section">
        <div className="hero-left">
          <span className="hero-badge">
            JOB APPLICATION TRACKER
          </span>

          <h1>
            Stay organized.
            <br />
            Track every opportunity.
          </h1>

          <p>
            Manage job applications, monitor interview progress,
            track offers, and keep your entire job search in one
            simple dashboard.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="hero-primary-btn">
              Start Tracking
              <FiArrowRight />
            </Link>

            <Link to="/login" className="hero-secondary-btn">
              Sign In
            </Link>
          </div>

          <div className="hero-trust">
            <span>✓ Secure account</span>
            <span>✓ Private applications</span>
            <span>✓ Simple job tracking</span>
          </div>
        </div>

        <div className="hero-right">
          <div className="dashboard-preview">
            <div className="preview-top">
              <div>
                <span>Overview</span>
                <h3>Your Job Search</h3>
              </div>

              <div className="preview-avatar">U</div>
            </div>

            <div className="preview-stats">
              <div className="preview-stat-card">
                <div className="preview-icon">
                  <FiBriefcase />
                </div>

                <div>
                  <span>Total</span>
                  <strong>12</strong>
                </div>
              </div>

              <div className="preview-stat-card">
                <div className="preview-icon">
                  <FiCheckCircle />
                </div>

                <div>
                  <span>Interviews</span>
                  <strong>4</strong>
                </div>
              </div>

              <div className="preview-stat-card">
                <div className="preview-icon">
                  <FiBarChart2 />
                </div>

                <div>
                  <span>Offers</span>
                  <strong>2</strong>
                </div>
              </div>
            </div>

            <div className="preview-list">
              <div className="preview-job">
                <div className="company-avatar">G</div>

                <div>
                  <strong>Frontend Developer</strong>
                  <span>Google</span>
                </div>

                <span className="status-badge interview">
                  Interview
                </span>
              </div>

              <div className="preview-job">
                <div className="company-avatar">M</div>

                <div>
                  <strong>React Developer</strong>
                  <span>Microsoft</span>
                </div>

                <span className="status-badge applied">
                  Applied
                </span>
              </div>

              <div className="preview-job">
                <div className="company-avatar">S</div>

                <div>
                  <strong>Software Engineer</strong>
                  <span>Stripe</span>
                </div>

                <span className="status-badge offer">
                  Offer
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="landing-features">
        <div className="feature-box">
          <FiBriefcase />

          <h3>Track Applications</h3>

          <p>
            Keep every company, role, date, and job status organized.
          </p>
        </div>

        <div className="feature-box">
          <FiCheckCircle />

          <h3>Monitor Progress</h3>

          <p>
            Move applications from applied to interview, offer,
            or rejected.
          </p>
        </div>

        <div className="feature-box">
          <FiBarChart2 />

          <h3>See Your Progress</h3>

          <p>
            View useful dashboard statistics and recent applications.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;