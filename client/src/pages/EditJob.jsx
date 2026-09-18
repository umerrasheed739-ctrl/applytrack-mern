import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

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

const EditJob = () => {
  const { id } = useParams();
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

  const [pageLoading, setPageLoading] =
    useState(true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(
          `/jobs/${id}`
        );

        const job = response.data;

        setFormData({
          company: job.company || "",
          position: job.position || "",
          location: job.location || "",
          status: job.status || "Applied",
          jobType: job.jobType || "Full-time",
          applicationDate:
            job.applicationDate?.split("T")[0] ||
            "",
          jobUrl: job.jobUrl || "",
          notes: job.notes || "",
        });
      } catch (error) {
        setError("Unable to load application");
      } finally {
        setPageLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await api.put(`/jobs/${id}`, {
  ...formData,
  jobUrl: normalizeUrl(formData.jobUrl),
});

      navigate("/applications");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update application"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <div className="page-header">
          <div>
            <span className="page-label">
              APPLICATION DETAILS
            </span>

            <h1>Edit Application</h1>

            <p>
              Update your job application information.
            </p>
          </div>
        </div>

        {pageLoading ? (
          <Loader />
        ) : (
          <div className="form-card">
            {error && (
              <div className="error-message">
                {error}
              </div>
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
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Position *</label>

                  <input
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>

                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
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
                    value={
                      formData.applicationDate
                    }
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
                />
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
                  className="primary-action-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Updating..."
                    : "Update Application"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default EditJob;