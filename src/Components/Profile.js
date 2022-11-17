import React, { useEffect, useState } from 'react'
import background from '../img/background.jpg'
import instaLogo from '../img/instaLogo.png'
import Coding from '../img/Coding.jpg'
import ProfilePost from './ProfilePost'
import { Link, useNavigate } from 'react-router-dom'
import {getDownloadURL,getStorage,uploadBytesResumable, ref, uploadBytes, getBlob,StorageReference, listAll,list} from 'firebase/storage'
import { auth } from '../firebase';
import { ref as Sref} from 'firebase/storage'

function Profile(props) {
    
    


const navigate = useNavigate()
const [user,setUser] = useState()
const [postID,setPostID] = useState()

function fetchPosts(){
    let postsIds=[]
    let div = document.querySelector(".profile-posts")
    fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${auth.lastNotifiedUid}/posts/.json`)
    .then((response) => response.json())
    .then((data) =>  
    {       div.innerHTML=' '
      Object.values(data).map((post)=>{postsIds.push(post.postId)})
    console.log(postsIds)
    postsIds.map((postId)=>{
   
       setPostID()      
        div.innerHTML=' '
         getDownloadURL(ref(storage,`${auth.lastNotifiedUid}/posts/${postId}`)).then((url)=>{
   
        
        
              if(div.children.length===Object.values(props.user.posts).length-1){
                  console.log('dneska ne')
              }else{
                  div.innerHTML +=`    <div id='${props.user.userId}' class='profile-post'>
                  <a to='/postpage'> <img class='profile-post-img' id='${postId}'  src=${url}></img></a>
          
                  </div>` 
              
              
              }
            
          
          console.log()
          let posts = document.querySelectorAll('.profile-post-img')
          posts.forEach((post)=>{
      post.addEventListener('click',(event)=>{
         
          props.setUserPostId(event.target.parentElement.parentElement.id)
          props.setPostId(event.target.id)
          navigate('/postpage')
      })
          })
         })
    })
    }
    
    );
}








const [posts,setPosts]= useState([])

  const storage = getStorage()


useEffect(()=>{

if(props.profilePosts){

    props.setPostLength (props.profilePosts.length)
 
}

 

  
 
},[props.profilePosts])



function getPosts(){
  fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.user.userId}/posts.json`).then((res)=>res.json()).
  then((data) => { 
      let allPosts=[]
       Object.values(data).map((post)=>{
      let Post ;
    getDownloadURL(ref(storage,`${props.user.userId}/posts/${post.postId}`)).then(url=>{
      Post=`    <div id='${props.user.userId}' class='profile-post'>
      <a to='/postpage'> <img class='profile-post-img' id='${post.postId}'  src=${url}></img></a>

      </div>` 
     allPosts.push(Post)
  
      }).then(()=>{ 
        if(allPosts.length===  Object.values(data).length-1){
      setPosts(allPosts)
      console.log(allPosts)
      } })
 
  
    })
  
  })
}


  return (
    <div className='profile'>
<div className='profile-header'>
<img src={ props.user &&  props.user.backgroundPhoto }></img>
</div>
<div className='profile-page-footer'>
        <div className='profile-page-info'>
            <img className='profile-page-info-logo' src={ props.user &&  props.user.profilePhoto }></img>
            <div className='profile-page-info-stats'>
                <p className='profile-page-info-stats-name'>{ props.user && props.user.normalName}</p>
                <p className='profile-page-info-stats-email' >@{ props.user && props.user.displayName}</p>
                <p className='profile-page-info-stats-posts'>  <span>{ props.user &&  props.postsLength }</span> Posts</p>
            </div>

            <div className='profile-page-info-folow'>
                <div onClick={()=>{
                    props.showBackground(true)
                    props.showFolow(true)
                    props.setFolowers(true)
                }}> 
                    <p className='profile-page-info-folow-stat'>{props.folowersLength}</p>
                    <p  className='profile-page-info-folow-name'>Followers</p>
                </div>
                <div onClick={()=>{
                    props.showBackground(true)
                    props.showFolow(true)
                    props.setFolowers(false)
                }}>
                    <p className='profile-page-info-folow-stat'>{ props.folowArr && props.folowArr.length}</p>
                    <p  className='profile-page-info-folow-name'>Following</p>
                </div>
            </div>

            <div className='profile-page-info-bio'>
                <p className='profile-page-info-bio-heading'>Bio</p>
                <p>{ props.user && props.user.bio}</p>
            </div>

        </div>


    <div className='profile-posts'>
  {props.profilePosts&& props.profilePosts.map((post)=>{


return <ProfilePost  setUserPostId ={props.setUserPostId} setPostId={props.setPostId} userId={post.userId}   postId={post.postId} postImg={post.postImg}/>

  })}
  
       </div>  


        <div className='profile-edit'>
        <Link to='/edit'> <button>Edit </button> </Link>
            <button onClick={()=>{props.showForm(true)
            props.showBackground(true)}}>Add Post</button>
        </div>


</div>

    </div>
  )
}

export default Profile

/*               props.setUser({...props.user,backgroundPhoto:url})
    props.setBackgroundProfileImg(url) */