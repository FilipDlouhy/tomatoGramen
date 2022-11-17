import React, { useEffect, useState } from 'react'
import { doc, getDoc,getFirestore,collection,updateDoc,addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { getDatabase,set } from 'firebase/database';
import {ref as Sref} from'firebase/database';
import Message from './Message';
import { async } from '@firebase/util';
function ChatRoom(props) {

const updateChat= async () =>{
          
  await fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/chats/${props.chatRef}.json`).then(res=>res.json())
  .then((data)=>{
  
if(data.messages === undefined){
setMessages([])
}else{
let arr=[]
console.log(data.messages)
Object.values(data.messages).map((message)=>{
arr.push(message)
})
arr.sort((a, b) => {
return a.CreatedAt - b.CreatedAt;
});

console.log(arr)
setMessages(arr)
}


})


}
    const data = getFirestore()
const [messages,setMessages] = useState()
const [message,setMessage] = useState()
const db = getDatabase()
const [count,setCount] = useState(0)
    useEffect(()=>{
     
      console.log(props.chatRef)
      if(props.chatRef){
        const interval = setInterval(() => {
          updateChat()
        }, 500);
        return () => clearInterval(interval);

    }

    },[message,props.chatRef,count])


  return (
    <div className='messeages'>
        <div className='showMessages'>
       {   messages && messages.map((message)=>{
        return   <Message  messageId={message.id} userName={message.userName} message={message.message} user={props.user}></Message>
       })}
 
        </div>








{props.chatRef &&
 <div className='messageDiv'>
 <input className='message-input' onChange={(e)=>{

setMessage(e.target.value)
 }} type='text'
     ></input>
     <button className='message-send' onClick={(e)=>{
if(props.chatRef){


 fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/chats/${props.chatRef}.json`).then(res=>res.json())
 .then((data)=>{
 
   let count = 0;
   if(data.messages === undefined ){
   
   }else{
     
     Object.values(data.messages).forEach((message,index)=>{
       count += 1;
      })
   }


     console.log(count)
     let key = uuidv4()
     let chatRef = props.chatRef 
console.log( props.chatRef)

set(Sref( db,'chats/'+props.chatRef+'/messages/'+key),{
id:props.user.userId,message:message,userName:props.user.displayName,CreatedAt:count
})
})





            e.target.parentElement.firstChild.value= ' '

            updateChat()
      
            setCount(count+1)
         }
    }
     } >Send</button>
 </div>

}
   
    </div>
  )
}

export default ChatRoom