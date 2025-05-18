import '../styles/Login.css';
import React, { useEffect, useState } from 'react';
import showIcon from '../assets/icons/show-password.png';
import hideIcon from '../assets/icons/hide-password.png';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const validateForm = (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            if (!username || !password) {
                errorMessage.textContent = 'Please fill in all fields.';
                errorMessage.classList.add('visible');
            } else {
                errorMessage.textContent = '';
                errorMessage.classList.remove('visible');
                alert('Login successful!');
            }
        };
        window.validateForm = validateForm;
    }, []);

    return (
        <div id="login-page-root"
        className="min-h-screen w-full flex items-center justify-start bg-[url('/assets/background/login-background.png')] bg-cover bg-center"
        >
        <div className="login-container">
                <form className="login-form" onSubmit={(e) => window.validateForm(e)}>
                    <h1 className="logo fitme">FitMe</h1>
                    <div className="input-group">
                        <input type="text" id="username" placeholder="Username or Email" required />
                    </div>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword((prev) => !prev)}
                            tabIndex={0}
                            style={{ outline: "none" }}
                        >
                            <img
                                src={showPassword ? hideIcon : showIcon}
                                alt={showPassword ? "Hide password" : "Show password"}
                                className="toggle-icon"
                                />
                        </span>
                    </div>
                    <button type="submit" className="login-button">Log In</button>
                    <div className="secondary-links">
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>
                    <p id="error-message" className="error-message"></p>
                </form>
            </div>
        </div>
    );
};

export default Login;