import React from 'react'
import {getDownloadURL,getStorage,uploadBytesResumable, ref, uploadBytes, getBlob,StorageReference, listAll,list} from 'firebase/storage'
import { useNavigate } from 'react-router-dom'



function SearchItem(props) {

    const storage = getStorage()
    function getPosts(){
      props.setRandomProfilePosts([])
        fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.userId}/posts.json`).then((res)=>res.json()).
        then((data) => { 
            let allPosts=[]
             Object.values(data).map((post)=>{
            let Post ;
          getDownloadURL(ref(storage,`${props.userId}/posts/${post.postId}`)).then(url=>{
            Post={ userId: props.userId,
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
    
        fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.userId}.json`).then((res)=>{
            res.json()
        }).then((data)=>{
            console.log(data)
             randomMan = data
            getDownloadURL(ref(storage,`${props.userId}/background/background.jpg`)).then((url)=>{
                randomMan = {...randomMan,
            backgroundPhoto:url}
            
              }).then(()=>{
                getDownloadURL(ref(storage,`${props.userId}/profile.jpg`)).then((url)=>{
                  randomMan = {...randomMan,
                    profilePhoto:url}
                  props.randomSetUser(randomMan)
                    getPosts()
                    navigate('/randomUser')
                })
              })
        })
       
      }


const navigate = useNavigate()
  return (
    <div onClick={()=>{fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.userId}.json`).then((response) => response.json())
    .then((data) => {props.randomSetUser(data)
    
    
        
        getDownloadURL(ref(storage,`${props.userId}/background/background.jpg`)).then((url)=>{
            data = {...data,
        backgroundPhoto:url}
     
          }).then(()=>{
            getDownloadURL(ref(storage,`${props.userId}/profile.jpg`)).then((url)=>{
                data = {...data,
                profilePhoto:url}
              props.randomSetUser(data)
                getPosts()
            navigate('/randomUser')
            props.deleteHeaderMenuItemADDHOME()
            })
          })
       
    
    })}}>
    <img src={props.img}></img> 
    <p>{props.name}</p>
</div>

  )
}

export default SearchItem
