import './styles/App.css'
import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router';
import {useDispatch} from 'react-redux';
import Login from './views/Login.js';
import Signup from './views/Signup.js';
import Navbar from './components/Navbar.js';
import NotesContainer from './views/NotesContainer.js';
import PageNotFound from './views/PageNotFound.js';
import {getNotes} from './redux/actions/index.js';

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {dispatch(getNotes());}, [currentId, dispatch, getNotes]);
  return(
    <div className="app">
          <Navbar/>
          <Routes>
            <Route path="/login" element={<Login/>}></Route>
             {!localStorage.getItem('token') && <Route path="/" element={<Login/>}></Route>}
             {localStorage.getItem('token') && <Route path="/" element={<NotesContainer
             currentId = {currentId} setCurrentId = {setCurrentId}/>}></Route>}
             <Route path="/signup" element={<Signup/>}></Route>
            {<Route path="/notes" element={<NotesContainer
             currentId = {currentId} setCurrentId = {setCurrentId} />}></Route>}
            {/* <Route path="/logout" element={<Login/>}></Route> */}
            <Route path="*" element = {<PageNotFound/>}></Route>
          </Routes>
    </div>
    )
};

export default App;