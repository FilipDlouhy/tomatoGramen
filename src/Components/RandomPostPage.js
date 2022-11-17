import React, { useEffect, useState } from 'react'
import Coding from '../img/Coding.jpg'
import instaLogo from '../img/instaLogo.png'
import Message from '../img/Message.svg'
import Hearth from '../img/Hearth.svg'
import Visit from '../img/Visit.svg'
import Send from '../img/Send.svg'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getDatabase,  set,remove } from "firebase/database";
import {ref as Ref} from  "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import {getDownloadURL,getStorage,uploadBytesResumable, ref, uploadBytes, getBlob,StorageReference, listAll,list} from 'firebase/storage'
import RandomPostPageComment from './RandomPostPageComment'
function RandomPostPage(props) {
    const storage = getStorage()
    const [postUser,setPostUser]= useState()
const [comment,setComment]  = useState()
    const [postComments,setPostComments]=useState()
    const db = getDatabase()
    const navigate= useNavigate()
    const [likeCount,setLikeCount] = useState()
    const[liked,setLiked] = useState(false)
    const addComent = (newComent) =>{
      let arr = []
      postComments.map((comment)=>arr.push(comment))
      arr.push(newComent)
      setPostComments(arr)
      
    }

useEffect(()=>{

console.log(props)
setLiked(false)
    getComents()
    console.log(props.postId)
    console.log(props.userPostId)
    let postPic 
    let profilePic
    let bio;
    console.log(props.userPostId)
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
fetch( `https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.userPostId}/posts/${props.postId}/likes.json`)
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


toProfile()

},[])


function getPosts(){
    props.setRandomProfilePosts([])
    fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.userPostId}/posts.json`).then((res)=>res.json()).
    then((data) => { 
        let allPosts=[]
         Object.values(data).map((post)=>{
        let Post ;
      getDownloadURL(ref(storage,`${props.userPostId}/posts/${post.postId}`)).then(url=>{
        Post={ userId: props.userPostId,
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
  

const getComents =  ()=>{

    fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.userPostId}/posts/${props.postId}/coments.json`).then((res)=>res.json()).then((data)=>{
  let arr=[]
  console.log(data)
  if(data === null){
    setPostComments([])
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



function toProfile(){
    fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.userPostId}.json`).then((res)=>res.json())
.then((data)=>{
    let randomMan = data
    console.log(randomMan)
    getDownloadURL(ref(storage,`${props.userPostId}/background/background.jpg`)).then((url)=>{
        console.log(url)
        randomMan = {...randomMan,
    backgroundPhoto:url}
    
      }).then(()=>{
        getDownloadURL(ref(storage,`${props.userPostId}/profile.jpg`)).then((url)=>{
            console.log(url)
          randomMan = {...randomMan,
            profilePhoto:url}
            console.log(randomMan)
          props.randomSetUser(randomMan)
            getPosts()
        
        })
      })
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
                <a  > <img  onClick={()=>{
           
                   navigate('/randomUser')
                   props.deleteHeaderMenuItemADDHOME()
                }} src={postUser && postUser.profileImg}></img></a>   
                    <div>
                        <h1  onClick={()=>{
                        
                   navigate('/randomUser')
                }}  ><a>{postUser && postUser.normalName}</a></h1>
                        <p   onClick={()=>{
                    props.deleteHeaderMenuItemADDHOME()
                   navigate('/randomUser')
                }} >@{postUser && postUser.displayName}</p>
                    </div>
                </div>
                <div className='post-page-post-description'>
                    <p>{postUser && postUser.postBio}</p>
                </div>
                <div className='post-page-post-coments'>
                   
                       
                        {postComments && postComments.map((coment)=>{
                            return <RandomPostPageComment deleteHeaderMenuItemADDHOME={props.deleteHeaderMenuItemADDHOME}user={props.user} setRandomProfilePosts={props.setRandomProfilePosts} randomSetUser={props.randomSetUser} comment={coment.comment} name={coment.userName} id={coment.userId} img={coment.profilePhoto}/>
                        })}
                </div>
                <div className='post-page-post-footer'>
                        <div  className='post-page-post-footer-icons'>
                            <div className='post-page-post-footer-icons-right'> 
                                <img  className={liked ?'liked post-page-heart' :' post-page-heart'}  onClick={(e)=>{
              console.log( e.target.classList)
              if(e.target.classList.contains('liked'))
              {        remove(Ref(db,`users/${props.userPostId}/posts/${props.postId}/likes/${props.user.userId}}`), {
                userId:props.user.userId
                  });
                
                setLiked(false)
                setLikeCount(likeCount-1)
                
              }else{
                set(Ref(db,`users/${props.userPostId}/posts/${props.postId}/likes/${props.user.userId}}`), {
                userId:props.user.userId
                  });
                
                setLiked(true)
                setLikeCount(likeCount+1)
              }

            }}  src={Hearth}></img>
                                <img className='post-page-icon'  src={Message}></img>
                                <img className='post-page-icon' src={Visit}></img>
                            </div>
                            <div className='post-page-post-footer-icons-left'>
                                <p> ...</p>
                            </div>
                        </div>
                        <div className='post-page-post-likes'>
                            <p>{likeCount} Likes</p>
                        </div>
                        <div className='post-page-post-add-coment'>
                            <input onChange={(e)=>{setComment(e.target.value)}} type='text' placeholder='Add comment'></input>
                            <img  src={Send} onClick={(e)=>{
                             let   arr;
                             console.log(postComments)
                                if(postComments !== null  || postComments !== undefined){
 
                                    arr=[]
                                                }else{
                                                    arr = Object.values(postComments)
                                                }
                  
                                  let coment ;
                      getDownloadURL(ref(storage,`${props.user.userId}/profile.jpg`)).then((url)=>{
                            console.log(url)
          
                            coment={userName:props.user.displayName,
                                userId:props.user.userId,
                         
                              comment:comment
                              }
                              set(Ref(db, `users/${props.userPostId}/posts/${props.postId}/coments/${uuidv4()}`), coment)
                              console.log(coment)
                          
                              coment={userName:props.user.displayName,
                                userId:props.user.userId,
                                profilePhoto:url,
                              comment:comment
                              }
                              arr.push(coment)
                           
                           }).then(()=>{
                            setComment([])
                         arr.map((coment=>{
                          addComent(coment)
                         }))
                          e.target.parentElement.firstChild.value = ' '
                          console.log(  e.target.parentElement.firstChild)
                           })
                            }} ></img>
                        </div>

                </div>
        </div>
        </div>
  
    </div>
  )
}

export default RandomPostPage