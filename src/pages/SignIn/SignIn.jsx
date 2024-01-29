import React, { useState } from 'react';
import './SignIn.css';
import Logo from './../../assets/logo.png';
import GoogleLogo from './../../assets/google.png';
import AppleLogo from './../../assets/apple.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const handleGoogleSignIn = () => {
        console.log('Signing in with Google');
    };

    const handleAppleSignIn = () => {
        console.log('Signing in with Apple');
    };

    return (
        <>
            <div className='sigin-page'>
                <div className='sign-in-deco'>
                    <img src={Logo} alt='logo' />
                    <h1>BASE</h1>
                    <div className='social-links'>
                        <FontAwesomeIcon className='link' icon={faGithub} />
                        <FontAwesomeIcon className='link' icon={faTwitter} />
                        <FontAwesomeIcon className='link' icon={faLinkedin} />
                        <FontAwesomeIcon className='link' icon={faDiscord} />
                    </div>
                </div>
                <div className='signin-info'>
                    <h1>Sign In</h1>
                    <p>Sign in to your account</p>
                    <div className='third-party-signin-button'>
                        <button onClick={handleGoogleSignIn}> <img className='brand-logo' src={GoogleLogo}/> Sign In with Google</button>
                        <button onClick={handleAppleSignIn}> <img className='brand-logo' src={AppleLogo} /> Sign In with Apple</button>
                    </div>
                    <form className='signin-form' onSubmit={handleFormSubmit}>
                        <label>
                            Email address
                        <br />
                            <input className='input-field' type="email" value={email} onChange={handleEmailChange} />
                        </label>
                        <br />
                        <label>
                            Password
                        <br />
                            <input className='input-field' type="password" value={password} onChange={handlePasswordChange} />
                        </label>
                        <br />
                        <a href='#'>Forgot Password?</a>
                        <button className='signin-button' type="submit">Sign In</button>
                    </form>
                    <p className='register'>Don't have an account? <a href='#'>Register here</a></p>
                </div>
            </div>
        </>
    );
};

export default SignIn;
