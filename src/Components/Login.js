import React, { useRef, useState } from 'react';
import Header from './Header';
import { Validate } from '../Utils/Validate';
import {createUserWithEmailAndPassword,  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Utils/firebase';
import { useNavigate } from 'react-router-dom';
import {  updateProfile } from "firebase/auth";
import { addUser } from '../Utils/userSlice';
import { useDispatch } from 'react-redux';
import { IMG_URL } from '../Utils/constants';

const Login = () => {
  const[isSignInForm,setIsSignInForm]=useState(true);
  const[errMessage,setErrmessage]=useState(null);
 
  const dispatch=useDispatch();
  const email=useRef(null);
  const password=useRef(null);
  const handleClick=()=>{
   const message=Validate(email.current.value,password.current.value);
   setErrmessage(message);
   if(message) return;

   if(!isSignInForm){
    createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
  .then((userCredential) => {

    // Signed in 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: user.current.value
    }).then(() => {
      const {uid,email,displayName}=auth.currentUser;
      dispatch(
        addUser({
          uid: uid,
          email: email,
          displayName: displayName,
        })
      );
     
    })
    .catch((error) => {
      setErrmessage(error.message);
    });
    console.log(user);
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrmessage(error.code + " " + error.message);
    
  });
   }else{
    signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
  
    const user = userCredential.user;

 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrmessage(error.code + " " + error.message);
  });
   }

   
  }

  const handleSignIn= () =>{
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
   <Header/>
   <div className="absolute">
   <img src={IMG_URL} 
   alt="background-image"/>
   </div>
   <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg opacity-90">
    <h1 className="font-bold text-3xl py-4">{isSignInForm? "Sign In":"Sign Up"}</h1>
    
    {!isSignInForm &&
    (<input 
    type="text" 
    placeholder="Name" 
    className="p-4 my-4 w-full bg-gray-800 rounded-lg"/>)}

{!isSignInForm &&
    (<input 
    type="number" 
    placeholder="Phone Number" 
    className="p-4 my-4 w-full bg-gray-800 rounded-lg"/>)}
    
    <input 
    ref={email}
    type="text" 
    placeholder="Email Address" 
    className="p-4 my-4 w-full bg-gray-800 rounded-lg"/>
    
    <input
    ref={password} 
    type="password" 
    placeholder="Password" 
    className="p-4 my-4 w-full bg-gray-800 rounded-lg"/>
    <p className="text-lg text-red-500 font-bold">{errMessage}</p>
    
    <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleClick}>{isSignInForm? "Sign In":"Sign Up"}</button>
    <p className="py-4 text-white cursor-pointer " onClick={handleSignIn}>{isSignInForm?"New to Netflix? Sign Up Now.":"Already a User!! Sign In. "}</p>
   </form>
    </div>
  )
}

export default Login
