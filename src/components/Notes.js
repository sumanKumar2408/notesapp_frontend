import '../styles/Notes.css';
import {useDispatch} from 'react-redux';
import {deleteNotes} from '../redux/actions/index.js';

const Notes = (props) => {
    const dispatch = useDispatch();
    let createdOn, lastModifiedOn;
    createdOn = props.createdOn;
    lastModifiedOn = props.lastModifiedOn;

    createdOn = createdOn.replace('-', "");
    createdOn = createdOn.replace('-', "");
    let yyyy = createdOn.substr(0, 4);
    let mm = createdOn.substr(4, 2);
    let dd = createdOn.substr(6, 2);
    createdOn = dd + " - " + mm + " - " + yyyy;

    if(lastModifiedOn)
    { 
        lastModifiedOn = lastModifiedOn.replace('-', "");
        lastModifiedOn = lastModifiedOn.replace('-', "");
        yyyy = lastModifiedOn.substr(0, 4);
        mm = lastModifiedOn.substr(4, 2);
        dd = lastModifiedOn.substr(6, 2);
        lastModifiedOn = dd + " - " + mm + " - " + yyyy;
    }

    return(
        <div className="notes">
            <div className="title">
                <h2>{props.title}</h2>
            </div>
            <div className="desc">
                <p>{props.desc}</p>
            </div>
            <div className="date">
                <div className="created">
                    <p>Created On:</p>
                    <p>{createdOn}</p>
                </div>
                {props.lastModifiedOn && <div className="modified">
                    <p>Last Modified On:</p>
                    <p>{lastModifiedOn}</p>
                </div>}
            </div>
            <div className="_icons">
                <div className="icons">
                    <i class="bi bi-trash"  onClick={()=> dispatch(deleteNotes(props._id))}></i>
                    <i class="bi bi-pencil" onClick={()=> props.setCurrentId(props._id)}></i>
                </div>
            </div>
        </div>
    );
};

export default Notes;
