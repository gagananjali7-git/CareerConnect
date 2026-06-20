import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback("");

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const payload = mode === "login" ? { email, password } : { name, email, password };
      const response = await API.post(endpoint, payload);

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }
      if (response.data?.user?.name) {
        localStorage.setItem("userName", response.data.user.name);
      }

      navigate("/courses");
    } catch (err) {
      setFeedback(
        err.response?.data?.message || "Server is not running. Start the backend and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const enterCourses = () => {
    localStorage.setItem("token", "demo-token");
    if (!localStorage.getItem("userName")) {
      localStorage.setItem("userName", "Student");
    }
    navigate("/courses");
  };

  return (
    <div className="screen auth-screen">
      <div className="auth-wrap simple-shell">
        <section className="simple-hero panel">
          <span className="eyebrow">CareerConnect</span>
          <h1 className="simple-title">Login, register, then enter the courses page.</h1>
          <p className="simple-lead">
            Use one clean first page for account access. After that, go to the second page to
            browse courses, profile details, and available internships.
          </p>

          <div className="simple-points">
            <div className="simple-point">
              <strong>1. Login or register</strong>
              <span>Create your account or sign in from this page.</span>
            </div>
            <div className="simple-point">
              <strong>2. Enter courses</strong>
              <span>Move to the second page with one clear button.</span>
            </div>
            <div className="simple-point">
              <strong>3. Apply and track</strong>
              <span>Use the dashboard buttons for profile, courses, and available roles.</span>
            </div>
          </div>

          <button className="btn simple-enter" type="button" onClick={enterCourses}>
            Enter courses
          </button>
        </section>

        <section className="simple-auth panel">
          <div className="simple-tabs">
            <button
              className={`simple-tab ${mode === "login" ? "is-active" : ""}`}
              type="button"
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              className={`simple-tab ${mode === "register" ? "is-active" : ""}`}
              type="button"
              onClick={() => setMode("register")}
            >
              Register
            </button>
          </div>

          <form className="simple-form" onSubmit={handleSubmit}>
            {mode === "register" && (
              <input
                className="field"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              className="field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="field"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
            </button>
          </form>

          {feedback && <div className="feedback feedback--error">{feedback}</div>}

          <div className="simple-note">
            <span>{mode === "login" ? "New student? Switch to Register." : "Already have an account? Switch to Login."}</span>
          </div>
        </section>
      </div>
    </div>
  );
}
