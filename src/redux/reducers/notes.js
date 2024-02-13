import {FETCH, CREATE, UPDATE, DELETE, SEARCH, SORT} from '../constants/actionTypes.js';

const changeNotes = (notes = [], action) => {
    
    switch(action.type)
    {
        case FETCH: 
        {
            return action.payload;
        }
        case CREATE: 
        {
            return [...notes, action.payload];
        }
        case DELETE:
        {   
            return notes.filter((note) => note._id !== action.payload);
        }
        case UPDATE:
        {  
            return notes.map((note) => note._id === action.payload._id? action.payload: note);
        }  
        case SEARCH:
        {   
            return [...notes.filter((note) => note.title.includes(action.payload))];
        }  
        case SORT:
        {
            if(action.payload.date === "CREATED")
            {   
                if(action.payload.type === "OLDEST")
                { 
                    return [...notes.sort((note1, note2) => new Date(note1.createdOn).getTime() - new Date(note2.createdOn).getTime())];
                }
                else if(action.payload.type === "LATEST")
                {
                    return [...notes.sort((note1, note2) => new Date(note2.createdOn).getTime() - new Date(note1.createdOn).getTime())];
                }
            }
            else if(action.payload.date === "MODIFIED") 
            {   
                if(action.payload.type === "OLDEST")
                { 
                    return [...notes.sort((note1, note2) => new Date(note1.createdOn).getTime() - new Date(note2.createdOn).getTime())];
                }
                else if(action.payload.type === "LATEST")
                {
                    return [...notes.sort((note1, note2) => new Date(note2.createdOn).getTime() - new Date(note1.createdOn).getTime())];
                }
            }
            break;
        }
        default: return notes;
    };
}


export default changeNotes;