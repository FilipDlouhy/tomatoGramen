import React, { useEffect, useRef, useState } from 'react'

import { getDatabase, set,ref } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
function ChatPerson(props) {
    const db = getDatabase()
const [chatID,setChatID] = useState(props.user.userId+props.id)

const [chatID2,setChatID2] = useState(props.id+props.user.userId)

  return (
    <div onClick={()=>{

fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/chats/${chatID}.json`).then((response) => response.json())
.then((data) =>{


if(data === null){
    fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/chats/${chatID2}.json`).then((response) => response.json())
.then((data) =>{
    if(data === null){
        props.setChatRef(chatID)
        console.log(props.user.userId+props.id)

  
    set(ref( db,'chats/'+chatID),{
        message:"hi",
        id:props.user.userId,
        userName:props.user.displayName})
   

     
    
    }else{
        props.setChatRef(chatID2)
    }
})
}else{
    props.setChatRef(chatID)
}

})

    }} className='chat-person'>
        <img src={props.profilePhoto}></img>
        <h1>{props.name}</h1>

    </div>
  )
}

export default ChatPerson
/* setDoc(doc(db, "messages", props.user.userId+"+"+props.id), {
    id:  props.user.userId,
    message:"hi"
  
  }); */