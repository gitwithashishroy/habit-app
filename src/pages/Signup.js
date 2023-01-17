import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signupUser } from '../redux/action/authAction';
import styles from '../styles/login.module.css';



const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);
  const dispatch = useDispatch() ; 

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);

    let error = false;
    if (!name || !email || !phone || !password || !confirmPassword) {
      toast('Please fill all the fields');
      error = true;
    }

    if (password !== confirmPassword) {
      toast('Make sure password and confirm password matches');
      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }
   
    await dispatch(signupUser(name, email, phone , password, confirmPassword));

    setSigningUp(false);
  };

  // if(auth.loggedIn === true){
  //   return <Navigate to="/login" />
  // }

  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className={styles.field}>
        <input
          placeholder="Your Phone"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className={styles.field}>
        <input
          placeholder="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </form>
  );
};

export default Signup;
