import './Login.css';
import { NavLink,useNavigate} from 'react-router-dom';
import { MdMail, MdLock } from 'react-icons/md';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useState } from 'react';


function Login() {
    const navigate=useNavigate();
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='center-container'>
      <h1 className='h1-style'>Login</h1>
      <div className='formcontainer'>
        <div className="formdiv">
          <form>
            <label className='labelstyle'>Email</label>
            <div className="input-wrapper">
              <MdMail className="input-icon" />
              <input type="email" className='inputstyle with-icon' placeholder='Email' />
            </div>
            <label className='labelstyle'>Password</label>
            <div className="input-wrapper">
              <MdLock className='input-icon' />
              <input type={showPassword?'text':'password'} className='inputstyle with-icon' placeholder='Password' />
              {showPassword?(
              <IoMdEye className='inputicon-right' onClick={togglePasswordVisibility}/>):(
              <IoMdEyeOff className='inputicon-right' onClick={togglePasswordVisibility}/>)
                }
            </div>
            <button className='loginbutton' onClick={Clicked}>Login</button>
          </form>
          <p className='p-account'>Don't have an account? <NavLink to='/Register' className='nav-register'>Register</NavLink></p>
          <p className='forgotpassword'><NavLink className='forgotNav'>Forgot Password</NavLink></p>
        </div>
      </div>
    </div>
  );
      function Clicked(){
    navigate('/Profile')
}
function togglePasswordVisibility() {
  setShowPassword(!showPassword);
}
}

export default Login;
