import React, { useEffect, useState } from 'react'
import background from '../img/background.jpg'
import instaLogo from '../img/instaLogo.png'
import Coding from '../img/Coding.jpg'
import ProfilePost from './ProfilePost'
import { Link, useNavigate } from 'react-router-dom'
import {getDownloadURL,getStorage,uploadBytesResumable, ref, uploadBytes, getBlob,StorageReference, listAll,list} from 'firebase/storage'
import { auth } from '../firebase';
import { ref as Sref} from 'firebase/storage'
import { ref as Dref} from 'firebase/database'
import RandomProfilePost from './RandomProfilePost'
import { getDatabase, set,remove } from "firebase/database";

function RandomUserProfile(props) {

const [folow,setFolow] =useState(true)
  const storage = getStorage()
const db = getDatabase()
const[folowers,setFolower] = useState()
const [folowing,setFolowing] = useState()
useEffect(()=>{
  setFolow(true)

if(props.randomUser){

    if(props.randomUser.Folowers){
        setFolower(Object.values(props.randomUser.Folowers).length)
      }else{
        setFolower(0)
      }
      if(props.randomUser.Folowing){
        console.log('kkk')
        setFolowing(Object.values(props.randomUser.Folowing).length)
       
   
           


      }else{
        setFolowing(0)
      }
      if(props.randomUser.posts){props.setPostLength (Object.values( props.randomUser.posts).length)}
      else{
        props.setPostLength (0)
      }
          
}
if(props.folowArr){
  Object.values(props.folowArr).map((folower)=>{

    if( folower.userId === props.randomUser.userId){
     setFolow(false)

    }
})
}


if(props.randomUser.Folowers){
  console.log(props.randomUser.Folowers)
let arr = []
  Object.values(props.randomUser.Folowers).map((folower)=>{

    getDownloadURL(Sref(storage,`${folower.userId}/profile.jpg`)).then((url)=>{
      console.log(url)
      let Folower ;
      Folower={...folower,
     profilePhoto :url}
     arr.push(Folower)
     })

  }) 


 props.RsetFolowersArr(arr)


}else{
  
 props.RsetFolowersArr([])

}


if(props.randomUser.Folowing){
  let arr = []
    Object.values(props.randomUser.Folowing).map((folower)=>{
  
      getDownloadURL(Sref(storage,`${folower.userId}/profile.jpg`)).then((url)=>{
        console.log(url)
        let Folower ;
        Folower={...folower,
       profilePhoto :url}
       arr.push(Folower)
       })
  
    }) 
  
  
   props.RsetFolowArr(arr)
  
  
  }else{
    
   props.RsetFolowArr([])
  
  }


},[props.randomUser])


function addFollow(){
    if(folow){ 
      let arr = props.folowArr
      let folow
        set(Dref(db, `users/${props.user.userId}/Folowing/${props.randomUser.userId}`), {
            userId:props.randomUser.userId,
            userName:props.randomUser.normalName,
            displayName:props.randomUser.displayName
            });
            set(Dref(db, `users/${props.randomUser.userId}/Folowers/${ props.user.userId}`), {
              userId:props.user.userId,
              userName:props.user.normalName,
              displayName:props.user.displayName
              });

              getDownloadURL(ref(storage,`${props.randomUser.userId}/profile.jpg`)).then((url)=>{
                folow = {
          userId:props.randomUser.userId,
          userName:props.randomUser.normalName,
          profilePhoto:url,
          displayName:props.randomUser.displayName
          
              }
             
       arr.push(folow)
            
            }).then(()=>{props.setFolowArr(arr)})



             setFolower(folowers+1)
        
              setFolow(false)
    }else{
        setFolower(folowers-1)
        remove(Dref(db, `users/${props.user.userId}/Folowing/${props.randomUser.userId}`), {
          userId:props.randomUser.userId,
          userName:props.randomUser.normalName,
          displayName:props.randomUser.displayName
            });
            remove(Dref(db, `users/${props.randomUser.userId}/Folowers/${props.user.userId}`), {
              userId:props.user.userId,
              userName:props.user.normalName,
              displayName:props.user.displayName
              });
            
       
              setFolow(true)
              let arr =[]
              console.log(arr)
props.folowArr.map((folower)=>{
  if(folower.userId !== props.randomUser.userId){
arr.push(folower)
  }
})
console.log(arr)

props.setFolowArr(arr)

    }

    } 



  return (
    <div className='profile'>
<div className='profile-header'>
<img src={ props.randomUser &&  props.randomUser.backgroundPhoto }></img>
</div>
<div className='profile-page-footer'>
        <div className='profile-page-info'>
            <img className='profile-page-info-logo' src={ props.randomUser &&  props.randomUser.profilePhoto }></img>
            <div className='profile-page-info-stats'>
                <p className='profile-page-info-stats-name'>{ props.randomUser && props.randomUser.normalName}</p>
                <p className='profile-page-info-stats-email' >@{ props.randomUser && props.randomUser.displayName}</p>
                <p className='profile-page-info-stats-posts'>  <span>{ props.randomUser &&  props.postsLength}</span> Posts</p>
            </div>

            <div className='profile-page-info-folow'>
                <div onClick={()=>{
                    props.showBackground(true)
                    props.RsetShowFolow(true)
               props.RsetFolowers(true)  
                  }}> 
                    <p className='profile-page-info-folow-stat'>{folowers}</p>
                    <p  className='profile-page-info-folow-name'>Followers</p>
                </div>
                <div onClick={()=>{
                    props.showBackground(true)
                    props.RsetShowFolow(true)
                    props.RsetFolowers(false)
                }}>
                    <p className='profile-page-info-folow-stat'>{folowing}</p>
                    <p  className='profile-page-info-folow-name'>Following</p>
                </div>
            </div>

            <div className='profile-page-info-bio'>
                <p className='profile-page-info-bio-heading'>Bio</p>
                <p>{ props.randomUser && props.randomUser.bio}</p>
            </div>

        </div>


    <div className='profile-posts'>
  {props.randomProfilePosts&& props.randomProfilePosts.map((post)=>{


return <RandomProfilePost  setUserPostId ={props.setUserPostId} setPostId={props.setPostId} userId={post.userId}   postId={post.postId} postImg={post.postImg}/>

  })}
  
       </div>  


        <div className='profile-edit'>
            <button onClick={()=>{
                addFollow()
            }}  >{folow ? 'Follow' : 'Unfollow'}</button>
        </div>


</div>

    </div>
  )
}

export default RandomUserProfile

