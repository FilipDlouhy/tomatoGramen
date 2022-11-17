import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function  RandomProfilePost(props) {
    const navigate=useNavigate()
  return (
        <div id={props.userId} className='profile-post'>
      <a to='/postpage'> <img onClick={((event)=>{
      props.setUserPostId(event.target.parentElement.parentElement.id)
      props.setPostId(event.target.id)
      navigate('/randomPostPage')
      })}
      className='profile-post-img' id={props.postId}  src={props.postImg}></img></a>

      </div>
  )
}

export default RandomProfilePost