    import { useEffect, useState } from "react";
    import { MdMail, MdLock, MdLocationOn, MdPhoneAndroid } from "react-icons/md";
    import { FaGraduationCap, FaChevronDown, FaRegUser } from "react-icons/fa";
    import { IoMdEye, IoMdEyeOff } from "react-icons/io";

    function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [profiledata, setProfiledata] = useState({
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
        const userId = sessionStorage.getItem("userid");
        if (userId) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/User?action=getprofile&userid=${userId}`)
            .then((res) => res.json())
            .then((data) => {
            if (data?.data) {
                const profile = Array.isArray(data.data) ? data.data[0] : data.data;
                setProfiledata(profile);
                console.log(profiledata);
            }
            })
            .catch((err) => console.error("Error fetching profile:", err));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfiledata((prev) => ({
        ...prev,
        [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const userId = sessionStorage.getItem("userid");

        try {
        console.log("Submitting profile data:", profiledata);

        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/User?action=updateprofile&userid=${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profiledata)
        });

        const data = await res.json();
        console.log("Update response:", data);
        alert("Profile updated successfully!");
        } catch (err) {
        console.error("Update error:", err);
        alert("Failed to update profile");
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="register-container">
        <h1 className="register-title">Profile</h1>
        <div className="registerform-container">
            <form onSubmit={handleUpdate}>

            <label className="register-labelStyle">First Name</label>
            <div className="input-wrapper">
                <FaRegUser className="input-icon" />
                <input type="text" name="firstname" value={profiledata.firstname} onChange={handleChange} className="register-inputStyle" />
            </div>

            <label className="register-labelStyle">Last Name</label>
            <div className="input-wrapper">
                <FaRegUser className="input-icon" />
                <input type="text" name="lastname" value={profiledata.lastname} onChange={handleChange} className="register-inputStyle" />
            </div>

            <label className="register-labelStyle">Email</label>
            <div className="input-wrapper">
                <MdMail className="input-icon" />
                <input type="text" name="email" value={profiledata.email} onChange={handleChange} className="register-inputStyle" />
            </div>

            <label className="register-labelStyle">Password</label>
            <div className="input-wrapper">
                <MdLock className="input-icon" />
                <input type={showPassword ? "text" : "password"} name="password" value={profiledata.password} onChange={handleChange} className="register-inputStyle" />
                {showPassword ? (
                <IoMdEye className="inputicon-right" onClick={togglePasswordVisibility} />
                ) : (
                <IoMdEyeOff className="inputicon-right" onClick={togglePasswordVisibility} />
                )}
            </div>

            <label className="register-labelStyle">Re-Type Password</label>
            <div className="input-wrapper">
                <MdLock className="input-icon" />
                <input type={showPassword ? "text" : "password"} name="retypepassword" value={profiledata.retypepassword} onChange={handleChange} className="register-inputStyle" />
            </div>

            <label className="register-labelStyle">Address</label>
            <div className="input-wrapper">
                <MdLocationOn className="input-icon" />
                <textarea name="address" value={profiledata.address} onChange={handleChange} className="register-inputStyle" />
            </div>

            <label className="register-labelStyle">Education</label>
            <div className="select-wrapper">
                <FaGraduationCap className="select-icon" />
                <select name="education" value={profiledata.education} onChange={handleChange} className="register-inputStyle with-left-icon">
                <option value="">Select Education</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="B.Sc">B.Sc</option>
                <option value="M.Sc">M.Sc</option>
                </select>
                <FaChevronDown className="select-arrow" />
            </div>

            <label className="register-labelStyle">Phone</label>
            <div className="input-wrapper">
                <MdPhoneAndroid className="input-icon" />
                <input type="text" name="phone" value={profiledata.phone} onChange={handleChange} className="register-inputStyle" />
            </div>

            <label className="register-labelStyle">Gender</label>
            <label className="register-label-radio">Male</label>
            <input type="radio" name="gender" value="Male" checked={profiledata.gender === "Male"} onChange={handleChange} className="register-radio-input" />
            <label className="register-label-radio">Female</label>
            <input type="radio" name="gender" value="Female" checked={profiledata.gender === "Female"} onChange={handleChange} className="register-radio-input" />

            <button type="submit" className="register-buttonstyle">Update</button>
            </form>
        </div>
        </div>
    );
    }

    export default Register;
