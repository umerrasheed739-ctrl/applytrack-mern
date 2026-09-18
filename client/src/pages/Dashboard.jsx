import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import {
  FiBriefcase,
  FiSend,
  FiUsers,
  FiAward,
} from "react-icons/fi";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      const response = await api.get("/jobs");
      setJobs(response.data);
    } catch (error) {
      setError("Unable to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const total = jobs.length;

  const applied = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviews = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offers = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <div className="page-header">
          <div>
            <span className="page-label">OVERVIEW</span>
            <h1>Dashboard</h1>

            <p>
              Monitor your job search and application progress.
            </p>
          </div>

          <Link to="/add-job" className="header-btn">
            + Add Application
          </Link>
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <FiBriefcase />
                </div>

                <div>
                  <span>Total Applications</span>
                  <h2>{total}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <FiSend />
                </div>

                <div>
                  <span>Applied</span>
                  <h2>{applied}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <FiUsers />
                </div>

                <div>
                  <span>Interviews</span>
                  <h2>{interviews}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <FiAward />
                </div>

                <div>
                  <span>Offers</span>
                  <h2>{offers}</h2>
                </div>
              </div>
            </div>

            <section className="content-card">
              <div className="section-header">
                <div>
                  <h2>Recent Applications</h2>
                  <p>Your latest job applications.</p>
                </div>

                <Link to="/applications">
                  View all
                </Link>
              </div>

              {jobs.length === 0 ? (
                <div className="empty-state">
                  <h3>No applications yet</h3>

                  <p>
                    Add your first job application to start
                    tracking your progress.
                  </p>

                  <Link
                    to="/add-job"
                    className="primary-small-btn"
                  >
                    Add Application
                  </Link>
                </div>
              ) : (
                <div className="job-list">
                  {jobs.slice(0, 5).map((job) => (
                    <div
                      className="dashboard-job-row"
                      key={job._id}
                    >
                      <div className="company-avatar">
                        {job.company
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="job-main-info">
                        <strong>{job.position}</strong>
                        <span>{job.company}</span>
                      </div>

                      <span
                        className={`status-badge ${job.status.toLowerCase()}`}
                      >
                        {job.status}
                      </span>

                      <span className="job-location">
                        {job.location ||
                          "Location not specified"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;