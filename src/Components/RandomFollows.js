import React, { useEffect, useState } from 'react'
import SuggestedFollow from './SuggestedFollow'
function RandomFollows(props) {
    const [suggested,setSugestet] =  useState()
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
    useEffect(()=>{
    fetch(`https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users.json`).then((res)=>res.json()).
  then((data) => { 
    let arr=[]
    if (data.userId !== props.user.userId){
   
      let followIDs = []
      props.folowArr.map(user=>followIDs.push(user.userId))
      Object.values(data).map((user)=>{
         let id = user.userId
         if(followIDs.includes(id) === false){
          arr.push(user)
        }
      })
    }
  

    arr = shuffle(arr)
let gutArr = []
    for (var i=0; i < 4; i++) {
       gutArr.push(arr[i])
    } 

console.log(gutArr)
setSugestet(gutArr)
    })},[])
  return (
    <div className='RandomFollows'>
        <h1>Suggested Follows</h1>
        {suggested && suggested.map((user)=>{
        return  <SuggestedFollow setPostLength={props.setPostLength}
        setRandomProfilePosts={props.setRandomProfilePosts} 
       randomSetUser={props.randomSetUser} user={user}/>
        })} 
  

    </div>
  )
}

export default RandomFollows