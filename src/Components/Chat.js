import React, { useEffect, useState } from 'react'
import ChatPerson from './ChatPerson'
import ChatRoom from './ChatRoom'
function Chat(props) {
    const [chatsPersons,setChatPersons] = useState()
    const [dbRef,setDbRef] = useState()
    const [dbRef2,setDbRef2] = useState()
    const [chatRef, setChatRef] = useState()
    useEffect(()=>{
        let arr = []
        if(props.folowersArr){
            props.folowersArr.map(folower=>arr.push(folower))
        }
        if(props.folowArr){
            props.folowArr.map(folower=>arr.push(folower))
        }
let ARR = new Set (arr)
let ARENZI=[]
ARR.forEach(element => {
  ARENZI.push(element); // 👉️ one, two, three, four
  });console.log(ARENZI)
setChatPersons(ARENZI)
    },[])
  return (
    <div className='chat'>
       
    <div className='chat-main'>
        <div className='chats'>
   {chatsPersons && chatsPersons.map((person)=>{
   return  <ChatPerson key={person.userId} setChatRef={setChatRef} setDbRef2={setDbRef2} setDbRef={setDbRef} profilePhoto={person.profilePhoto} user={props.user} id={person.userId} name={person.userName}/>
   })}
        </div>


       
            <ChatRoom chatRef={chatRef} dbRef2={dbRef2} user={props.user}  dbRef={dbRef}/>
    

    </div>

    </div>
  )
}

export default Chat