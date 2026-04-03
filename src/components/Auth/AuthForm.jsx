import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import styles from "./AuthForm.module.css";

export default function AuthForm({ mode }) {
  const isSignUp = mode === "signup";
  const { signIn, signUp } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (isSignUp && !form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "At least 6 characters";
    if (isSignUp && form.password !== form.confirm)
      errs.confirm = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      if (isSignUp) {
        await signUp({
          name: form.name,
          email: form.email,
          password: form.password,
        });
        addToast("Account created! Welcome 🎉", "success");
      } else {
        await signIn({ email: form.email, password: form.password });
        addToast("Welcome back!", "success");
      }
      navigate(from, { replace: true });
    } catch (err) {
      addToast(err.message, "error");
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.cardHeader}>
          <Link to="/" className={styles.logoLink}>
            <span className={styles.logoIcon}>◈</span>
            <span className={styles.logoText}>ShopVault</span>
          </Link>
          <h1 className={styles.heading}>
            {isSignUp ? "Create an account" : "Welcome back"}
          </h1>
          <p className={styles.subheading}>
            {isSignUp
              ? "Sign up to start shopping"
              : "Sign in to your account to continue"}
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {errors.general && (
            <div className={styles.alert}>{errors.general}</div>
          )}

          {isSignUp && (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                value={form.name}
                onChange={update("name")}
              />
              {errors.name && (
                <p className={styles.fieldError}>{errors.name}</p>
              )}
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="jane@example.com"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              value={form.email}
              onChange={update("email")}
            />
            {errors.email && (
              <p className={styles.fieldError}>{errors.email}</p>
            )}
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              {!isSignUp && (
                <a href="#" className={styles.forgotLink}>
                  Forgot password?
                </a>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                placeholder="••••••••"
                className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                value={form.password}
                onChange={update("password")}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? "🙈" : "👁"}
              </button>
            </div>
            {errors.password && (
              <p className={styles.fieldError}>{errors.password}</p>
            )}
          </div>

          {isSignUp && (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="confirm">
                Confirm Password
              </label>
              <input
                id="confirm"
                type={showPwd ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                className={`${styles.input} ${errors.confirm ? styles.inputError : ""}`}
                value={form.confirm}
                onChange={update("confirm")}
              />
              {errors.confirm && (
                <p className={styles.fieldError}>{errors.confirm}</p>
              )}
            </div>
          )}

          {isSignUp && (
            <p className={styles.terms}>
              By signing up, you agree to our <a href="#">Terms of Service</a>{" "}
              and <a href="#">Privacy Policy</a>.
            </p>
          )}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (
              <span className={styles.spinner} />
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className={styles.switchText}>
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Link
            to={isSignUp ? "/signin" : "/signup"}
            className={styles.switchLink}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
}
