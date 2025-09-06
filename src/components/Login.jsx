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
//     setIsLoginMode(mode === 'login' || !mode);
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

//         setSuccessMessage('Login successful!');
//         navigate('/'); 
//       } else {
       
//         await axios.post('/api/user/register', formData);

//         setSuccessMessage('Registered successfully! Please log in.');
//         setError('');

      
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

       
//         setIsLoginMode(true);
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
//     setIsLoginMode(mode === 'login' || !mode);
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

//     if (!formData.email || !formData.password) {
//       setError("Email and password are required.");
//       return;
//     }

//     if (!isLoginMode) {
//       if (
//         !formData.name ||
//         !formData.phone ||
//         !formData.flat ||
//         !formData.area ||
//         !formData.city ||
//         !formData.pincode ||
//         !formData.country ||
//         !formData.state
//       ) {
//         setError("Please fill in all required fields.");
//         return;
//       }
//       if (!/^\d{10}$/.test(formData.phone)) {
//         setError("Phone number must be 10 digits.");
//         return;
//       }
//       if (!/^\d{6}$/.test(formData.pincode)) {
//         setError("Pincode must be 6 digits.");
//         return;
//       }
//     }

//     try {
//       if (isLoginMode) {
     
//         const res = await axios.post('/api/user/login', {
//           email: formData.email,
//           password: formData.password,
//         });

//         localStorage.setItem('token', res.data.token);
//         localStorage.setItem('userInfo', JSON.stringify(res.data.user));
//         dispatch(setUser(res.data.user));

//         setSuccessMessage('Login successful!');
//         navigate('/');
//       } else {
      
//         await axios.post('/api/user/register', formData);

//         setSuccessMessage('Registered successfully! Please log in.');
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
//         setIsLoginMode(true);
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

//         <form
//           className={`login-form ${isLoginMode ? 'login-only' : ''}`}
//           onSubmit={handleSubmit}
//           noValidate 
//         >
//           {!isLoginMode && (
//             <>
//               <div className="form-group">
//                 <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
//               </div>

//               <div className="form-row">
//                 <div className="form-group half">
//                   <input type="text" name="flat" placeholder="Flat / House No" value={formData.flat} onChange={handleChange} />
//                 </div>
//                 <div className="form-group half">
//                   <input type="text" name="area" placeholder="Area / Street / Village" value={formData.area} onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group half">
//                   <input type="text" name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleChange} />
//                 </div>
//                 <div className="form-group half">
//                   <input type="text" name="city" placeholder="Town / City" value={formData.city} onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group half">
//                   <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
//                 </div>
//                 <div className="form-group half">
//                   <select name="country" value={formData.country} onChange={handleChange}>
//                     <option value="">Select Country</option>
//                     <option value="India">India</option>
//                     <option value="USA">USA</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <select name="state" value={formData.state} onChange={handleChange}>
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
//                 <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
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

//   const [fieldErrors, setFieldErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isLoginMode, setIsLoginMode] = useState(true);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const mode = query.get('mode');
//     setIsLoginMode(mode === 'login' || !mode);
//   }, [location.search]);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('userInfo');
//     if (storedUser) {
//       dispatch(setUser(JSON.parse(storedUser)));
//     }
//   }, [dispatch]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setFieldErrors({ ...fieldErrors, [e.target.name]: '' }); 
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFieldErrors({});
//     setSuccessMessage('');

//     const newErrors = {};

    
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Enter a valid email address';
//     }

    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(formData.password)) {
//       newErrors.password =
//         'Password must be at least 8 characters, include 1 uppercase letter, 1 lowercase letter, and 1 number';
//     }

   
//     if (!isLoginMode) {
//       if (!formData.name) newErrors.name = 'Name is required';
//       if (!formData.phone) newErrors.phone = 'Phone is required';
//       else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';

//       if (!formData.flat) newErrors.flat = 'Flat/House No is required';
//       if (!formData.area) newErrors.area = 'Area/Street/Village is required';
//       if (!formData.city) newErrors.city = 'City is required';

//       if (!formData.pincode) newErrors.pincode = 'Pincode is required';
//       else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';

//       if (!formData.country) newErrors.country = 'Country is required';
//       if (!formData.state) newErrors.state = 'State is required';
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setFieldErrors(newErrors);
//       return;
//     }

//     try {
//       if (isLoginMode) {
//         const res = await axios.post('/api/user/login', {
//           email: formData.email,
//           password: formData.password,
//         });

//         localStorage.setItem('token', res.data.token);
//         localStorage.setItem('userInfo', JSON.stringify(res.data.user));
//         dispatch(setUser(res.data.user));
//         setSuccessMessage('Login successful!');
//         navigate('/');
//       } else {
//         await axios.post('/api/user/register', formData);
//         setSuccessMessage('Registered successfully! Please log in.');
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
//         setIsLoginMode(true);
//       }
//     } catch (err) {
//       const backendMsg = err.response?.data?.message || '';

      
//       if (backendMsg.toLowerCase().includes('email')) {
//         setFieldErrors((prev) => ({ ...prev, email: backendMsg }));
//       } else if (backendMsg.toLowerCase().includes('password')) {
//         setFieldErrors((prev) => ({ ...prev, password: backendMsg }));
//       } else if (backendMsg.toLowerCase().includes('invalid')) {
//         setFieldErrors({
//           email: 'Invalid email or password',
//           password: 'Invalid email or password',
//         });
//       } else {
//         console.error(err);
//       }
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <h2>{isLoginMode ? 'Login' : 'Register'}</h2>

//         {successMessage && <div className="success-message">{successMessage}</div>}

//         <form
//           className={`login-form ${isLoginMode ? 'login-only' : ''}`}
//           onSubmit={handleSubmit}
//           noValidate
//         >
//           {!isLoginMode && (
//             <>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={fieldErrors.name ? 'input-error' : ''}
//                 />
//                 {fieldErrors.name && <div className="error">{fieldErrors.name}</div>}
//               </div>
//               <div className="form-group">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={fieldErrors.email ? 'input-error' : ''}
//                 />
//                 {fieldErrors.email && <div className="error">{fieldErrors.email}</div>}
//               </div>
//               <div className="form-group">
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={fieldErrors.password ? 'input-error' : ''}
//                 />
//                 {fieldErrors.password && <div className="error">{fieldErrors.password}</div>}
//               </div>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Phone Number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className={fieldErrors.phone ? 'input-error' : ''}
//                 />
//                 {fieldErrors.phone && <div className="error">{fieldErrors.phone}</div>}
//               </div>

//               <div className="form-row">
//                 <div className="form-group half">
//                   <input
//                     type="text"
//                     name="flat"
//                     placeholder="Flat / House No"
//                     value={formData.flat}
//                     onChange={handleChange}
//                     className={fieldErrors.flat ? 'input-error' : ''}
//                   />
//                   {fieldErrors.flat && <div className="error">{fieldErrors.flat}</div>}
//                 </div>
//                 <div className="form-group half">
//                   <input
//                     type="text"
//                     name="area"
//                     placeholder="Area / Street / Village"
//                     value={formData.area}
//                     onChange={handleChange}
//                     className={fieldErrors.area ? 'input-error' : ''}
//                   />
//                   {fieldErrors.area && <div className="error">{fieldErrors.area}</div>}
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group half">
//                   <input
//                     type="text"
//                     name="landmark"
//                     placeholder="Landmark"
//                     value={formData.landmark}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group half">
//                   <input
//                     type="text"
//                     name="city"
//                     placeholder="Town / City"
//                     value={formData.city}
//                     onChange={handleChange}
//                     className={fieldErrors.city ? 'input-error' : ''}
//                   />
//                   {fieldErrors.city && <div className="error">{fieldErrors.city}</div>}
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group half">
//                   <input
//                     type="text"
//                     name="pincode"
//                     placeholder="Pincode"
//                     value={formData.pincode}
//                     onChange={handleChange}
//                     className={fieldErrors.pincode ? 'input-error' : ''}
//                   />
//                   {fieldErrors.pincode && <div className="error">{fieldErrors.pincode}</div>}
//                 </div>
//                 <div className="form-group half">
//                   <select
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     className={fieldErrors.country ? 'input-error' : ''}
//                   >
//                     <option value="">Select Country</option>
//                     <option value="India">India</option>
//                     <option value="USA">USA</option>
//                   </select>
//                   {fieldErrors.country && <div className="error">{fieldErrors.country}</div>}
//                 </div>
//               </div>

//               <div className="form-group">
//                 <select
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   className={fieldErrors.state ? 'input-error' : ''}
//                 >
//                   <option value="">Select State</option>
//                   <option value="Tamil Nadu">Tamil Nadu</option>
//                   <option value="Maharashtra">Maharashtra</option>
//                 </select>
//                 {fieldErrors.state && <div className="error">{fieldErrors.state}</div>}
//               </div>
//             </>
//           )}

//           {isLoginMode && (
//             <>
//               <div className="form-group">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={fieldErrors.email ? 'input-error' : ''}
//                 />
//                 {fieldErrors.email && <div className="error">{fieldErrors.email}</div>}
//               </div>
//               <div className="form-group">
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={fieldErrors.password ? 'input-error' : ''}
//                 />
//                 {fieldErrors.password && <div className="error">{fieldErrors.password}</div>}
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











// impo
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

//   const [fieldErrors, setFieldErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isLoginMode, setIsLoginMode] = useState(true);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const mode = query.get('mode');
//     setIsLoginMode(mode === 'login' || !mode);
//   }, [location.search]);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('userInfo');
//     if (storedUser) {
//       dispatch(setUser(JSON.parse(storedUser)));
//     }
//   }, [dispatch]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setFieldErrors({ ...fieldErrors, [e.target.name]: '' }); 
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFieldErrors({});
//     setSuccessMessage('');

//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Enter a valid email address';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(formData.password)) {
//       newErrors.password =
//         'Password must be at least 8 characters, include 1 uppercase letter, 1 lowercase letter, and 1 number';
//     }

//     if (!isLoginMode) {
//       if (!formData.name) newErrors.name = 'Name is required';
//       if (!formData.phone) newErrors.phone = 'Phone is required';
//       else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';

//       if (!formData.flat) newErrors.flat = 'Flat/House No is required';
//       if (!formData.area) newErrors.area = 'Area/Street/Village is required';
//       if (!formData.city) newErrors.city = 'City is required';

//       if (!formData.pincode) newErrors.pincode = 'Pincode is required';
//       else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';

//       if (!formData.country) newErrors.country = 'Country is required';
//       if (!formData.state) newErrors.state = 'State is required';
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setFieldErrors(newErrors);
//       return;
//     }

//     try {
//       if (isLoginMode) {
//         const res = await axios.post('/api/user/login', {
//           email: formData.email,
//           password: formData.password,
//         });

//         localStorage.setItem('token', res.data.token);
//         localStorage.setItem('userInfo', JSON.stringify(res.data.user));
//         dispatch(setUser(res.data.user));
//         setSuccessMessage('Login successful!');
//         navigate('/');
//       } else {
//         await axios.post('/api/user/register', formData);
//         setSuccessMessage('Registered successfully! Please log in.');
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
//         setIsLoginMode(true);
//       }
//     } catch (err) {
//       const backendMsg = err.response?.data?.message || '';
//       const msgLower = backendMsg.toLowerCase();

    
//       if (err.response?.data?.errors) {
//         const errors = err.response.data.errors;
//         if (errors.email) {
//           setFieldErrors((prev) => ({ ...prev, email: errors.email }));
//         }
//         if (errors.phone) {
//           setFieldErrors((prev) => ({ ...prev, phone: errors.phone }));
//         }
//       } else {
        
//         if (msgLower.includes('email') && msgLower.includes('exist')) {
//           setFieldErrors((prev) => ({ ...prev, email: 'Email already exists' }));
//         }
//         if (msgLower.includes('phone') && msgLower.includes('exist')) {
//           setFieldErrors((prev) => ({ ...prev, phone: 'Phone number already exists' }));
//         }
//         if (msgLower.includes('password')) {
//           setFieldErrors((prev) => ({ ...prev, password: backendMsg }));
//         }
//         if (msgLower.includes('invalid')) {
//           setFieldErrors({
//             email: 'Invalid email or password',
//             password: 'Invalid email or password',
//           });
//         }
//       }
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <h2>{isLoginMode ? 'Login' : 'Register'}</h2>

//         {successMessage && <div className="success-message">{successMessage}</div>}

//         <form
//           className={`login-form ${isLoginMode ? 'login-only' : ''}`}
//           onSubmit={handleSubmit}
//           noValidate
//         >
//           {!isLoginMode && (
//             <>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={fieldErrors.name ? 'input-error' : ''}
//                 />
//                 {fieldErrors.name && <div className="error">{fieldErrors.name}</div>}
//               </div>
//               <div className="form-group">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={fieldErrors.email ? 'input-error' : ''}
//                 />
//                 {fieldErrors.email && <div className="error">{fieldErrors.email}</div>}
//               </div>
//               <div className="form-group">
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={fieldErrors.password ? 'input-error' : ''}
//                 />
//                 {fieldErrors.password && <div className="error">{fieldErrors.password}</div>}
//               </div>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Phone Number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className={fieldErrors.phone ? 'input-error' : ''}
//                 />
//                 {fieldErrors.phone && <div className="error">{fieldErrors.phone}</div>}
//               </div>

//               <div className="form-row">
//                 <div className="form-group half">
//                   <input
//                     type="text"
//                     name="flat"
//                     placeholder="Flat / House No"
//                     value={formData.flat}
//                     onChange={handleChange}
//                     className={fieldErrors.flat ? 'input-error' : ''}
//                   />
//                   {fieldErrors.flat && <div className="error">{fieldErrors.flat}</div>}
//                 </div>
//                 <div className="form-group half">
//                   <input
//                     type="text"
//                     name="area"
//                     placeholder="Area / Street / Village"
//                     value={formData.area}
//                     onChange={handleChange}
//                     className={fieldErrors.area ? 'input-error' : ''}
//                   />
//                   {fieldErrors.area && <div className="error">{fieldErrors.area}</div>}
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group half">
//                   <input
//                     type="text"
//                     name="landmark"
//                     placeholder="Landmark"
//                     value={formData.landmark}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group half">
//                   <input
//                     type="text"
//                     name="city"
//                     placeholder="Town / City"
//                     value={formData.city}
//                     onChange={handleChange}
//                     className={fieldErrors.city ? 'input-error' : ''}
//                   />
//                   {fieldErrors.city && <div className="error">{fieldErrors.city}</div>}
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group half">
//                   <input
//                     type="text"
//                     name="pincode"
//                     placeholder="Pincode"
//                     value={formData.pincode}
//                     onChange={handleChange}
//                     className={fieldErrors.pincode ? 'input-error' : ''}
//                   />
//                   {fieldErrors.pincode && <div className="error">{fieldErrors.pincode}</div>}
//                 </div>
//                 <div className="form-group half">
//                   <select
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     className={fieldErrors.country ? 'input-error' : ''}
//                   >
//                     <option value="">Select Country</option>
//                     <option value="India">India</option>
//                     <option value="USA">USA</option>
//                   </select>
//                   {fieldErrors.country && <div className="error">{fieldErrors.country}</div>}
//                 </div>
//               </div>

//               <div className="form-group">
//                 <select
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   className={fieldErrors.state ? 'input-error' : ''}
//                 >
//                   <option value="">Select State</option>
//                   <option value="Tamil Nadu">Tamil Nadu</option>
//                   <option value="Maharashtra">Maharashtra</option>
//                 </select>
//                 {fieldErrors.state && <div className="error">{fieldErrors.state}</div>}
//               </div>
//             </>
//           )}

//           {isLoginMode && (
//             <>
//               <div className="form-group">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={fieldErrors.email ? 'input-error' : ''}
//                 />
//                 {fieldErrors.email && <div className="error">{fieldErrors.email}</div>}
//               </div>
//               <div className="form-group">
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={fieldErrors.password ? 'input-error' : ''}
//                 />
//                 {fieldErrors.password && <div className="error">{fieldErrors.password}</div>}
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

  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const mode = query.get('mode');
    setIsLoginMode(mode === 'login' || !mode);
  }, [location.search]);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const getInputClass = (fieldName) => {
    if (!touchedFields[fieldName]) return '';
    return fieldErrors[fieldName] ? 'input-error' : 'input-success';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setSuccessMessage('');

    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters, include 1 uppercase letter, 1 lowercase letter, and 1 number';
    }

    // Extra validations for register mode
    if (!isLoginMode) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
      else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';

      if (!formData.flat) newErrors.flat = 'Flat/House No is required';
      if (!formData.area) newErrors.area = 'Area/Street/Village is required';
      if (!formData.city) newErrors.city = 'City is required';

      if (!formData.pincode) newErrors.pincode = 'Pincode is required';
      else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';

      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.state) newErrors.state = 'State is required';
    }

    // Mark all visible fields as touched
    const fieldsToTouch = isLoginMode
      ? ['email', 'password']
      : Object.keys(formData);
    setTouchedFields(prev => {
      const updated = { ...prev };
      fieldsToTouch.forEach(f => updated[f] = true);
      return updated;
    });

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    try {
      if (isLoginMode) {
        const res = await axios.post('/api/user/login', {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userInfo', JSON.stringify(res.data.user));
        dispatch(setUser(res.data.user));
        setSuccessMessage('Login successful!');
        navigate('/');
      } else {
        await axios.post('/api/user/register', formData);
        setSuccessMessage('Registered successfully! Please log in.');
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
        setIsLoginMode(true);
      }
    } catch (err) {
      const backendMsg = err.response?.data?.message || '';
      const msgLower = backendMsg.toLowerCase();

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        if (errors.email) {
          setFieldErrors((prev) => ({ ...prev, email: errors.email }));
        }
        if (errors.phone) {
          setFieldErrors((prev) => ({ ...prev, phone: errors.phone }));
        }
      } else {
        if (msgLower.includes('email') && msgLower.includes('exist')) {
          setFieldErrors((prev) => ({ ...prev, email: 'Email already exists' }));
        }
        if (msgLower.includes('phone') && msgLower.includes('exist')) {
          setFieldErrors((prev) => ({ ...prev, phone: 'Phone number already exists' }));
        }
        if (msgLower.includes('password')) {
          setFieldErrors((prev) => ({ ...prev, password: backendMsg }));
        }
        if (msgLower.includes('invalid')) {
          setFieldErrors({
            email: 'Invalid email or password',
            password: 'Invalid email or password',
          });
        }
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{isLoginMode ? 'Login' : 'Register'}</h2>

        {successMessage && <div className="success-message">{successMessage}</div>}

        <form
          className={`login-form ${isLoginMode ? 'login-only' : ''}`}
          onSubmit={handleSubmit}
          noValidate
        >
          {!isLoginMode && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={getInputClass('name')}
                />
                {fieldErrors.name && <div className="error">{fieldErrors.name}</div>}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={getInputClass('email')}
                />
                {fieldErrors.email && <div className="error">{fieldErrors.email}</div>}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={getInputClass('password')}
                />
                {fieldErrors.password && <div className="error">{fieldErrors.password}</div>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={getInputClass('phone')}
                />
                {fieldErrors.phone && <div className="error">{fieldErrors.phone}</div>}
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <input
                    type="text"
                    name="flat"
                    placeholder="Flat / House No"
                    value={formData.flat}
                    onChange={handleChange}
                    className={getInputClass('flat')}
                  />
                  {fieldErrors.flat && <div className="error">{fieldErrors.flat}</div>}
                </div>
                <div className="form-group half">
                  <input
                    type="text"
                    name="area"
                    placeholder="Area / Street / Village"
                    value={formData.area}
                    onChange={handleChange}
                    className={getInputClass('area')}
                  />
                  {fieldErrors.area && <div className="error">{fieldErrors.area}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <input
                    type="text"
                    name="landmark"
                    placeholder="Landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    className={getInputClass('landmark')}
                  />
                </div>
                <div className="form-group half">
                  <input
                    type="text"
                    name="city"
                    placeholder="Town / City"
                    value={formData.city}
                    onChange={handleChange}
                    className={getInputClass('city')}
                  />
                  {fieldErrors.city && <div className="error">{fieldErrors.city}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={getInputClass('pincode')}
                  />
                  {fieldErrors.pincode && <div className="error">{fieldErrors.pincode}</div>}
                </div>
                <div className="form-group half">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={getInputClass('country')}
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                  </select>
                  {fieldErrors.country && <div className="error">{fieldErrors.country}</div>}
                </div>
              </div>

              <div className="form-group">
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={getInputClass('state')}
                >
                  <option value="">Select State</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
                {fieldErrors.state && <div className="error">{fieldErrors.state}</div>}
              </div>
            </>
          )}

          {isLoginMode && (
            <>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={getInputClass('email')}
                />
                {fieldErrors.email && <div className="error">{fieldErrors.email}</div>}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={getInputClass('password')}
                />
                {fieldErrors.password && <div className="error">{fieldErrors.password}</div>}
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











