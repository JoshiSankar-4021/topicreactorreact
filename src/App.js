import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import AllUsers from './Allusers/AllUsers.jsx';
import Profile from './Profile/Profile.jsx';
import MyContent from './MyContent/MyContent.jsx';
import CreateTopic from './CreateTopic/CreateTopic.jsx';
import Topics from './Topics/Topics.jsx';
import Navbar from './Navbar/Navbar.jsx';
import Register from './Register/Register.jsx';
import Login from './Login/Login.jsx';
import { useLocation,useNavigate} from 'react-router-dom';
import Upload from './Uploadform/UploadForm.jsx';
import UploadForm from './Uploadform/UploadForm.jsx';
function App() {
  const navigate=useNavigate();
  const location = useLocation();
  const hideNavbars=['/','/Register'];
  const shouldHideNavbars=hideNavbars.includes(location.pathname);
  return (
  <>
    {!shouldHideNavbars && <Navbar/>}
    {!shouldHideNavbars && (<div>
      <button className="logout-button" onClick={()=>{
        sessionStorage.clear();
        alert("Log Out Sucessful");
        navigate('/')}}>Logout</button>
    </div>)}
  <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Allusers' element={<AllUsers/>}/>
      <Route path='/Profile' element={<Profile/>}/>
      <Route path='/MyContent' element={<MyContent/>}/>
      <Route path='/CreateTopic' element={<CreateTopic/>}/>
      <Route path='/Topics' element={<Topics/>}/>
      <Route path='/Upload' element={<UploadForm/>}/>
  </Routes>
  </>
  );
}

export default App;
