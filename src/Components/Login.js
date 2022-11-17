import React from 'react'
import ProfilePost from './ProfilePost'
import { Link } from 'react-router-dom'
import instaLogo from '../img/instaLogo.png'
import { UserAuth } from '../context/AuthContext'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {getDownloadURL,getStorage,uploadBytesResumable, ref, uploadBytes, getBlob,StorageReference, listAll,list} from 'firebase/storage'

function Login(props) {
const storage = getStorage()

function getPosts(user){
  fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${user.uid}/posts.json`).then((res)=>res.json()).
  then((data) => { 
      let allPosts=[]
       Object.values(data).map((post)=>{
      let Post ;
    getDownloadURL(ref(storage,`${user.uid}/posts/${post.postId}`)).then(url=>{
      Post={ userId: user.uid,
 postId:   post.postId ,
 postImg: url
}
      
     allPosts.push(Post)
  
      }).then(()=>{ 
        if(allPosts.length===  Object.values(data).length){
  props.setProfilePosts(allPosts)
  props.setPostLength(allPosts.length)
      } })
 
  
    })
  
  })
}



    const navigate = useNavigate();
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')

    const handleSubmit =   (e) => {
        e.preventDefault();
      
        const auth = getAuth();
           signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
       
       
            const user = userCredential.user;

            console.log(user)
fetch('https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users.json').then((response) => response.json())
.then((data) => Object.values(data).map(loginUser=>{
  if(loginUser.userId=== user.uid){
    let arr =[]
if(loginUser.Folowers){
 
  props.setFolowersLength(Object.values(loginUser.Folowers).length)
  Object.values(loginUser.Folowers).map((folower)=>{
    let FOLOWER 
    getDownloadURL(ref(storage,`${folower.userId}/profile.jpg`)).then((url)=>{
      FOLOWER = {
userId:folower.userId,
userName:folower.userName,
profilePhoto:url

    }
    console.log(url)
  arr.push(FOLOWER)
  
  }).then(()=>{
    
    console.log(arr)
    props.setFolowersArr(arr)})
  })
}else{
  props.setFolowersLength(0)
  props.setFolowersArr([])
}
if(loginUser.Folowing){
  let arr =[]
  props.setFolowLength(Object.values(loginUser.Folowing).length)

  Object.values(loginUser.Folowing).map((folower)=>{
    let FOLOWER 
    getDownloadURL(ref(storage,`${folower.userId}/profile.jpg`)).then((url)=>{
      console.log(url)
      FOLOWER = {
userId:folower.userId,
userName:folower.userName,
profilePhoto:url

    }
  arr.push(FOLOWER)
  
  }).then(()=>{
    console.log(arr)
    props.setFolowArr(arr)})
  })


}else{
  props.setFolowLength(0)
  props.setFolowArr([])
}
if(loginUser.posts){
  props.setPostLength (Object.values( loginUser.posts).length)

 
}else{
  props.setPostLength (0)
}
  
getDownloadURL(ref(storage,`${user.uid}/background/background.jpg`)).then((url)=>{
  loginUser = {...loginUser,
 backgroundPhoto:url}

   }).then(()=>{
     getDownloadURL(ref(storage,`${user.uid}/profile.jpg`)).then((url)=>{
       loginUser = {...loginUser,
         profilePhoto:url}
         props.setUser(loginUser)
         getPosts(user)
     })
   })
 


  }
}))
  })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
          navigate('/profile')     };
  return (
    <div className='singIn'>
            <form className='singIn-form'>
      
                <h1> Login for Tomatogram</h1>
               <Link to='/'><h1> Or you dont have have an account</h1></Link> 
                <label>
       
          <input required onChange={(e)=>setEmail(e.target.value)}  placeholder='Email' type='email' />
        </label>
      
        <label>
   
          <input required type="password" placeholder='Password'   onChange={(e)=>setPassword(e.target.value)}/>
        </label>
      
        <button onClick={(e)=>{handleSubmit(e) ;
          props.showHeader(true)}}>Login</button>
            </form>
    </div>
  )
}

export default Login

/* */