import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuthStore } from "../store/useAuthStore";
import "./LoginModal.css";
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";

const LoginModal = () => {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const loginModalOpen = useAuthStore((state) => state.loginModalOpen);
  const setLoginModalOpen = useAuthStore((state) => state.setLoginModalOpen);
  const setError = useAuthStore((state) => state.setError); 

  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (loginModalOpen) {
      setError(null);
    }
  }, [loginModalOpen, setError]);

  const handleClose = () => {
    setLoginModalOpen(false);
    setEmail("");
    setPassword("");
    setError(null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    try {
      await login(email, password, role);
      handleClose();
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <Modal show={loginModalOpen} onHide={handleClose} centered dialogClassName="login-modal">
      <Modal.Body>
        <div className="login-header">
          <button
            className={`role-btn ${role === "customer" ? "active" : ""}`}
            onClick={() => setRole("customer")}
          >
            User
          </button>
          <button
            className={`role-btn ${role === "barber" ? "active" : ""}`}
            onClick={() => setRole("barber")}
          >
            Barber
          </button>
        </div>

        <h4 className="text-center mb-4 mt-2">Login</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" className="login-btn w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        {error && <div className="text-danger text-center mt-2">{error}</div>}

        <div className="text-center mt-4 text-muted">or use a social network</div>
        <div className="social-icons text-center my-3">
          <FaGoogle />
          <FaTwitter />
          <FaFacebookF />
        </div>

        <div className="text-center mt-3">
          <span className="text-muted">Not a member yet? </span>
          <a href="/auth/signup" className="signup-link">Sign Up.</a>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
