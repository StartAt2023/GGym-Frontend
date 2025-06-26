import type { FC } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

interface LoginPromptProps {
  isVisible: boolean;
  onClose: () => void;
}

const LoginPrompt: FC<LoginPromptProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="login-prompt-overlay" onClick={onClose}>
      <div className="login-prompt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="login-prompt-content">
          <div className="login-prompt-icon">🔒</div>
          <h3>Please Login First</h3>
          <p>You need to be logged in to add items to your cart.</p>
          <div className="login-prompt-actions">
            <Link to="/login" className="login-prompt-btn primary" onClick={onClose}>
              Login
            </Link>
            <Link to="/register" className="login-prompt-btn secondary" onClick={onClose}>
              Register
            </Link>
            <button className="login-prompt-btn cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt; 