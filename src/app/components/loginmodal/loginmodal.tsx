import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './loginModal.css';

interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, handleClose }) => {
  // State for form inputs and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    // Email Validation
    if (!email.match(/(\w\.?)+@[\w\.-]+\.\w{2,4}/)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password Validation
    if (password.trim() === '') {
      setPasswordError('Password cannot be empty.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // If the form is valid, you can handle the login logic here
    if (isValid) {
      console.log('Form submitted successfully');
      handleClose(); // Close the modal after successful form submission
    }
  };
  return (
    
<Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ textAlign: 'center', width: '100%' }}>Login</Modal.Title>
      </Modal.Header>
      <form className="login_form" onSubmit={handleSubmit}>

      <Modal.Body>
          <div className="loginCalc">
            <input
              type="email"
              placeholder="Enter your email"
              pattern="(\w\.?)+@[\w\.-]+\.\w{2,4}"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="error-message">{emailError}</div>}
            <br />

            <input
              placeholder="Enter your Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div><br />
          <div className="footerButton">
          <Button variant="success"  type="submit">
            Login
          </Button>
          <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
          </div>
        
      </Modal.Body>
      </form>

     

    </Modal>

  );
}

export default LoginModal;
