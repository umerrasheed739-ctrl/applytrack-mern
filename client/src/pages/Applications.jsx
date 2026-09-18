import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import {
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiExternalLink,
} from "react-icons/fi";

const Applications = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      const response = await api.get("/jobs");
      setJobs(response.data);
    } catch (error) {
      setError("Unable to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/jobs/${id}`);

      setJobs((previousJobs) =>
        previousJobs.filter((job) => job._id !== id)
      );
    } catch (error) {
      alert("Unable to delete application");
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.company
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        job.position
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || job.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, status]);

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <div className="page-header">
          <div>
            <span className="page-label">
              JOB MANAGEMENT
            </span>

            <h1>Applications</h1>

            <p>
              Manage and track all your job applications.
            </p>
          </div>

          <Link to="/add-job" className="header-btn">
            + Add Application
          </Link>
        </div>

        <div className="filters-card">
          <div className="search-box">
            <FiSearch />

            <input
              type="text"
              placeholder="Search company or position..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        {loading ? (
          <Loader />
        ) : filteredJobs.length === 0 ? (
          <div className="content-card empty-state">
            <h3>No applications found</h3>
            <p>
              Try another filter or add a new application.
            </p>
          </div>
        ) : (
          <div className="applications-grid">
            {filteredJobs.map((job) => (
              <div className="job-card" key={job._id}>
                <div className="job-card-top">
                  <div className="company-avatar large">
                    {job.company
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <span
                    className={`status-badge ${job.status.toLowerCase()}`}
                  >
                    {job.status}
                  </span>
                </div>

                <h3>{job.position}</h3>

                <p className="company-name">
                  {job.company}
                </p>

                <div className="job-details">
                  <span>
                    {job.location ||
                      "No location provided"}
                  </span>

                  <span>{job.jobType}</span>

                  <span>
                    {job.applicationDate
                      ? new Date(
                          job.applicationDate
                        ).toLocaleDateString()
                      : "No date provided"}
                  </span>
                </div>

                {job.jobUrl && (
                  <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="job-link"
                  >
                    <FiExternalLink />
                    View Job Posting
                  </a>
                )}

                {job.notes && (
                  <p className="job-notes">
                    {job.notes}
                  </p>
                )}

                <div className="job-actions">
                  <Link
                    to={`/edit-job/${job._id}`}
                    className="edit-btn"
                  >
                    <FiEdit2 />
                    Edit
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteJob(job._id)
                    }
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Applications;