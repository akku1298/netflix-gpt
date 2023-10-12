import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../Utils/firebase';
import {  signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";

import { addUser, removeUser } from '../Utils/userSlice';
import { toggleGptSearchView } from '../Utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../Utils/constants';
import { changeLanguage } from '../Utils/configSlice';

const Header = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((store)=> store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  const handleSignOut = () =>{
    signOut(auth).then(() => {
     
    }).catch((error) => {
      
    });
    
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const {uid, email, displayName} = user;
        dispatch(addUser({uid: uid, email:email, displayName: displayName}));
        navigate("/browse");
        
      } else {
        dispatch(removeUser());
        navigate("/");
        
      }
      return () => unsubscribe();
    });
  },[])

  const handleGptSearchClick = () =>{
      dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) =>{
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className="absolute w-screen px-10 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img 
      className="w-48"
      src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      alt="logo"/>
     {user && (
      <div className='flex p-2 justify-between'>
        {showGptSearch && (
        <select 
          className="p-2 m-2 bg-gray-900 text-white"
          onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang)=>(
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))

            }
          </select>
)}
        <button className="py-2 px-4 mx-4 my-2 bg-purple-600 text-white rounded-lg"
        onClick={handleGptSearchClick}>{showGptSearch ? "Homepage" : "GPT Search"}</button>
      <img
      className='w-12 h-12'
       alt="usericon"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjYA6ZG7qVVpXnqq7_5LJ_Ezs-Wr-VSQiSSA&usqp=CAU"/>
       <button className='font-bold text-white p-2' onClick={handleSignOut}>Sign out</button>
      </div>

)}
    </div>

  )
}

export default Header
