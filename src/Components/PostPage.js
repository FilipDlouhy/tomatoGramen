import React, { useEffect, useState } from 'react'
import Coding from '../img/Coding.jpg'
import instaLogo from '../img/instaLogo.png'
import Message from '../img/Message.svg'
import Hearth from '../img/Hearth.svg'
import Visit from '../img/Visit.svg'
import Send from '../img/Send.svg'
import { Link, useNavigate } from 'react-router-dom'
import { getDatabase,  remove,  set,child } from "firebase/database";
import {ref as Ref} from  "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import {getDownloadURL,getStorage,uploadBytesResumable, ref, uploadBytes, getBlob,StorageReference, listAll,list} from 'firebase/storage'

import PostPagePostComment from './PostPagePostComment'
function PostPage(props) {
    const [likeCount,setLikeCount] = useState()
    const [comment,setComment] = useState()
    const [showDelete,setShowDelete] = useState(false)
    const storage = getStorage()
    const db = getDatabase()
    const[liked,setLiked] = useState(false)
    const navigate = useNavigate()
    const [postUser,setPostUser]= useState()
        const [postComments,setPostComments]=useState()
useEffect(()=>{
    console.log(props.user.userId)
    setLiked(false)
    let postPic 
    let profilePic
    let bio;
    fetch( `https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.userPostId}.json`)
    .then((response) => response.json())
    .then((data) =>  getDownloadURL(ref(storage,`${props.userPostId}/profile.jpg`)).then((url)=>{profilePic = url}).then(()=>{
        getDownloadURL(ref(storage,`${props.userPostId}/posts/${props.postId}`)).then(url=>{
                postPic=url
}).then(()=>{
            fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.userPostId}/posts/${props.postId}.json`)
  .then((response) => response.json())
  .then((data) => bio = data.postBio).then(()=>{
    setPostUser({
        normalName:data.normalName,
        displayName:data.displayName,
        postImg:postPic,
        profileImg:profilePic,
        postBio:bio
    })
  });
})}
   
))
console.log(props.user.userId)
console.log(props.postId)
getComents()


fetch( `https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.userPostId}/posts/${props.postId}/likes.json`)
.then((response) => response.json()).then((data)=>{
  
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



},[])









const getComents =  ()=>{

      fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.user.userId}/posts/${props.postId}/coments.json`).then((res)=>res.json()).then((data)=>{
        let arr=[]
      
      if (data=== null){
        setPostComments(arr)
        }else{
            Object.values(data).map((comment)=>{
                let coment ;
                getDownloadURL(ref(storage,`${comment.userId}/profile.jpg`)).then((url)=>{coment={userName:comment.userName,
                userId:comment.userId,
            profilePhoto:url,
            comment:comment.comment
            }
            arr.push(coment)
            }
            ).then(()=>{
             setPostComments(arr)
            
            })
            
            })
        }


        })
    }
















  return (
    <div className='post-page'>
        <div className='post-page-post'>
             <div className='post-page-post-img'>
                <img src={postUser && postUser.postImg}></img>
             </div>
             <div className='post-page-post-right'>
                <div className='post-page-post-right-profile'>
                <Link to='/profile'> <img src={postUser && postUser.profileImg}></img></Link>   
                    <div>
                        <h1><Link to='/profile'>{postUser && postUser.normalName}</Link></h1>
                        <p>@{postUser && postUser.displayName}</p>
                    </div>
                </div>
                <div className='post-page-post-description'>
                    <p>{postUser && postUser.postBio}</p>
                </div>
                <div className='post-page-post-coments'>
                   
                    


                        {postComments && postComments.map((coment)=>{
                            return <PostPagePostComment deleteHeaderMenuItemADDHOME={props.deleteHeaderMenuItemADDHOME} user={props.user} setRandomProfilePosts={props.setRandomProfilePosts} randomSetUser={props.randomSetUser} comment={coment.comment} name={coment.userName} id={coment.userId} img={coment.profilePhoto}/>
                        })}


                </div>
                <div className='post-page-post-footer'>
                        <div  className='post-page-post-footer-icons'>
                            <div className='post-page-post-footer-icons-right'> 
                                <img className={liked ?'liked post-page-heart' :' post-page-heart'}
                                onClick={(e)=>{
                                  console.log( e.target.classList)
                                  if(e.target.classList.contains('liked'))
                                  {        remove(Ref(db,`users/${props.user.userId}/posts/${props.postId}/likes/${props.user.userId}}`), {
                                    userId:props.user.userId
                                      });
                                    
                                    setLiked(false)
                                    setLikeCount(likeCount-1)
                                    
                                  }else{
                                    set(Ref(db,`users/${props.user.userId}/posts/${props.postId}/likes/${props.user.userId}}`), {
                                    userId:props.user.userId
                                      });
                                    
                                    setLiked(true)
                                    setLikeCount(likeCount+1)
                                  }

                                }}
                                src={Hearth}></img>
                                <img className='post-page-icon'  src={Message}></img>
<img className='post-page-icon' src={Visit}></img>
                            </div>
                            <div className='post-page-post-footer-icons-left'>
                                <p onClick={()=>{
                                    setShowDelete(!showDelete)
                                }} > ...</p>
                            </div>
                        </div>
                        <div className='post-page-post-likes'>
                            <p> {likeCount} Likes</p>
                        </div>
                        <div className='post-page-post-add-coment'>
                            <input onChange={(e)=>setComment(e.target.value)} type='text' placeholder='Add comment'></input>
                            <img  src={Send} onClick={(e)=>{
                                 let arr
if(postComments){
    arr = Object.values(postComments)
}else{
    arr=[]
}

console.log('AAA')
          let coment ;
getDownloadURL(ref(storage,`${props.user.userId}/profile.jpg`)).then((url)=>{
    console.log(url)

    coment={userName:props.user.displayName,
        userId:props.user.userId,
 
      comment:comment
      }
      set(Ref(db, `users/${props.user.userId}/posts/${props.postId}/coments/${uuidv4()}`), coment)
      console.log(coment)
  
      coment={userName:props.user.displayName,
        userId:props.user.userId,
        profilePhoto:url,
      comment:comment
      }
      arr.push(coment)
   
   }).then(()=>{

  setPostComments(arr)
  e.target.parentElement.firstChild.value = ' '
  console.log(  e.target.parentElement.firstChild)
   })
    }} ></img>
                        </div>

                </div>
        </div>
        </div>
    

<div className={ showDelete ? 'delete-post': 'unshow' }>
<p onClick={()=>{
    let ARR =[]
props.profilePosts.map((post)=>{
    if(post.postId === props.postId){
        console.log('SSS')
       
        props.setPostLength(props.postsLength -1 )
   let  ref =Ref(db,`users/${post.userId}/posts`)
   remove(child(ref,post.postId))
    }else{
        ARR.push(post)
    }
})
console.log(ARR)
props.setProfilePosts(ARR)

navigate('/profile')
}}> Delete post</p>
</div>

 
    </div>
  )
}

export default PostPage

/*      */