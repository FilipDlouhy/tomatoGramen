import React from 'react'
import { ref,remove } from "firebase/database"
import { ref as Dref } from "firebase/database"
import { getDatabase } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import {getDownloadURL,getStorage,uploadBytesResumable, uploadBytes, getBlob,StorageReference, listAll,list} from 'firebase/storage'

import {ref as Sref} from 'firebase/storage'

function FolowPerson(props) {
    const db = getDatabase()

    const navigate = useNavigate()

const storage = getStorage()






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
          props.deleteHeaderMenuItemADDHOME()
           if(props.folowers){

            remove(Dref(db,`users/${props.userId}/Folowing/${props.user.userId}`), {
              userId:props.userId,
              userName:props.userName
                });
                remove(Dref(db,`users/${props.user.userId}/Folowers/${props.userId}`), {
                  userId:props.user.userId,
                  userName:props.user.normalName
                  });



  
  let arr =[]

          props.setFolowersLength(props.folowersLength-1)
props.folowersArr.map((folower)=>{
if(folower.userId !== props.userId){
arr.push(folower)
}
})
console.log(arr)

props.setFolowersArr(arr)



           }else{

            remove(Dref(db,`users/${props.user.userId}/Folowing/${props.userId}`), {
              userId:props.userId,
              userName:props.userName
                });
                remove(Dref(db,`users/${props.userId}/Folowers/${props.user.userId}`), {
                  userId:props.user.userId,
                  userName:props.user.normalName
                  });

console.log(props)

  
  let arr =[]


          props.setFolowLength(props.folowLength-1)
props.folowArr.map((folower)=>{
if(folower.userId !== props.userId){
arr.push(folower)
}
})


props.setFolowArr(arr)



           }
        }}>Unfollow</button>
    </div>
</div>
  )
}

export default FolowPerson