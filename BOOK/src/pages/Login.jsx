import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login attempted with: ${email}\n\n(This is a demo — no real login in this frontend-only build.)`);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>👋 Welcome Back</h2>
        <p className="login-subtitle">Sign in to access your wishlist & cart</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="login-options">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#" className="forgot">Forgot password?</a>
          </div>

          <button type="submit" className="login-btn">
            🔐 Sign In
          </button>
        </form>

        <div className="login-divider">OR CONTINUE WITH</div>

        <div className="social-btns">
          <button type="button" className="social-btn">
            <span>🔵</span> Continue with Google
          </button>
          <button type="button" className="social-btn">
            <span>📘</span> Continue with Facebook
          </button>
          <button type="button" className="social-btn">
            <span>💻</span> Continue with GitHub
          </button>
        </div>

        <p className="signup-text">
          Don't have an account? <Link to="/">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
