import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

const normalizeUrl = (url) => {
  if (!url) return "";

  const trimmedUrl = url.trim();

  if (
    trimmedUrl.startsWith("http://") ||
    trimmedUrl.startsWith("https://")
  ) {
    return trimmedUrl;
  }

  return `https://${trimmedUrl}`;
};

const AddJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    status: "Applied",
    jobType: "Full-time",
    applicationDate: "",
    jobUrl: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await api.post("/jobs", {
  ...formData,
  jobUrl: normalizeUrl(formData.jobUrl),
});

      navigate("/applications");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create application"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <div className="page-header">
          <div>
            <span className="page-label">
              NEW APPLICATION
            </span>

            <h1>Add Application</h1>

            <p>
              Save a new job opportunity to your tracker.
            </p>
          </div>
        </div>

        <div className="form-card">
          {error && (
            <div className="error-message">{error}</div>
          )}

          <form
            className="job-form"
            onSubmit={handleSubmit}
          >
            <div className="form-grid">
              <div className="form-group">
                <label>Company *</label>

                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Google"
                  required
                />
              </div>

              <div className="form-group">
                <label>Job Position *</label>

                <input
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Lahore"
                />
              </div>

              <div className="form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div className="form-group">
                <label>Job Type</label>

                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                  <option>Remote</option>
                </select>
              </div>

              <div className="form-group">
                <label>Application Date</label>

                <input
                  type="date"
                  name="applicationDate"
                  value={formData.applicationDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Job URL</label>
<input
  type="text"
  name="jobUrl"
  value={formData.jobUrl}
  onChange={handleChange}
  placeholder="netsoltech.com/jobs"
/>
            </div>

            <div className="form-group">
              <label>Notes</label>

              <textarea
                name="notes"
                rows="5"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add interview details, recruiter notes..."
              ></textarea>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() =>
                  navigate("/applications")
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-action-btn"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "Save Application"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddJob;