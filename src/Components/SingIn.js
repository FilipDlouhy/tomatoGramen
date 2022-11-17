import { async } from '@firebase/util'
import Coding from '../img/Coding.jpg'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import instaLogo from '../img/instaLogo.png'
import { UserAuth } from '../context/AuthContext'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {getDownloadURL,getStorage, ref, uploadBytes} from 'firebase/storage'
import { storage } from '../firebase'
import { getDatabase, set } from "firebase/database";
import { ref as  Sref } from "firebase/database";
function SingIn(props) {

    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [normalName,setNormalName]= useState('')
    const [displayName,setDisplayName]= useState('')
    const [profilePhoto,setProfilePhoto]= useState()
    const [backgroundPhoto,setBackgroundPhoto]= useState()
const navigate = useNavigate()

   const uploadImage = (user)=>{
    const imageRef = ref(storage,`${user.uid}/profile.jpg`)
    uploadBytes(imageRef, profilePhoto).then(()=>{console.log("--")})
   }
   const uploadBackgrounfImage = (user)=>{
    const imageRef = ref(storage,`${user.uid}/background/background.jpg`)
    uploadBytes(imageRef, backgroundPhoto).then(()=>{console.log("--")})
   }
   const uploadToDatabase =(user) =>{
    const db = getDatabase();
    set(Sref( db,'users/'+user.uid),{
      userId:user.uid,
         displayName:displayName,
         email:email,
         normalName:normalName
         ,bio:'Augustus was the Greatest Roman Emperor'
 
   })
   }
    const handleSubmit =  (e)=>{

        e.preventDefault()
        const auth = getAuth();
  
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            user.displayName = displayName
            user.photoURL = profilePhoto;
       
            props.showHeader(true)
           console.log(user)
   
    
     
           uploadToDatabase(user)



props.setUser({  userId:user.uid,
  displayName:displayName,
  email:email,
  normalName:normalName,
  profilePhoto:     URL.createObjectURL(profilePhoto),
  bio:'Augustus was the Greatest Roman Emperor',
    backgroundPhoto:URL.createObjectURL(backgroundPhoto)})
    props.setFolowersLength(0)
    props.setFolowLength(0)
      props.setPostLength (0)

    uploadImage(user)
props.showHeader(true)
uploadBackgrounfImage(user)
props.setUserProfileImg(URL.createObjectURL(profilePhoto))
props.setBackgroundProfileImg(URL.createObjectURL(backgroundPhoto))



.catch((error) => {
  // Handle any errors
});

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
         
            // ..
          });

          navigate('/profile') 
       }
  return (
    <div className='singIn'>
   
            <form className='singIn-form' >
              
                <h1> Sing In for Tomatogram</h1>
               <Link to='/login'> <h1> Or dou you have an account</h1></Link>
                <label>
       
          <input required  type='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} />
        </label>
        <label>
           
          <input  required type="text" placeholder='Normal name' onChange={(e)=>{setDisplayName(e.target.value)}} />
        </label>
        <label>
           
           <input  required type="text" placeholder='Display name' onChange={(e)=>{setNormalName(e.target.value)}} />
         </label>
        <label>
     
          <input required  type="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} />
        </label>
        
        <label>
        
          <input required  className='sing-in-imput' onChange={(e)=>{setProfilePhoto(e.target.files[0])
        }} type="file" placeholder='Upload file'   accept="image/png, image/jpeg" />
        </label>
        <label>
        
        <input required  className='sing-in-imput' onChange={(e)=>{setBackgroundPhoto(e.target.files[0])
      }} type="file" placeholder='Upload file'   accept="image/png, image/jpeg" />
      </label>
        <button onClick={handleSubmit}>Sing in</button>
            </form>
            <img className='sing-in-img-profile' src={profilePhoto&& URL.createObjectURL(profilePhoto)}></img>
      <img className='sing-in-img-background' src={backgroundPhoto&& URL.createObjectURL(backgroundPhoto)}></img>
    </div>
  )
}

export default SingIn
/*

  <div className='profile-editor'>
                <h1 >Profile Edit</h1>
                <input id='file-input-logo' onChange={(e)=>{
                      props.setUserProfileImg(URL.createObjectURL(e.target.files[0]))
                }} type='file'  accept="image/png, image/jpeg"></input>
                <label  for="file-input-background"><img className='profile-editor-img' src={props.backgroundProfileImg}></img></label>
                <input id='file-input-background' onChange={(e)=>{
                props.setBackgroundProfileImg(URL.createObjectURL(e.target.files[0]))
                }} type='file'  accept="image/png, image/jpeg"></input>
               <label for='file-input-logo' ><img className='EditProfile-logo' src={props.userProfileImg}></img></label> 
                <form>
                    <p className='display-name-p' >Display name:</p>
                    <input className='display-name'  placeholder={props.user.displayName} type='text'></input>
                    <p className='display-name-p'>Normal name:</p>
                    <input className='display-name' placeholder={props.user.normalName} type='text'></input>
                    <p className='edit-bio-p'>Bio:</p>
                    <input className='edit-bio' placeholder={props.user.bio} type='text'></input>
                    <button>Save</button>
                </form>
               <Link to='/profile'>  <button className='view-profile-btn'>View Profile</button></Link>
        </div>


*/