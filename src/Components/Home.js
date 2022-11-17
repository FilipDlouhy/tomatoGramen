import React, { useState } from 'react'
import SmallProfile from './SmallProfile'
import Post from './Post'
import {useEffect} from 'react'
import RandomFollows from './RandomFollows'
import {getMetadata ,getDownloadURL,getStorage,uploadBytesResumable, ref, uploadBytes, getBlob,StorageReference, listAll,list} from 'firebase/storage'
import { async } from '@firebase/util'
function Home(props) {

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
const [posts,setPosts]= useState()
const [FolowPosts,setFolowPosts]= useState([])
const [count,setCount] = useState(0)
  const storage = getStorage()

  const addPost = (newPost) => setFolowPosts(prevFolowPosts => [...prevFolowPosts, newPost])
useEffect(()=>{

  setFolowPosts([])

let arr=[
]

if(FolowPosts){
  console.log(FolowPosts)
}
if(props.user.Folowing|| props.folowArr ){
  getAllPosts()
}else{
  getPosts()
}


 
},[props.postsLength])



  function getPosts(){

   fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.user.userId}/posts.json`).then((res)=>res.json()).
  then((data) => { 

    let allPosts =[]
            
       Object.values(data).map((post)=>{
 
      let Post ;
let profilePic;
  getDownloadURL(ref(storage,`${props.user.userId}/profile.jpg`)).then((url)=>{profilePic = url}).then(()=>{
    getDownloadURL(ref(storage,`${props.user.userId}/posts/${post.postId}`)).then(url=>{

      Post={
        normalName:props.user.normalName,
        displayName:props.user.displayName,
        profilePhoto:profilePic,
        postImg:  url
       ,postId:post.postId,
       userId:props.user.userId
      }
     allPosts.push(Post)
  

      }).then(()=>{ 
  
        if(allPosts.length===  Object.values(data).length){
          props.setPostLength(allPosts.length)
    setPosts(allPosts)
      } })
  })
      



  
    })
  
  })
 }
   function getAllPosts(){
    let count = 0 ;
let allPosts =[]
let ids
let allIds = [{
 userName:props.user.normalName,
  displayName:props.user.displayName,
userId:props.user.userId
}]
  fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.user.userId}/Folowing.json`).then((res)=>res.json()).
then((data) => { 
  
Object.values(data).map(id=>allIds.push(id))
console.log(allIds)
  ids =  allIds



}).then(()=>{
  ids.map((id)=>{
  fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${id.userId}/posts.json`).then((res)=>res.json()).
  then((data) => { 
    

       Object.values(data).map((post)=>{
 
      let Post ;
let profilePic;
  getDownloadURL(ref(storage,`${id.userId}/profile.jpg`)).then((url)=>{profilePic = url}).then(()=>{
    getDownloadURL(ref(storage,`${id.userId}/posts/${post.postId}`)).then(url=>{

      Post={
        normalName:id.userName,
        displayName:id.displayName,
        profilePhoto:profilePic,
        postImg:  url
       ,postId:post.postId,
       userId:id.userId
      }
     allPosts.push(Post)
    

      }).then(()=>{
        setFolowPosts([])
     
        allPosts.map((post)=>{
          addPost(post)
       })
      })
    
  })
   })

  })
})
}).catch(()=>{
  console.log('neslo nic')
})

   
 


}

 


  return (
    <div className='posts'> 

    

    <SmallProfile   folowArr={props.folowArr}  profilePosts={props.profilePosts} setPostLength={props.setPostLength} folowersLength={props.folowersLength} folowLength={props.folowLength}  postsLength={props.postsLength}  postAddedCount= {props.postAddedCount } user={props.user} setUser={props.setUser} userId={props.userId} setUserId={props.setUserId}  setUserProfileImg={props.setUserProfileImg}  userProfileImg={props.userProfileImg} userProfileImgRef={props.userProfileImgRef} showFolow={props.showFolow} showBackground={props.showBackground} showForm={props.showForm}/>
  <RandomFollows   setPostLength={props.setPostLength}
 setRandomProfilePosts={props.setRandomProfilePosts} 
randomSetUser={props.randomSetUser} user={props.user}  folowArr={props.folowArr}/>
<div>
{ FolowPosts && FolowPosts.map((post,index)=>{
  
  return <Post  deleteHeaderMenuItemADDHOME={props.deleteHeaderMenuItemADDHOME}  post={post}  user={props.user} setPostLength={props.setPostLength}   setRandomProfilePosts={props.setRandomProfilePosts}  randomProfilePosts={props.RandomProfilePosts}  randomUser={props.randomUserR} randomSetUser={props.randomSetUser} randomUserId={props.randomUserId} randomSetUserId={props.setRandomUserId}  setUserPostId={props.setUserPostId}setPostId={ props.setPostId} key={index} userId={post.userId}postId={post.postId} normalName={post.normalName} displayName={post.displayName} profileImg={post.profilePhoto} postImg={post.postImg}/>

})
}
   { posts&& posts.map((post,index)=>{
  
  return <Post post={post}  deleteHeaderMenuItemADDHOME={props.deleteHeaderMenuItemADDHOME} user={props.user} setPostLength={props.setPostLength}   setRandomProfilePosts={props.setRandomProfilePosts}  randomProfilePosts={props.RandomProfilePosts}  randomUser={props.randomUserR} randomSetUser={props.randomSetUser} randomUserId={props.randomUserId} randomSetUserId={props.setRandomUserId}  setUserPostId={props.setUserPostId}setPostId={ props.setPostId} key={index} userId={post.userId}postId={post.postId} normalName={post.normalName} displayName={post.displayName} profileImg={post.profilePhoto} postImg={post.postImg}/>

})}

</div>
    </div>
  )
}

export default Home
/* 
   fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users/${props.user.userId}/Folowing.json`).then((res)=>res.json()).
      then((data)=>{
       
        Object.values(data).map(user => getAllPOSTEN(user,allPosts))
      }).then(()=>{
      
        setFolowPosts(allPosts)
      })
 */