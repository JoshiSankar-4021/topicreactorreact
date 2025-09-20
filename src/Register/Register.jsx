import './Register.css';
import { NavLink } from 'react-router-dom';
import {} from 'react-icons';
import { MdMail,MdLock,MdLocationOn,MdPhoneAndroid} from 'react-icons/md';
import { FaGraduationCap,FaChevronDown,FaRegUser } from 'react-icons/fa';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';


function Register(){
        const [showPassword, setShowPassword] = useState(false);
    
    return(
        <div className="register-container">
            <h1 className='register-title'>Register</h1>
            <div className="registerform-container">
                <form>
                    <label className="register-labelStyle">First Name</label>
                    <div className='input-wrapper'>
                    <FaRegUser  className='input-icon'/>
                    <input type="text" className="register-inputStyle"/>
                    </div>
                
                    <label className="register-labelStyle">Last Name</label>
                    <div className='input-wrapper'>
                    <FaRegUser className='input-icon'/>
                    <input type="text" className="register-inputStyle"/>
                    </div>
                    
                    <label className="register-labelStyle">EMAIL</label>
                    <div className='input-wrapper'>
                    <MdMail className='input-icon'/>
                    <input type="text" className="register-inputStyle"/>
                    </div>

                    <label className="register-labelStyle">Password</label>
                    <div className='input-wrapper'>
                    <MdLock className='input-icon'/>
                    <input type={showPassword?'text':'password'} className="register-inputStyle"/>
                    {showPassword?(
                        <IoMdEye className='inputicon-right' onClick={togglePasswordVisibility}/>):(
                        <IoMdEyeOff className='inputicon-right' onClick={togglePasswordVisibility}/>)
                    }
                    </div>

                    <label className="register-labelStyle">Re-TypePassword</label>
                    <div className='input-wrapper'>
                    <MdLock className='input-icon'/>
                    <input type={showPassword?'text':'password'} className="register-inputStyle"/>
                    {showPassword?(
                        <IoMdEye className='inputicon-right' onClick={togglePasswordVisibility}/>):(
                        <IoMdEyeOff className='inputicon-right' onClick={togglePasswordVisibility}/>)
                    }
                    </div>

                    <label className="register-labelStyle">Address</label>
                    <div className='input-wrapper'>
                    <MdLocationOn className='input-icon'/>
                    <textarea type="text" className="register-inputStyle"/>
                    </div>
                    

                    <label className="register-labelStyle">Eduction</label>
                    <div className="select-wrapper">
                    <FaGraduationCap className="select-icon" />
                    <select className="register-inputStyle with-left-icon">
                        <option>Select</option>
                        <option>B-Tech</option>
                        <option>M-Tech</option>
                        <option>B.SC</option>
                        <option>BCA</option>
                        <option>MCA</option>
                    </select>
                    <FaChevronDown className="select-arrow"/>
                    </div>

                    <label className='register-labelStyle'>Phone</label>
                    <div className='input-wrapper'>
                    <MdPhoneAndroid className='input-icon'/>
                    <input className='register-inputStyle'/>
                    </div>

                    <label  className='register-labelStyle'>Gender</label>
                    <label className='register-label-radio'>Male</label>
                    <input  type="radio" name='gender' className='register-radio-input'/>

                    <label className='register-label-radio'>Fe-Male</label>
                    <input type="radio" name='gender' className='register-radio-input'/>

                    <label className="register-labelStyle">Skills</label>
                    <table>
                        <tr>
                            <td>
                            <label className='register-checkboxName'>Java</label>
                            </td>
                            <td>
                            <input type="checkbox" className='register-checkbox-input'/>
                            </td>
                            <td>
                            <label className='register-checkboxName'>Python</label>
                            </td>
                            <td>
                            <input type="checkbox" className='register-checkbox-input'/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <label className='register-checkboxName'>Sql</label>
                            </td>
                            <td>
                            <input type="checkbox" className='register-checkbox-input'/>
                            </td>
                            <td>
                            <label className='register-checkboxName'>React</label>
                            </td>
                            <td>
                                <input type="checkbox" className='register-checkbox-input'/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className='register-checkboxName'>Node</label>
                            </td>
                            <td>
                                <input type="checkbox" className='register-checkbox-input'/>
                            </td>
                            <td>
                                <label className='register-checkboxName'>Java Script</label>
                            </td>
                            <td>
                                <input type="checkbox" className='register-checkbox-input'/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <label className='register-checkboxName'>Express</label>
                            </td>
                            <td>
                            <input type="checkbox" className='register-checkbox-input'/>
                            </td>
                            <td>
                            <label className='register-checkboxName'>Html&Css</label>
                            </td>
                            <td>
                            <input type="checkbox" className='register-checkbox-input'/>
                            </td>
                        </tr>
                    </table>

                    <button className='register-buttonstyle'>Register</button>
                    <p className='register-had-account'>Already had Account? <NavLink to='/' className='login-navstyle'>Login</NavLink></p>
                </form>
            </div>
        </div>
    );
     function togglePasswordVisibility() {
    setShowPassword(!showPassword);
}
}
export default Register;
