import React, { useEffect, useState } from 'react'
import { remove } from "firebase/database"
import { ref as Dref } from "firebase/database"
import { set } from "firebase/database"
import { getDatabase } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import {getDownloadURL,getStorage,uploadBytesResumable, uploadBytes, getBlob,StorageReference, listAll,list} from 'firebase/storage'

import {ref as Sref} from 'firebase/storage'

function FolowPerson(props) {
    const db = getDatabase()

    const navigate = useNavigate()
const [ folows,setFolows] = useState(false)
const storage = getStorage()
const [displayNameN,setDisplayName] = useState()

useEffect(()=>{
if(props.folowArr){
  Object.values( props.folowArr).map((folewr)=>{

    if(props.userId === folewr.userId){
     
  
   setFolows(true)
    }
  
  })
}


if(props.userId === props.user.userId){
  setFolows(true)
   }

console.log(props.displayName)





},[props.Rfolowers])




    function getPosts(){
        props.setRandomProfilePosts([])
        fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.userId}/posts.json`).then((res)=>res.json()).
        then((data) => { 
            let allPosts=[]
             Object.values(data).map((post)=>{
            let Post ;
          getDownloadURL(Sref(storage,`${props.userId}/posts/${post.postId}`)).then(url=>{
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
      
        if(props.userId === props.user.userId){
          navigate('/profile')
        }else{

          fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.userId}.json`).then((res)=>res.json()).then((data)=>{
            let randomMan = data
            getDownloadURL(Sref(storage,`${props.userId}/background/background.jpg`)).then((url)=>{
              randomMan = {...randomMan,
          backgroundPhoto:url}
          
            }).then(()=>{
              getDownloadURL(Sref(storage,`${props.userId}/profile.jpg`)).then((url)=>{
                randomMan = {...randomMan,
                  profilePhoto:url}
                props.randomSetUser(randomMan)
                  getPosts()
                  navigate('/randomUser')
              })
            })
        })
        }


        
      }













  return (
    <div id={props.userId} className='folow-person'>
    <div className='folor-person-right'  onClick={()=>{

toProfile ()

props.deleteHeaderMenuItemADDHOME()


    }}>
        <div className='folor-person-right-logo'>
            <img src={props.profilePhoto} ></img>
        </div>
        <div className='folor-person-right-name'>
                <h1>{props.userName}</h1>
               
        </div>
    </div>
    <div className='folor-person-left'>
        <button onClick={(e)=>{

if(props.userId === props.user.userId){
  if(folows){

    remove(Dref(db,`users/${props.user.userId}/Folowing/${props.userId}`), {
  userId:props.userId,
  userName:props.userName,
  displayName:props.displayName
        });
        remove(Dref(db,`users/${ props.userId}/Folowing/${props.user.userId}`), {
          userId:props.userId,
      userName:props.userName,
      displayName:props.user.displayName
            });
    setFolows(false)
  
  }else{

      
          set(Dref(db,`users/${ props.userId}/Folowing/${props.user.userId}`), {
            userId:props.userId,
            userName:props.userName,
            displayName:props.user.displayName
              });
              set(Dref(db,`users/${props.user.userId}/Folowing/${props.userId}`),{
                userId:props.userId,
                userName:props.userName,
                displayName:props.displayName
                  });


      

    setFolows(true)
  }
}else{

  if(folows){

    remove(Dref(db,`users/${props.user.userId}/Folowing/${props.userId}`), {
      userId:props.userId,
      userName:props.userName,
      displayName:props.displayName
        });
    setFolows(false)
    let arr = []
    Object.values(props.folowArr).map((folower)=>{
      if(folower.userId !== props.userId){
        arr.push(folower)
console.log('sss')
      }})
    console.log(arr)

    props.setFolowArr(arr)
  }else{
    let arr =  Object.values(props.folowArr)
    console.log(arr)
    let     user ={     userId:props.userId,
      userName:props.userName,
      displayName:props.displayName
    }
    set(Dref(db,`users/${props.user.userId}/Folowing/${props.userId}`), user);
    setFolows(true)
 
    getDownloadURL(Sref(storage,`${props.userId}/profile.jpg`)).then((url)=>{

      user ={     userId:props.userId,
        userName:props.userName,
        displayName:props.displayName,
        profilePhoto:url
      }

 
      console.log(arr)
      arr.push(user)
      
      props.setFolowArr(arr)
   
    })
    
}









        }}}>{folows ? 'Unfollow' :'Follow'}</button>
    </div>
</div>
  )
}

export default FolowPerson