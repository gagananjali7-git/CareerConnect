import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const courseList = [
  {
    title: "Frontend Sprint",
    format: "Live cohort",
    duration: "4 weeks",
    summary: "Build a portfolio page, practice React, and get internship-ready.",
  },
  {
    title: "Data Skills Bootcamp",
    format: "Hybrid",
    duration: "6 weeks",
    summary: "SQL, dashboards, and reporting skills used in real internship interviews.",
  },
  {
    title: "AI Product Builder",
    format: "Self-paced",
    duration: "3 weeks",
    summary: "Learn prompt design and ship a small AI feature for your portfolio.",
  },
  {
    title: "Career Readiness Lab",
    format: "Workshop",
    duration: "2 weeks",
    summary: "CV review, interview prep, and application strategy for students.",
  },
];

const internshipList = [
  {
    title: "Frontend UI Internship",
    company: "Nova Labs",
    location: "Remote",
    stipend: "$800/mo",
    track: "Frontend",
  },
  {
    title: "Data Analyst Internship",
    company: "Insight Forge",
    location: "Hybrid",
    stipend: "$950/mo",
    track: "Data",
  },
  {
    title: "Product Design Internship",
    company: "Pixel Shift",
    location: "Remote",
    stipend: "$700/mo",
    track: "Design",
  },
  {
    title: "AI Engineering Internship",
    company: "Tensor Vault",
    location: "Hybrid",
    stipend: "$1200/mo",
    track: "AI",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");
  const [selectedCourse, setSelectedCourse] = useState(courseList[0]);
  const [selectedInternship, setSelectedInternship] = useState(internshipList[0]);
  const [appliedCourses, setAppliedCourses] = useState([]);
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [statusMessage, setStatusMessage] = useState("Choose a course or internship to begin.");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const userName = localStorage.getItem("userName") || "Student";
  const progress = useMemo(() => {
    return Math.min(100, 20 + appliedCourses.length * 20 + appliedInternships.length * 20);
  }, [appliedCourses.length, appliedInternships.length]);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setActiveSection("courses");
    setStatusMessage(`${course.title} selected.`);
    localStorage.setItem("selectedCourse", JSON.stringify(course));
  };

  const handleCourseApply = (course) => {
    setSelectedCourse(course);
    setAppliedCourses((current) =>
      current.includes(course.title) ? current : [...current, course.title]
    );
    setStatusMessage(`${course.title} applied successfully.`);
    localStorage.setItem("appliedCourse", JSON.stringify(course));
  };

  const handleInternshipSelect = (internship) => {
    setSelectedInternship(internship);
    setActiveSection("available");
    setStatusMessage(`${internship.title} selected.`);
    localStorage.setItem("selectedInternship", JSON.stringify(internship));
  };

  const handleInternshipApply = (internship) => {
    setSelectedInternship(internship);
    setAppliedInternships((current) =>
      current.includes(internship.title) ? current : [...current, internship.title]
    );
    setStatusMessage(`${internship.title} application saved.`);
    localStorage.setItem("appliedInternship", JSON.stringify(internship));
  };

  const launchCareer = () => {
    setActiveSection("courses");
    setStatusMessage(`Launch ready for ${userName}. Pick a course and an internship to continue.`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="screen courses-screen">
      <div className="simple-shell courses-shell">
        <header className="courses-header panel">
          <div>
            <span className="eyebrow">CareerConnect</span>
            <h1 className="simple-title">Courses and internships</h1>
            <p className="simple-lead">
              A clear student page to view your profile, select courses, and apply to available
              internships.
            </p>
          </div>

          <div className="top-actions">
            <button className={`simple-tab ${activeSection === "profile" ? "is-active" : ""}`} type="button" onClick={() => setActiveSection("profile")}>Profile</button>
            <button className={`simple-tab ${activeSection === "courses" ? "is-active" : ""}`} type="button" onClick={() => setActiveSection("courses")}>Courses</button>
            <button className={`simple-tab ${activeSection === "available" ? "is-active" : ""}`} type="button" onClick={() => setActiveSection("available")}>Available</button>
            <button className="simple-tab simple-primary" type="button" onClick={launchCareer}>Launch career</button>
            <button className="simple-tab" type="button" onClick={logout}>Logout</button>
          </div>
        </header>

        <section className="status-bar panel">
          <div>
            <div className="eyebrow">Current status</div>
            <strong className="status-text">{statusMessage}</strong>
          </div>
          <div className="mini-stat">
            <span>Progress</span>
            <strong>{progress}%</strong>
          </div>
        </section>

        {activeSection === "profile" && (
          <section className="content-grid">
            <article className="panel simple-card profile-card">
              <span className="eyebrow">Profile</span>
              <h2 className="simple-card-title">{userName}</h2>
              <p className="simple-text">Registered student profile ready for courses and internships.</p>
              <div className="profile-meter">
                <div className="profile-meter-bar" style={{ width: `${progress}%` }} />
              </div>
              <div className="profile-stats">
                <div>
                  <span>Courses applied</span>
                  <strong>{appliedCourses.length}</strong>
                </div>
                <div>
                  <span>Internships applied</span>
                  <strong>{appliedInternships.length}</strong>
                </div>
              </div>
            </article>

            <article className="panel simple-card">
              <span className="eyebrow">Selected course</span>
              <h2 className="simple-card-title">{selectedCourse.title}</h2>
              <p className="simple-text">{selectedCourse.summary}</p>
              <div className="detail-line"><span>Format</span><strong>{selectedCourse.format}</strong></div>
              <div className="detail-line"><span>Duration</span><strong>{selectedCourse.duration}</strong></div>
              <button className="btn" type="button" onClick={() => handleCourseApply(selectedCourse)}>
                Apply course
              </button>
            </article>
          </section>
        )}

        {activeSection === "courses" && (
          <section className="cards-grid">
            {courseList.map((course) => (
              <article key={course.title} className={`panel simple-card ${selectedCourse.title === course.title ? "is-selected" : ""}`}>
                <span className="badge badge--success">{course.format}</span>
                <h2 className="simple-card-title">{course.title}</h2>
                <p className="simple-text">{course.summary}</p>
                <div className="detail-line"><span>Duration</span><strong>{course.duration}</strong></div>
                <div className="button-row button-row--course">
                  <button className="btn btn--ghost" type="button" onClick={() => handleCourseSelect(course)}>
                    Select
                  </button>
                  <button className="btn" type="button" onClick={() => handleCourseApply(course)}>
                    Apply
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}

        {activeSection === "available" && (
          <section className="cards-grid">
            {internshipList.map((internship) => (
              <article key={internship.title} className={`panel simple-card ${selectedInternship.title === internship.title ? "is-selected" : ""}`}>
                <span className="badge badge--warning">{internship.track}</span>
                <h2 className="simple-card-title">{internship.title}</h2>
                <p className="simple-text">{internship.company}</p>
                <div className="detail-line"><span>Location</span><strong>{internship.location}</strong></div>
                <div className="detail-line"><span>Stipend</span><strong>{internship.stipend}</strong></div>
                <div className="button-row button-row--course">
                  <button className="btn btn--ghost" type="button" onClick={() => handleInternshipSelect(internship)}>
                    Select
                  </button>
                  <button className="btn" type="button" onClick={() => handleInternshipApply(internship)}>
                    Apply
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
