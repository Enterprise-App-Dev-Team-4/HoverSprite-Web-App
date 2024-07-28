import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <SignUpPage />
    </div>
  );
}

const SignUpPage = () => {
  return (
    <div className="signup-container">
      <div className="image-section">
        <img src="/farm-yard.jpg" alt="Vineyard" />
      </div>
      <div className="form-section">
        <h1>Sign Up</h1>
        <p className="subheading">Gain full access to our services</p>
        <button className="google-btn">
          <img src="https://th.bing.com/th/id/OIP.Din44az7iZZDfbsrD1kfGQHaHa?rs=1&pid=ImgDetMain" alt="Google icon" className="icon" />
          Sign up with Google
        </button>
        <button className="facebook-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook icon" className="icon" />
          Sign up with Facebook
        </button>
        <div className="divider">
          <hr />
          <span>OR</span>
          <hr />
        </div>
        <button className="email-btn">Sign up with phone or email</button>
        <p className="terms">
          By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>, including <a href="#">cookie use</a>.
        </p>
        <p className="login">
          Already have an account? <a href="#">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default App;
