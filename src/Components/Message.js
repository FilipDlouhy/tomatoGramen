import React, { useEffect, useState } from 'react'
import {getDownloadURL,getStorage,uploadBytesResumable, uploadBytes, getBlob,StorageReference, listAll,list} from 'firebase/storage'
import {ref as Sref} from 'firebase/storage'

function Message(props) {
    const storage = getStorage()
    const [profilePhoto,setProfilePhoto] = useState()
    const [isUser,setIsUser]=useState(false)
    const getuser  =  () =>{
          getDownloadURL(Sref(storage,`${props.messageId}/profile.jpg`)).then((url)=>{
            setProfilePhoto(url)
            if(props.messageId=== props.user.userId){
                setIsUser(true)
             }else{
                setIsUser(false)
             }
              })
    } 
    useEffect(()=>{
 
         
            getuser()
     
      
    },[])
  return (
    <div className={isUser ? 'MESSAGERight' : 'MESSAGELEFT'}>
 <div className={isUser ? 'message' : 'message2'}>
 <p>{props.message}</p>
        <div>
            <img src={profilePhoto} ></img>
            <h1>{props.userName}</h1>
        </div>  

    </div>
    </div>
   
  )
}

export default Message