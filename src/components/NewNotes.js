import '../styles/NewNotes.css';

import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateNotes, createNotes} from  '../redux/actions/index.js';

const NewNotes = (props) => {
    const {currentId, setCurrentId} = props;
    const dispatch = useDispatch();
    const[notes, setNotes] = useState({});
    const handleInput = (event) => {
        let name, value;
        name = event.target.name;
        value = event.target.value;
        setNotes({...notes, [name]: value});
    };
    const note = useSelector((state) => currentId ? state.changeNotes.find((note) => note._id === currentId) : null);
    useEffect(()=> {if(note) setNotes(note);}, [note]);
    
     const handleSubmit = async(event) => {
        event.preventDefault();
        if(currentId)
            {dispatch(updateNotes(currentId, notes)); setCurrentId(null);}
        else 
            dispatch(createNotes(notes));
        setNotes({title: "", desc: ""});
    };
    return(
        <div className="new-notes">
            <div className="newNotes-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="Enter Title" name="title" value={notes.title} onChange={handleInput} required/>
                    </div>
                    <div className="form-group">
                        <textarea placeholder="Enter Description" name="desc" value={notes.desc} onChange={handleInput} required rows="10" cols="60" style = {{resize: 'none'}}></textarea>
                    </div>
                    <div className="form-group">
                        {!currentId && <input type="submit" value="Create"/>}
                        {currentId  && <input type="submit" value="Update"/>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewNotes;