// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../redux/userSlice'; 
// import './Login.css';
// const Login = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     password: '',
//     flat: '',
//     area: '',
//     landmark: '',
//     city: '',
//     pincode: '',
//     country: '',
//     state: '',
//   });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isLoginMode, setIsLoginMode] = useState(true);
//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const mode = query.get('mode');
//     setIsLoginMode(mode === 'login');
//   }, [location.search]);
//   useEffect(() => {
//     const storedUser = localStorage.getItem('userInfo');
//     if (storedUser) {
//       dispatch(setUser(JSON.parse(storedUser)));
//     }
//   }, [dispatch]);
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage('');
//     try {
//       if (isLoginMode) {
//         const res = await axios.post('/api/user/login', {
//           email: formData.email,
//           password: formData.password,
//         });
//         localStorage.setItem('token', res.data.token);
//         localStorage.setItem('userInfo', JSON.stringify(res.data.user));
//         dispatch(setUser(res.data.user));
//         navigate('/');
//       } else {
//         const res = await axios.post('/api/user/register', formData);
//         const fullUser = {
//           name: formData.name,
//           phone: formData.phone,
//           email: formData.email,
//           address: {
//             flat: formData.flat,
//             area: formData.area,
//             landmark: formData.landmark,
//             city: formData.city,
//             pincode: formData.pincode,
//             country: formData.country,
//             state: formData.state,
//           },
//         };
//         localStorage.setItem('userInfo', JSON.stringify(fullUser));
//         dispatch(setUser(fullUser));
//         setSuccessMessage('Registered successfully!');
//         setFormData({
//           name: '',
//           phone: '',
//           email: '',
//           password: '',
//           flat: '',
//           area: '',
//           landmark: '',
//           city: '',
//           pincode: '',
//           country: '',
//           state: '',
//         });
//         navigate('/');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred');
//     }
//   };
//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
//         {error && <div className="error-message">{error}</div>}
//         {successMessage && <div className="success-message">{successMessage}</div>}
//         <form className={`login-form ${isLoginMode ? 'login-only' : ''}`} onSubmit={handleSubmit}>
//           {!isLoginMode && (
//             <>
//               <div className="form-group">
//                 <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//               </div>
//               <div className="form-group">
//                 <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//               </div>
//               <div className="form-group">
//                 <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
//               </div>
//               <div className="form-group">
//                 <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} pattern="\d{10}" title="Phone number must be 10 digits" required />
//               </div>
//               <div className="form-row">
//                 <div className="form-group half">
//                   <input type="text" name="flat" placeholder="Flat / House No" value={formData.flat} onChange={handleChange} required />
//                 </div>
//                 <div className="form-group half">
//                   <input type="text" name="area" placeholder="Area / Street / Village" value={formData.area} onChange={handleChange} required />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group half">
//                   <input type="text" name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleChange} />
//                 </div>
//                 <div className="form-group half">
//                   <input type="text" name="city" placeholder="Town / City" value={formData.city} onChange={handleChange} required />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group half">
//                   <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} pattern="\d{6}" title="Pincode must be 6 digits" required />
//                 </div>
//                 <div className="form-group half">
//                   <select name="country" value={formData.country} onChange={handleChange} required>
//                     <option value="">Select Country</option>
//                     <option value="India">India</option>
//                     <option value="USA">USA</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <select name="state" value={formData.state} onChange={handleChange} required>
//                   <option value="">Select State</option>
//                   <option value="Tamil Nadu">Tamil Nadu</option>
//                   <option value="Maharashtra">Maharashtra</option>
//                 </select>
//               </div>
//             </>
//           )}
//           {isLoginMode && (
//             <>
//               <div className="form-group">
//                 <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//               </div>
//               <div className="form-group">
//                 <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
//               </div>
//             </>
//           )}
//           <button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
//         </form>
//         <div className="toggle-mode">
//           {isLoginMode ? (
//             <p>
//               Don't have an account?{' '}
//               <button onClick={() => setIsLoginMode(false)}>Register</button>
//             </p>
//           ) : (
//             <p>
//               Already have an account?{' '}
//               <button onClick={() => setIsLoginMode(true)}>Login</button>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Login;









import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    flat: '',
    area: '',
    landmark: '',
    city: '',
    pincode: '',
    country: '',
    state: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  // optional: read ?mode=login or ?mode=register
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const mode = query.get('mode');
    setIsLoginMode(mode === 'login' || !mode);
  }, [location.search]);

  // Keep user from localStorage on mount (if already logged in)
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      if (isLoginMode) {
        // LOGIN
        const res = await axios.post('/api/user/login', {
          email: formData.email,
          password: formData.password,
        });

        // Save token & user
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userInfo', JSON.stringify(res.data.user));
        dispatch(setUser(res.data.user));

        setSuccessMessage('Login successful!');
        navigate('/'); // go to homepage or dashboard
      } else {
        // REGISTER (no auto-login)
        await axios.post('/api/user/register', formData);

        setSuccessMessage('Registered successfully! Please log in.');
        setError('');

        // Clear form
        setFormData({
          name: '',
          phone: '',
          email: '',
          password: '',
          flat: '',
          area: '',
          landmark: '',
          city: '',
          pincode: '',
          country: '',
          state: '',
        });

        // switch to login mode so the user can login
        setIsLoginMode(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form className={`login-form ${isLoginMode ? 'login-only' : ''}`} onSubmit={handleSubmit}>
          {!isLoginMode && (
            <>
              <div className="form-group">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} pattern="\d{10}" title="Phone number must be 10 digits" required />
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <input type="text" name="flat" placeholder="Flat / House No" value={formData.flat} onChange={handleChange} required />
                </div>
                <div className="form-group half">
                  <input type="text" name="area" placeholder="Area / Street / Village" value={formData.area} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <input type="text" name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleChange} />
                </div>
                <div className="form-group half">
                  <input type="text" name="city" placeholder="Town / City" value={formData.city} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} pattern="\d{6}" title="Pincode must be 6 digits" required />
                </div>
                <div className="form-group half">
                  <select name="country" value={formData.country} onChange={handleChange} required>
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <select name="state" value={formData.state} onChange={handleChange} required>
                  <option value="">Select State</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>
            </>
          )}

          {isLoginMode && (
            <>
              <div className="form-group">
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              </div>
            </>
          )}

          <button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
        </form>

        <div className="toggle-mode">
          {isLoginMode ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setIsLoginMode(false)}>Register</button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => setIsLoginMode(true)}>Login</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

