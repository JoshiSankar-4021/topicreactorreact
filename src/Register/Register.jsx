import './Register.css';
import { NavLink } from 'react-router-dom';
import { MdMail, MdLock, MdLocationOn, MdPhoneAndroid } from 'react-icons/md';
import { FaGraduationCap, FaChevronDown, FaRegUser } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [education, setEducation] = useState([]);
  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    retypepassword: "",
    address: "",
    gender: "",
    phone: "",
    education: ""
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/User?action=geteducation`)
      .then(res => res.json())
      .then(json => {
        setEducation(json.data || []);
      })
      .catch(err => console.error("Fetch education error:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formdata.password !== formdata.retypepassword) {
      alert("Passwords do not match!");
      return;
    }

    const { retypepassword, ...payload } = formdata;
    payload.education = payload.education ? parseInt(payload.education) : null;

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/User?action=registeruser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      alert(data.message || "Registration successful");
    } catch (err) {
      console.error("Network error:", err);
      alert("An error occurred: " + err.message);
    }
  };

  return (
    <div className="register-container">
      <h1 className='register-title'>Register</h1>
      <div className="registerform-container">
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <label className="register-labelStyle">First Name</label>
          <div className='input-wrapper'>
            <FaRegUser className='input-icon' />
            <input
              type="text"
              name="firstname"
              value={formdata.firstname}
              onChange={handleChange}
              className="register-inputStyle"
              required
            />
          </div>

          {/* Last Name */}
          <label className="register-labelStyle">Last Name</label>
          <div className='input-wrapper'>
            <FaRegUser className='input-icon' />
            <input
              type="text"
              name="lastname"
              value={formdata.lastname}
              onChange={handleChange}
              className="register-inputStyle"
              required
            />
          </div>

          {/* Email */}
          <label className="register-labelStyle">Email</label>
          <div className='input-wrapper'>
            <MdMail className='input-icon' />
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              className="register-inputStyle"
              required
            />
          </div>

          {/* Password */}
          <label className="register-labelStyle">Password</label>
          <div className='input-wrapper'>
            <MdLock className='input-icon' />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formdata.password}
              onChange={handleChange}
              className="register-inputStyle"
              required
            />
            {showPassword
              ? <IoMdEye className='inputicon-right' onClick={togglePasswordVisibility} />
              : <IoMdEyeOff className='inputicon-right' onClick={togglePasswordVisibility} />
            }
          </div>

          {/* Re-type Password */}
          <label className="register-labelStyle">Re-Type Password</label>
          <div className='input-wrapper'>
            <MdLock className='input-icon' />
            <input
              type={showPassword ? "text" : "password"}
              name="retypepassword"
              value={formdata.retypepassword}
              onChange={handleChange}
              className="register-inputStyle"
              required
            />
          </div>

          {/* Address */}
          <label className="register-labelStyle">Address</label>
          <div className='input-wrapper'>
            <MdLocationOn className='input-icon' />
            <textarea
              name="address"
              value={formdata.address}
              onChange={handleChange}
              className="register-inputStyle"
              required
            />
          </div>

          {/* Education */}
          <label className="register-labelStyle">Education</label>
          <div className="select-wrapper">
            <FaGraduationCap className="select-icon" />
            <select
              name="education"
              value={formdata.education}
              onChange={handleChange}
              className="register-inputStyle with-left-icon"
              required
            >
              <option value="">--Select--</option>
              {education.map((edu) => (
                <option key={edu.eduId || edu.eduid} value={(edu.eduId || edu.eduid).toString()}>
                  {edu.educationname}
                </option>
              ))}
            </select>
            <FaChevronDown className="select-arrow" />
          </div>

          {/* Phone */}
          <label className='register-labelStyle'>Phone</label>
          <div className='input-wrapper'>
            <MdPhoneAndroid className='input-icon' />
            <input
              type="text"
              name="phone"
              value={formdata.phone}
              onChange={handleChange}
              className='register-inputStyle'
              required
            />
          </div>

          {/* Gender */}
          <label className='register-labelStyle'>Gender</label>
          <div className='gender-wrapper'>
            <label className='register-label-radio'>
              <input
                type="radio"
                name='gender'
                value="M"
                checked={formdata.gender === "M"}
                onChange={handleChange}
                required
              /> Male
            </label>
            <label className='register-label-radio'>
              <input
                type="radio"
                name='gender'
                value="F"
                checked={formdata.gender === "F"}
                onChange={handleChange}
                required
              /> Female
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className='register-buttonstyle'>Register</button>
          <p className='register-had-account'>
            Already have an account? <NavLink to='/' className='login-navstyle'>Login</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
