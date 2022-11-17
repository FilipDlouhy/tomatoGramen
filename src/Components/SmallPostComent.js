import React from 'react'
import { useNavigate } from 'react-router-dom'
import {getDownloadURL,getStorage,uploadBytesResumable, ref, uploadBytes, getBlob,StorageReference, listAll,list} from 'firebase/storage'

function SmallPostComent(props) {
    const storage = getStorage()

const navigate = useNavigate()

    function getPosts(){
      props.setRandomProfilePosts([])
        fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.id}/posts.json`).then((res)=>res.json()).
        then((data) => { 
            let allPosts=[]
             Object.values(data).map((post)=>{
            let Post ;
          getDownloadURL(ref(storage,`${props.id}/posts/${post.postId}`)).then(url=>{
            Post={ userId: props.id,
       postId:   post.postId ,
       postImg: url
      }
            
           allPosts.push(Post)
        
            }).then(()=>{ 
              if(allPosts.length===  Object.values(data).length){
                props.setRandomProfilePosts(allPosts)
       
            } 
            props.setPostLength(allPosts.length)})
       
        
          })
        
        })
      }
      




    
    function showRandomProfile(){
        fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.id}.json`).then((response) => response.json())
.then((data) => 


   

      getDownloadURL(ref(storage,`${props.id}/background/background.jpg`)).then((url)=>{
        data = {...data,
    backgroundPhoto:url}
 
      }).then(()=>{
        getDownloadURL(ref(storage,`${props.id}/profile.jpg`)).then((url)=>{
            data = {...data,
            profilePhoto:url}
          props.randomSetUser(data)
            getPosts()
            navigate('/randomUser')
            props.deleteHeaderMenuItemADDHOME()
        })
      })
   
    )

}
    
    return (
    <p onClick={()=>{
        showRandomProfile()
    }} id={props.id} className='coment'><span>{props.name}</span>  {props.comment}</p>
  )
}

export default SmallPostComent