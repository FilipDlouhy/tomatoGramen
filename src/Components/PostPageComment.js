import { getStorage,getDownloadURL,ref } from 'firebase/storage'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function PostPageComment(props) {
    console.log(props)
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
                props.setPostLength(allPosts.length)
            } })
       
        
          })
        
        })
      }
      
  return (

    <div onClick={()=>{
fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.id}.json`).then((response) => response.json())
.then((data) => {props.randomSetUser(data)


    
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
        })
      })
   

})
props.deleteHeaderMenuItemADDHOME()   }} className='post-page-post-coment'>
        
    <img src={props.img}></img>
    <h1>{props.name}</h1>
    <p>{props.comment}</p>

</div>


  )
}

export default PostPageComment