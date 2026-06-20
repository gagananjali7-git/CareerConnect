import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback("");
    setFeedbackType("");

    try {
      console.log("🚀 REGISTER CLICKED");

      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log("SUCCESS:", res.data);

      setFeedback(res.data.message || "Registration successful");
      setFeedbackType("success");
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      console.log("❌ REGISTER ERROR FULL:");
      console.log(err.response?.data);
      setFeedback(
        err.response?.data?.message ||
          "Server is not running. Start the backend and try again."
      );
      setFeedbackType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="screen">
      <div className="register-shell">
        <div className="topbar">
          <div className="brand">
            <div className="brand-mark">CC</div>
            <div className="brand-copy">
              <strong>CareerConnect</strong>
              <span>Student internship network</span>
            </div>
          </div>
          <div className="nav-links">
            <span className="pill">🧩 Build profile</span>
            <span className="pill">🎯 Match internships</span>
          </div>
        </div>

        <div className="auth-grid">
          <section className="panel panel--hero">
            <div className="halo halo--one" />
            <div className="halo halo--two" />
            <span className="eyebrow">Quest 00 · Create profile</span>
            <h1 className="title">
              Join the <span>internship queue</span> and unlock the board.
            </h1>
            <p className="lead">
              Register once, then browse internships by skill, location, and
              pace. Save favorites and move toward the offers that actually fit
              your goals.
            </p>

            <div className="auth-list">
              <div className="auth-list-item">
                <div className="auth-dot" />
                <div>
                  <strong>Interactive internship cards</strong>
                  <span>
                    Select roles, compare benefits, and mark the ones you want
                    to apply for.
                  </span>
                </div>
              </div>
              <div className="auth-list-item">
                <div className="auth-dot" />
                <div>
                  <strong>Fast application pipeline</strong>
                  <span>
                    Keep your profile ready so you can move from shortlist to
                    application faster.
                  </span>
                </div>
              </div>
              <div className="auth-list-item">
                <div className="auth-dot" />
                <div>
                  <strong>Skill-based discovery</strong>
                  <span>
                    Focus on internships that match frontend, data, design,
                    marketing, or AI paths.
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="panel panel--form">
            <div>
              <span className="eyebrow">Registration checkpoint</span>
              <h2 className="form-title">Create your player profile</h2>
              <p className="form-copy">
                Enter your details once, then start exploring internships with
                the dashboard.
              </p>
            </div>

            <form className="form" onSubmit={handleRegister}>
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="field"
              />

              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field"
              />

              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field"
              />

              <button className="btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "CREATING..." : "CREATE ACCOUNT 🚀"}
              </button>
            </form>

            {feedback && (
              <div
                className={`feedback ${
                  feedbackType === "success"
                    ? "feedback--success"
                    : "feedback--error"
                }`}
              >
                {feedback}
              </div>
            )}

            <div className="switcher">
              <span>Already have an account?</span>
              <button className="link" type="button" onClick={() => navigate("/")}>
                Login
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}