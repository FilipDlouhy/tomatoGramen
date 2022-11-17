import React, { useEffect } from 'react'
import Coding from '../img/Coding.jpg'
import instaLogo from '../img/instaLogo.png'
import { Link } from 'react-router-dom'
import { getDatabase,update,ref } from 'firebase/database'
import { ref as sRef } from 'firebase/storage';
import{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStorage, deleteObject,uploadBytes,getDownloadURL } from "firebase/storage";
function EditProfile(props) {
const navigate = useNavigate()

  const [normalName,setNormalName]= useState(props.user.normalName )
  const [displayName,setDisplayName]= useState(props.user.displayName)
  const [bio,setBio]= useState(props.user.bio)
  const [profilePhotof,setProfilePhotof]= useState()
  const [backgroundPhotof,setBackgroundPhotof]= useState()
  const [profilePhoto,setProfilePhoto]= useState(props.user.profilePhoto)
  const [backgroundPhoto,setBackgroundPhoto]= useState(props.user.backgroundPhoto)
  async  function  updateUser (e){
e.preventDefault()
const database = getDatabase();
const storage = getStorage();
console.log(bio)
if(normalName !== null  ||  normalName !== undefined){
  console.log(normalName)

    

  await update(ref(database, `users/${props.user.userId}`), {

    normalName:normalName

   
})


} 
   if (displayName !== null  ||  displayName!== undefined){
    console.log(displayName)
  
      
  console.log('displayName')
  await update(ref(database, `users/${props.user.userId}`), {

   
    displayName:displayName})


} 
 if (bio !== null  ||  bio !== undefined){

    console.log('BIO')
    await update(ref(database, `users/${props.user.userId}`), {

      
     
  bio:bio
   
  })


}  

console.log(profilePhotof)
  if ( profilePhotof === null  ||  profilePhotof === undefined){
    props.setUser({
      ...props.user,
      profilePhoto:props.user.profilePhoto
    })
  

} else{
  props.setUser({
    ...props.user,
    profilePhoto:URL.createObjectURL(profilePhotof)
  })
await deleteObject(sRef(storage,`${props.user.userId}/profile.jpg`)).then(() => {
  console.log('elDelete')
  })

 await uploadBytes(sRef(storage,`${props.user.userId}/profile.jpg`), profilePhotof).then(()=>{console.log("--sss")})

}



  if ( backgroundPhotof === null  ||  backgroundPhotof === undefined){
    props.setUser({
      ...props.user,
      profilePhoto:props.user.backgroundPhoto
    })
  

}else{
  props.setUser({
    ...props.user,
    backgroundPhoto:URL.createObjectURL(backgroundPhotof)
  })
  await deleteObject(sRef(storage,`${props.user.userId}/background/background.jpg`)).then(() => {
    console.log('elDelete')
    })
   await uploadBytes(sRef(storage,`${props.user.userId}/background/background.jpg`), backgroundPhotof).then(()=>{console.log("--sss")})

}



 await fetch('https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users.json').then((response) => response.json())
.then((data) => {console.log(data)
Object.values(data).map(loginUser=>{
let backPic 
let profPic
  if(loginUser.userId=== props.user.userId){
    console.log(loginUser)
 
      getDownloadURL(sRef(storage,`${props.user.userId}/background/background.jpg`)).then((url)=>{
        backPic = url
       console.log(backPic)
    
         }).then(()=>{
           getDownloadURL(sRef(storage,`${props.user.userId}/profile.jpg`)).then((url)=>{
            profPic = url
            console.log(profPic)
            props.setUser({...props.user,normalName:loginUser.normalName,displayName:loginUser.displayName,bio:loginUser.bio,backgroundPhoto:backPic,profilePhoto:profPic}
              )
           })
         })

  }
})})


}

useEffect(()=>{
  setNormalName(props.user.normalName)
setDisplayName(props.user.displayName)
setBio(props.user.bio)
setProfilePhotof()
setBackgroundPhotof()
setProfilePhoto(props.user.profilePhoto)
setBackgroundPhoto(props.user.backgroundPhoto)
},[])



  return (
    <div className='black EditProfile'>
        <div className='profile-editor'>
                <h1 >Profile Edit</h1>
                <input id='file-input-logo' onChange={(e)=>{
                    setProfilePhotof(e.target.files[0]) 
                      setProfilePhoto(URL.createObjectURL(e.target.files[0])   )


                    
                }} type='file'  accept="image/png, image/jpeg"></input>
                <label  for="file-input-background"><img className='profile-editor-img' src={backgroundPhoto}></img></label>
                <input className='input' id='file-input-background' onChange={(e)=>{
                  setBackgroundPhotof(e.target.files[0])
              setBackgroundPhoto(URL.createObjectURL(e.target.files[0]))
      
                }} type='file'  accept="image/png, image/jpeg"></input>
               <label for='file-input-logo' ><img className='EditProfile-logo' src={profilePhoto}></img></label> 
                <form>
                    <p className='display-name-p' >Display name:</p>
                    <input  className='display-name' onChange={(e)=>{
         console.log(displayName)
                        setDisplayName(e.target.value) 
          
                      
                 
                      
                  }}  placeholder={props.user.displayName} type='text'></input>
                    <p className='display-name-p'>Normal name:</p>
                    <input className='display-name'  onChange={(e)=>
                   
                        setNormalName(e.target.value)  
                        } placeholder={props.user.normalName} type='text'></input>
                    <p className='edit-bio-p'>Bio:</p>
                    <input className='edit-bio'onChange={(e)=>{
                      
                      
                   
                        setBio(e.target.value) 
                     
             }
                      } placeholder={props.user.bio} type='text'></input>
                    <button onClick={updateUser}>Save</button>
                </form>
               <Link to='/profile'><button  className='view-profile-btn'>View Profile</button></Link> 
        </div>


    </div>
  )
}

export default EditProfile