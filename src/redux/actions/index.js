import axios from "axios";
import { BASE_URL } from '../../constants.js';
import {FETCH, CREATE, UPDATE, DELETE, SEARCH, SORT} from '../constants/actionTypes.js';

export const getNotes = () => async(dispatch) => {
    try{
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }};
        const {data} = await axios.get(`${BASE_URL}/notes`, config);
        dispatch({type: FETCH, payload: data});
    }catch(err){
        // console.log(err.response.data);
        localStorage.setItem('msg', err.response.data);
    }
};

export const createNotes = (note) => async(dispatch) => {
    try{
        const token = localStorage.getItem('token');
        let createdOn = JSON.stringify(new Date());
        createdOn = JSON.parse(createdOn);
        const config = {
            headers: { Authorization: `Bearer ${token}` }};
        await axios.post(`${BASE_URL}/notes`, {...note, createdOn}, config);
        dispatch({type: CREATE, payload: {...note, createdOn}});
    }catch(err){
        // console.log(err);
        localStorage.setItem('msg', err.response.data);
    }
}

export const deleteNotes = (id) => async(dispatch) => {
    try{
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }};
        await axios.delete(`${BASE_URL}/notes/${id}`, config);
        dispatch({type: DELETE, payload: id});
    }catch(err){
        // console.log(err);
        localStorage.setItem('msg', err.response.data);
    }
};

export const updateNotes = (id, newNote) => async(dispatch) =>{
    try{
        const token = localStorage.getItem('token');
        let lastModifiedOn = JSON.stringify(new Date());
        lastModifiedOn = JSON.parse(lastModifiedOn);
        const config = {
            headers: { Authorization: `Bearer ${token}` }};
        await axios.patch(`${BASE_URL}/notes/${id}`, {...newNote, lastModifiedOn}, config);
        dispatch({type: UPDATE, payload: {...newNote, lastModifiedOn}});
    }catch(err){
            // console.log(err);
            localStorage.setItem('msg', err.response.data);
        }     
};

export const searchNotes = (key) => async(dispatch) =>{
    try{
        dispatch({type: SEARCH, payload: key});
    }
    catch(err){
    }
};

export const sortNotes = (date, type) => async(dispatch) =>{
    try{
        console.log("sort");
        dispatch({type: SORT, payload: {date, type}});
    }
    catch(err){
    }
};

