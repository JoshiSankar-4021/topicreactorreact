import './Login.css';
import { NavLink,useNavigate} from 'react-router-dom';
import { MdMail, MdLock } from 'react-icons/md';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useState } from 'react';


function Login() {
    const navigate=useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formdata,setFormdata]=useState({
      email:"",
      password:""
    });

    const handleChanges=(e)=>{
      const{name,value}=e.target;
      setFormdata(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log(formdata);
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/User?action=login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata)
    });
      if(!res.ok){
        alert("cannot login")
      }else{
        const data= await res.json()
        console.log(data.userid)
        sessionStorage.setItem("userid", data.userid);
        navigate("/Profile")
      }
    }

  return (
    <div className='center-container'>
      <h1 className='h1-style'>Login</h1>
      <div className='formcontainer'>
        <div className="formdiv">
          <form onSubmit={handleSubmit}>
            <label className='labelstyle'>Email</label>
            <div className="input-wrapper">
              <MdMail className="input-icon" />
              <input type="email" name="email" onChange={handleChanges} className='inputstyle with-icon' placeholder='Email' />
            </div>
            <label className='labelstyle'>Password</label>
            <div className="input-wrapper">
              <MdLock className='input-icon' />
              <input type={showPassword?'text':'password'}  name="password" onChange={handleChanges} className='inputstyle with-icon' placeholder='Password' />
              {showPassword?(
              <IoMdEye className='inputicon-right' onClick={togglePasswordVisibility}/>):(
              <IoMdEyeOff className='inputicon-right' onClick={togglePasswordVisibility}/>)
                }
            </div>
            <button type="submit" className='loginbutton'>Login</button>
          </form>
          <p className='p-account'>Don't have an account? <NavLink to='/Register' className='nav-register'>Register</NavLink></p>
          <p className='forgotpassword'><NavLink className='forgotNav'>Forgot Password</NavLink></p>
        </div>
      </div>
    </div>
  );
function togglePasswordVisibility() {
  setShowPassword(!showPassword);
}
}

export default Login;
