import React from 'react'
import instaLogo from '../img/instaLogo.png'
import { Link } from 'react-router-dom'
import {useEffect} from 'react'
import {getDownloadURL,getStorage, ref, uploadBytes} from 'firebase/storage'
import { storage } from '../firebase'
function SmallProfile(props) {
    const storage = getStorage();

    
useEffect(()=>{
    
  if(props.profilePosts){
    props.setPostLength (props.profilePosts.length)}

 
},[])


  return (
    <div className='smallProfile'>
       <Link to="/profile"> <div className='smallProfile-upper'>  
            <img   className='smallProfile-logo' src={props.user.profilePhoto } ></img>
            <div className='smallProfile-upper-div'>
                <p className='smallProfile-name'>{props.user.normalName}</p>
                <p className='smallProfile-email'>@{props.user.displayName}</p>
            </div>
        </div></Link>
                <div className='stats'>
                    <div onClick={()=>{
                        props.showFolow(true)
                        props.showBackground(true)
                    }} className='stat'>
                        <p>{props.folowersLength}</p>
                        <p>Folowers</p>
                    </div>
                    <div onClick={()=>{
                        props.showFolow(true)
                        props.showBackground(true)
                    }} className='stat'>
                        <p>{ props.folowArr && props.folowArr.length}</p>
                        <p>Folowing</p>
                    </div>
                    <div className='stat'>
                        <p>{props.postsLength} </p>
                        <p>Posts</p>
                  
                    </div>
                    <div onClick={()=>{props.showForm(true)
                    props.showBackground(true)}} className='stat'>
                                <p className='add-post-icon'>+</p>
                                <p>New Post</p>
                    </div>
                </div>
         </div>
  )
}

export default SmallProfile