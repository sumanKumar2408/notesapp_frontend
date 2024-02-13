import '../styles/NotesContainer.css';
import Notes from '../components/Notes.js'
import NewNotes from '../components/NewNotes';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {searchNotes, sortNotes, getNotes} from '../redux/actions/index.js';
import {useNavigate} from 'react-router';

const NotesContainer = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let notes = useSelector((state) => state.changeNotes);
    const {currentId, setCurrentId} = props;
    const [search, setSearch] = useState("");
    const handleInput = (event) =>{
        setSearch(event.target.value);
    }
    setTimeout(() => {
        if(localStorage.getItem('msg') === "Token Expired") {localStorage.removeItem('msg'); localStorage.removeItem('token'); localStorage.removeItem('name'); navigate("/login"); alert("Session timed out. Please login again");}
    }, 1000);
    useEffect(() => {if(search.length > 0) {dispatch(searchNotes(search));}
        else{
            dispatch(getNotes());
        }}, [search, dispatch]);

    const sortCreated = () => {
        const elem = document.getElementById('options-created');
        const name = elem.name;
        const value = elem.options[elem.selectedIndex].value;
        dispatch(sortNotes(name, value));
    }

    const sortModified = () => {
        const elem = document.getElementById('options-modified');
        const name = elem.name;
        const value = elem.options[elem.selectedIndex].value;
        dispatch(sortNotes(name, value));
    }

    let inc = 0;
    return(
        <div className="notes_container">
            {localStorage.getItem('token') && <NewNotes currentId = {currentId} setCurrentId = {setCurrentId} />}
            {(!localStorage.getItem('token') && (localStorage.getItem('msg') === "Please Login" || localStorage.getItem('msg') === "Token Expired")) && <h2 style={{textAlign: "Center", color:"red", fontSize:"3rem"}}>Please login to see notes </h2>}
            {localStorage.getItem('token') && <div className="wrapper">
                    <div className="search-field">
                        <input type="text" placeholder ="Enter title of note." value={search} onChange={handleInput} style={{height: "4rem", border: "2.5px solid black", fontSize:'1.5rem', padding: ".8rem"}}/>
                    </div>
                    <div className="sort-field">
                       <div className="sort-field-created">
                            <label>Sort by:</label>
                            <label>Date Created</label>
                            <select name="CREATED" id="options-created" onChange={sortCreated} style={{border: "2.5px solid black", fontSize:'1.8rem', textAlign:"center", padding: "1rem"}}>
                                <option value="OLDEST">Oldest</option>
                                <option value="LATEST">Latest</option>
                            </select>
                       </div>
                       <div className="sort-field-modified">
                            <label>Sort by:</label>
                            <label>Date Modified</label>
                            <select name="MODIFIED" id="options-modified" onChange={sortModified} style={{border: "2.5px solid black", fontSize:'1.8rem', textAlign:"center", padding: "1rem"}}>
                                <option value="OLDEST">Oldest</option>
                                <option value="LATEST">Latest</option>
                            </select>
                       </div>
                    </div>
                </div>}
                <div className="notes-container">
                    {(search && notes.length === 0) && <h2 style={{color:'black'}}>No notes found..</h2>}
                    {(!search && localStorage.getItem('token') && notes.length === 0) && <h2 style={{color:'black'}}>No notes available... <br/> Create your first note...</h2>}
                    {   
                        notes.map((note) => {
                            return(
                                <Notes
                                    key = {inc++}
                                    title={note.title}
                                    desc={note.desc}
                                    _id={note._id}
                                    createdOn={note.createdOn}
                                    lastModifiedOn={note.lastModifiedOn}
                                    setCurrentId = {setCurrentId}
                                />
                            );
                        })
                    }
                </div>
            </div>
        
    );
};

export default NotesContainer;

