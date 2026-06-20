import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setFeedback("");
    setIsSubmitting(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      setFeedback(res.data.message || "Login successful");
      navigate("/dashboard");
    } catch (err) {
      setFeedback(
        err.response?.data?.message ||
          "Server is not running. Start the backend and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="screen">
      <div className="login-shell">
        <div className="topbar">
          <div className="brand">
            <div className="brand-mark">CC</div>
            <div className="brand-copy">
              <strong>CareerConnect</strong>
              <span>Internship quest portal</span>
            </div>
          </div>
          <div className="nav-links">
            <span className="pill">🎮 Select</span>
            <span className="pill">⚡ Apply</span>
            <span className="pill">🏁 Launch career</span>
          </div>
        </div>

        <div className="auth-grid">
          <section className="panel panel--hero">
            <div className="halo halo--one" />
            <div className="halo halo--two" />
            <span className="eyebrow">Quest 01 · Internship selection</span>
            <h1 className="title">
              Enter the <span>internship arena</span> and build your profile.
            </h1>
            <p className="lead">
              Browse high-signal internship offers, pick the ones you want, and
              move like a player through your career path. Fast filters,
              responsive cards, and one-click actions keep the process simple.
            </p>

            <div className="stats">
              <div className="stat-card">
                <span className="stat-value">120+</span>
                <span className="stat-label">live internship offers</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">15</span>
                <span className="stat-label">skill tracks to explore</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">1 click</span>
                <span className="stat-label">from shortlist to apply</span>
              </div>
            </div>

            <div className="spotlight">
              <div className="spot-card">
                <div className="kicker">Featured path</div>
                <strong className="form-title">Frontend & Product</strong>
                <p className="form-copy">
                  Interactive internships for students who want to build real
                  interfaces, ship features, and level up fast.
                </p>
              </div>
              <div className="spot-card">
                <div className="kicker">Available now</div>
                <strong className="form-title">AI, Data & Cloud</strong>
                <p className="form-copy">
                  Technical tracks with mentorship, portfolio projects, and
                  weekly progress checkpoints.
                </p>
              </div>
            </div>
          </section>

          <section className="panel panel--form">
            <div>
              <span className="eyebrow">Login checkpoint</span>
              <h2 className="form-title">Jump back into your shortlist</h2>
              <p className="form-copy">
                Sign in to review internship matches, favorites, and submitted
                applications.
              </p>
            </div>

            <form className="form" onSubmit={handleLogin}>
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

              <div className="button-row">
                <button className="btn" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "LOADING..." : "START GAME 🚀"}
                </button>
                <button
                  className="btn btn--ghost"
                  type="button"
                  onClick={() => navigate("/register")}
                >
                  New player?
                </button>
              </div>
            </form>

            {feedback && (
              <div className="feedback feedback--error">{feedback}</div>
            )}

            <div className="form-hint">
              <span>Use your registered email to enter the internship arena.</span>
              <span>Need an account? Tap New player.</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}