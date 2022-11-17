import React, { useEffect, useState } from 'react'
import { ref as Sref } from "firebase/storage"

import { getDatabase } from 'firebase/database';
import {getDownloadURL,getStorage,uploadBytesResumable, uploadBytes, getBlob,StorageReference, listAll,list} from 'firebase/storage'

import { useNavigate } from 'react-router-dom';


  
function SuggestedFollow(props) {
const [profilePhoto,setProfilePhoto] = useState()
  const db = getDatabase()

  const navigate = useNavigate()

const storage = getStorage()

    function getPosts(){
        props.setRandomProfilePosts([])
        fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.user.userId}/posts.json`).then((res)=>res.json()).
        then((data) => { 
            let allPosts=[]
             Object.values(data).map((post)=>{
            let Post ;
          getDownloadURL(Sref(storage,`${props.user.userId}/posts/${post.postId}`)).then(url=>{
            Post={ userId:props.userId,
       postId:   post.postId ,
       postImg: url
      }
            
           allPosts.push(Post)
        
            }).then(()=>{ 
              if(allPosts.length===  Object.values(data).length){
                props.setRandomProfilePosts(allPosts)
                props.setPostLength(allPosts.length)
            } })
       
        
          })
        
        })
      }
      
      function toProfile (){
        fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.user.userId}.json`).then((res)=>res.json()).then((data)=>{
            let randomMan = data
            getDownloadURL(Sref(storage,`${props.user.userId}/background/background.jpg`)).then((url)=>{
              randomMan = {...randomMan,
          backgroundPhoto:url}
          
            }).then(()=>{
              getDownloadURL(Sref(storage,`${props.user.userId}/profile.jpg`)).then((url)=>{
                randomMan = {...randomMan,
                  profilePhoto:url}
                props.randomSetUser(randomMan)
                  getPosts()
                  navigate('/randomUser')
              })
            })
        })
        
      }

      useEffect(()=>{
        getDownloadURL(Sref(storage,`${props.user.userId}/profile.jpg`)).then(url=>{
          setProfilePhoto(url)
   })
      },[])
  return (
    <div onClick={()=>{
      toProfile()
    }} className='SuggestedFollow'>
<img src={profilePhoto && profilePhoto}></img>
<p>{props.user.normalName}</p>
    </div>
  )
}

export default SuggestedFollow