import React, { cloneElement, useEffect, useState } from 'react'
import instaLogo from '../img/instaLogo.png'
import Home from '../img/Home.svg'
import Profile from '../img/Profile.svg'
import Message from '../img/Message.svg'
import Hearth from '../img/Hearth.svg'
import Visit from '../img/Visit.svg'
import Links from '../img/Link.svg'
import Send from '../img/Send.svg'
import Coding from '../img/Coding.jpg'
import { Link,useNavigate } from 'react-router-dom'
import SmallPostComent from './SmallPostComent'
import { getDatabase, ref, set ,remove} from "firebase/database";
import { async } from '@firebase/util'
import { v4 as uuidv4 } from 'uuid';
import {getDownloadURL,getStorage,uploadBytesResumable, uploadBytes, getBlob,StorageReference, listAll,list} from 'firebase/storage'
import {ref as Sref} from 'firebase/storage'
function Post(props) {
  const database = getDatabase()
 
  const [likeCount,setLikeCount] = useState()
  const[liked,setLiked] = useState(false)
 const [comment,setCommet] = useState()
  const navigate= useNavigate()
const [postComments,setPostComments] = useState() 
const [count, setCount]= useState(0)
 const storage = getStorage()


 const [displayName,setDisplayName] =useState()
const addComment = (event)=>{
  let arr
 let comentar ={
  comment:comment,

  userName:props.user.displayName,
  
  userId:props.user.userId}
 set(ref(database, `users/${props.post.userId}/posts/${props.postId}/coments/${uuidv4()}`), comentar);
 if(postComments){
   arr = postComments
 }else{
   arr =[]
 }

arr.slice(arr.length-1,1)
arr.push(comentar)

  setPostComments(arr)
  event.target.parentElement.firstChild.value = ' '

setCount(count+1)
}


function getPosts(){
  props.setRandomProfilePosts([])
  fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.post.userId}/posts.json`).then((res)=>res.json()).
  then((data) => { 
      let allPosts=[]
       Object.values(data).map((post)=>{
      let Post ;
    getDownloadURL(Sref(storage,`${props.post.userId}/posts/${post.postId}`)).then(url=>{
      Post={ userId: props.post.userId,
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
    
  let randomMan

  fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.post.userId}.json`).then((res)=>res.json()).
  then((data) => { 

    randomMan = data

    getDownloadURL(Sref(storage,`${props.post.userId}/background/background.jpg`)).then((url)=>{
        randomMan = {...randomMan,
    backgroundPhoto:url}
    
      }).then(()=>{
        getDownloadURL(Sref(storage,`${props.post.userId}/profile.jpg`)).then((url)=>{
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
console.log(props.post.postId)
console.log(props.post.userId)
setLiked(false)
fetch( `https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.post.userId}/posts/${props.post.postId}/likes.json`)
.then((response) => response.json()).then((data)=>{
  console.log(data)
if(data===null){

    setLikeCount(0)
}else{
    Object.values(data).map((like,index)=>{
        if(like.userId=== props.user.userId){
            setLiked(true)
        }
        setLikeCount(index+1)
    })
}
})



  if(!postComments){
    getComents()
  }



  fetch( `https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.post.userId}.json`)
  .then((response) => response.json()).then((data)=>{
    setDisplayName(data.displayName)
  })






},[count])
const getComents =  ()=>{
let arr =[]
  fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.post.userId}/posts/${props.post.postId}/coments.json`).then((res)=>res.json()).then((data)=>{

if (data === null){
  setPostComments([])
} else{
  arr = (Object.values(data))
  setPostComments(arr)
}












    })
}

  return (
    <div className='post'>
        <div className='post-header'>
            <div  id={props.userId} className='post-header-left'>
              <img onClick={()=>{toProfile()
              props.deleteHeaderMenuItemADDHOME()}} src={ props.profileImg && props.profileImg}></img>
                <div onClick={()=>{toProfile()
                props.deleteHeaderMenuItemADDHOME()
                }}> 
                    
              <p className='post-profile-name'>{ props.normalName  && props.normalName}</p>  
                    <p className='post-email-name'>@{props.displayName && props.displayName}</p>
                  </div>
       
            </div>

           <p className='post-link'>  ...</p>
        </div>
        <div   className='post-img'>
          <div id={props.userId}>  <img  onClick={()=>{

            props.setUserPostId(props.post.userId)
            props.setPostId(props.post.postId)


if(props.post.userId=== props.user.userId){
  navigate('/postpage')
}else{
  navigate('/randomPostPage')
}
          }}id={props.postId}  src={props.postImg && props.postImg}></img></div> 
        </div>
        <div className='post-footer'>
            <div className='post-icons'>
            <img  className={liked ?'liked like-icon' :' like-icon'} onClick={(e)=>{
              console.log( e.target.classList)
              if(e.target.classList.contains('liked'))
              {        remove(ref(database,`users/${props.post.userId}/posts/${props.post.postId}/likes/${props.user.userId}}`), {
                userId:props.user.userId
                  });
                
                setLiked(false)
                setLikeCount(likeCount-1)
                
              }else{
                set(ref(database,`users/${props.post.userId}/posts/${props.post.postId}/likes/${props.user.userId}}`), {
                userId:props.user.userId
                  });
                
                setLiked(true)
                setLikeCount(likeCount+1)
              }

            }} src={Hearth}></img>
          <a id={props.userId} className='post-Link' ><img onClick={(event)=>{
      props.setPostId(props.post.postId)
props.setUserPostId(props.post.userId)
if(props.post.userId=== props.user.userId){
  navigate('/postpage')
}else{
  navigate('/randomPostPage')
}
          }}
          id={props.postId} src={Message}></img>
          </a>  
          <a id={props.userId} className='post-Link' >  <img
          onClick={(event)=>{
            
            props.setPostId(props.post.postId)
            props.setUserPostId(props.post.userId)
            if(props.post.userId=== props.user.userId){
              navigate('/postpage')
            }else{
              navigate('/randomPostPage')
            }
                      }}
          id={props.postId} src={Visit}></img></a>         
          <img   className='post-footer-link'src={Links}></img>
            </div>
          <div id={props.userId} className='coments'>
            <p className='likes'>{likeCount} likes</p>
            <p id={props.postId} onClick={(event)=>{
              props.setPostId(props.post.postId)
              props.setUserPostId(props.post.userId)
              if(props.post.userId=== props.user.userId){
                navigate('/postpage')
              }else{
                navigate('/randomPostPage')
              }
            }} className='view-all-coments'>View All Comments</p>
     
{postComments && postComments.map((comment,index)=>{
  if(  index === postComments.length-1 | index === postComments.length-2 ){
    return <SmallPostComent      deleteHeaderMenuItemADDHOME={     props.deleteHeaderMenuItemADDHOME} randomSetUser={props.randomSetUser} setRandomProfilePosts={props.setRandomProfilePosts} name={comment.userName} id={comment.userId} comment={comment.comment} />
  }
  

})}
     
          </div>
         </div>
            <div id={props.userId} className='add-coment'>
                <input onChange={(e)=>{setCommet(e.target.value)}} placeholder=' Add a comment'></input>
                <img src={Send} onClick={(event)=>addComment(event)} className='add-coment-icon'></img>
            </div>
    </div>
  )
}

export default Post