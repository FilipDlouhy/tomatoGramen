import React, { useState } from 'react'
import instaLogo from '../img/tomato.png'
import RFolowPerson from './RFolowPerson'
import Home from '../img/Home.svg'
import Message from '../img/Message.svg'
import Profile from '../img/Profile.svg'
import Hearth from '../img/Hearth.svg'
import { v4 as uuidv4 } from 'uuid';
import Chat from './Chat'
import Visit from '../img/Visit.svg'
import Post from './Post'
import { getDatabase, set } from "firebase/database";
import { ref as Sref } from "firebase/database";
import SmallProfile from './SmallProfile'
import { BrowserRouter as Router,Routes,Route,Link, } from 'react-router-dom'
import Homer from './Home'
import ProfilePage from './Profile'
import EditProfile from './EditProfile'
import PostPage from './PostPage'
import SingIn from './SingIn'
import Login from './Login'
import { UserAuth } from '../context/AuthContext'
import {AuthContextProvider} from '../context/AuthContext'
import {useEffect} from 'react'
import {getDownloadURL,getStorage, uploadBytes,updateMetadata} from 'firebase/storage'
import {ref as Dref} from 'firebase/storage'
import { storage } from '../firebase'
import RandomUserProfile from './RandomUserProfile'
import RandomPostPage from './RandomPostPage'
import SearchItem from './SearchItem'
import FolowPerson from './FolowPerson'
function Container() {
    const addPosT = (newPost) => setAefterSearchUsers(prevFolowPosts => [...prevFolowPosts, newPost])
    const {logout} =UserAuth()
    const {singIn} = UserAuth()
    const {user} = UserAuth()
const [showNotification ,setShowNotification] = useState(false)
const[userProfileImg, setUserProfileImg] = useState()
const[backgroundProfileImg, setBackgroundProfileImg] = useState()
const[userProfileImgRef, setUserProfileImgRef] = useState()
const [showProfileOptions,setShowProfileOptions] = useState(false)
const [showHeader,setShohHeader] =useState(false)
const [showForm,setShowForm] = useState(false)
const [showBackground,setShowBackground] = useState(false)
const [showFolow,setShowFolow] = useState(false)
const [RshowFolow,RsetShowFolow] = useState(false)
const [userId,setUserId] = useState()
const [userR,setUser] = useState()
const [addPostImg, setAddPostImg] = useState()
const [postBio,setPostBio] = useState()
const[postId,setPostId] =useState()
const [userPostId,setUserPostId] = useState()
const [count, setCount] = useState(1)
const [ profilePosts,setProfilePosts] = useState([])
const[postAddedCount,setPostAddedCount] = useState(0)
const [seatchUsers, setSearchUsers] = useState()

const[showSearch,setShowSearch] = useState()
const [afterSeatchUsers, setAefterSearchUsers] = useState()

const [search,setSearch] = useState('')
const [randomUserR,setRandomUser] = useState()
const [randomUserId,setRandomUserId] = useState()
const [ RandomProfilePosts,setRandomProfilePosts] = useState([])

const storage = getStorage()

const[postsLength,setPostLength] = useState()
const [folowLength,setFolowLength] = useState()
const [ folowersLength,setFolowersLength] = useState()

const [folowers,setFolowers]  = useState(true)

const [Rfolowers,RsetFolowers]  = useState(true)
const [RfolowersArr,RsetFolowersArr]  = useState()
const [folowersArr,setFolowersArr] = useState()
const [folowArr,setFolowArr] = useState([])
const [RfolowArr,RsetFolowArr] = useState()

function selectHeaderMenuItem(event){
let menuItems = document.querySelectorAll('.insta-router-img')
menuItems.forEach((img)=>img.classList.remove('chosen'))
event.target.classList.add('chosen')
}
const handleLogout = async () => {


    setShowNotification(false)
    setUserProfileImg()
    setBackgroundProfileImg()
    setUserProfileImgRef()
    setShowProfileOptions(false)
    setShohHeader(false)
    setShowForm(false)
    setShowBackground(false)
    setShowFolow(false)
    RsetShowFolow(false)
    setUserId()
    setUser()
    setAddPostImg()
    setPostBio()
    setPostId()
    setUserPostId()
    setCount(1)
    setProfilePosts([])
    setPostAddedCount(0)
    setShowSearch()
    setAefterSearchUsers()
    setSearch('')
    setRandomUser()
    setRandomUserId()
    setRandomProfilePosts([])
    setPostLength()
    setFolowLength()
    setFolowersLength()
    setFolowers(true)
    RsetFolowers(true)
    RsetFolowersArr()
    setFolowersArr()
    setFolowArr([])
    RsetFolowArr()








    try {
      await logout();
setShohHeader(false)
      console.log('You are logged out')
    } catch (e) {

    }
  }
function deleteHeaderMenuItem(){
    let menuItems = document.querySelectorAll('.insta-router-img')
    menuItems.forEach((img)=>img.classList.remove('chosen'))
   
    }
    function deleteHeaderMenuItemADDHOME(){
        let menuItems = document.querySelectorAll('.insta-router-img')
        menuItems.forEach((img)=>img.classList.remove('chosen'))
      let menuItem = document.querySelector('.insta-router-img-profile')
      console.log(menuItem)
      menuItem.classList.add('chosen')
        }

function addPost(e){
    const db = getDatabase();
    let key = uuidv4();
   const storage = getStorage()
   const metaData = {
    postID:key
   }
    e.preventDefault()
    set(Sref( db,'users/'+user.uid+'/posts/'+key),{
      postId:key,
   postBio:postBio
   ,coments:[],
   likes:[]
     })
     uploadBytes(Dref(storage,`${user.uid}/posts/${key}`),addPostImg).then(()=>{console.log("image added")
     setProfilePosts(([...profilePosts,
        { userId: user.uid,
 postId:  key ,
 postImg: URL.createObjectURL(addPostImg)

     }]))
     updateMetadata(Dref(storage,`${user.uid}/posts/${key}`), metaData).then((metaData)=>{setPostLength(postsLength+1)})})
     
     console.log('post added')
     setShowForm(false)
                    setShowBackground(false)
                    setCount(count +1)
                    setPostLength(profilePosts.length)
}
useEffect(()=>{
    fetch('https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app/users.json').then((response) => response.json())
    .then((data) => setSearchUsers(Object.values(data)))


    if(folowArr){
        console.log(folowArr)
    }
    if(folowersArr){
        console.log(folowersArr)
    }
},[])

  return (
    <AuthContextProvider >
    <Router>    
   
            <div onClick={(e)=>{
       showNotification ?setShowNotification(false) :console.log("");
    
       showProfileOptions ? setShowProfileOptions(false) :console.log("")
    if(e.target.id !== 'search'){
        showSearch ? setShowSearch(false) :console.log()
 
    }
    
    }
    }>
        <header className={showHeader ? ' ':'unshow'}> 
           
            <div  className='insta-logo'>
            <Link to='/home'><img onClick={(event)=>{
                deleteHeaderMenuItem(event)
                document.querySelector('.insta-router-img-home').classList.add('chosen')}} src={instaLogo}></img></Link> 
        <Link to='/home'><p onClick={(event)=>{
                deleteHeaderMenuItem(event)
                document.querySelector('.insta-router-img-home').classList.add('chosen')}} >Tomatogram</p></Link> 
            </div>
            <div className='insta-search'>
                <input onClick={()=>{
                    setShowSearch(true)
                }} type='text' id='search' onChange={(e)=>{setSearch(e.target.value)
                
                
                   if(seatchUsers){
                    setAefterSearchUsers([])
                    let ARRSLAV=seatchUsers
                    let arr=[]
                    ARRSLAV.filter((user) => {
                        let SearchMAn
                       
                         if(user.normalName.toLowerCase().includes(search.toLowerCase())){
                          
                            getDownloadURL(Dref(storage,`${user.userId}/profile.jpg`)).then((url)=>{
                           
                                SearchMAn={
                                    userName:user.normalName,
                                    profilePhoto:url,
                                    userId:user.userId
                                }
                               
                                addPosT(SearchMAn)
                            })

                 
                        }
                         
                      })
                    
                     
                   }
               
                
                
                
                
                
                
                
                }} placeholder='Search'></input>
            </div>
            <div className='insta-router'> 
             <Link to='/home'><img className='insta-router-img insta-router-img-home' onClick={(event)=>{ 
            selectHeaderMenuItem(event)
            
             }} src={Home}></img></Link>  
       <Link onClick={()=>{
            let menuItems = document.querySelectorAll('.insta-router-img')
            menuItems.forEach((img)=>img.classList.remove('chosen'))
          let menuItem = document.querySelector('.insta-router-img-chat')
       
          menuItem.classList.add('chosen')
       }} to='/chat'>  <img className='insta-router-img insta-router-img-chat' src={Message}></img></Link>
        <img  className='insta-router-img' onClick={()=>setShowNotification(!showNotification)} src={Hearth}></img>
        <img className=' insta-router-img insta-router-img-profile' onClick={()=>setShowProfileOptions(!showProfileOptions)} src={Profile}></img>
        </div>
   
        </header>

<Routes>
    <Route path='/chat' element={<Chat folowersArr={folowersArr} folowArr={folowArr} user={userR}/>}></Route>
     <Route path='/randomPostPage'  element={<RandomPostPage deleteHeaderMenuItemADDHOME={deleteHeaderMenuItemADDHOME} setRandomProfilePosts={setRandomProfilePosts} setFolowLength={setFolowLength}  setFolowersLength={setFolowersLength}  setPostLength={setPostLength}   user={userR}  randomUser={randomUserR} randomSetUser={setRandomUser} userPostId={userPostId}  setPostId={setPostId} postId={postId}/>}></Route>
    <Route path='/randomUser' element={<RandomUserProfile deleteHeaderMenuItemADDHOME={deleteHeaderMenuItemADDHOME} RsetFolowersArr={RsetFolowersArr} RfolowArr={RfolowArr} RsetFolowArr={RsetFolowArr} RsetFolowers={RsetFolowers} showBackground={setShowBackground}     RsetShowFolow={RsetShowFolow}    folowersArr={folowersArr} folowArr={folowArr}  setFolowersArr={setFolowersArr} setFolowArr={setFolowArr} setFolowLength={setFolowLength} setFolowersLength={setFolowersLength} folowersLength={folowersLength} folowLength={folowLength} postsLength={postsLength}  setPostLength={setPostLength}  user={userR} setUserPostId={setUserPostId}  setPostId={setPostId}     randomProfilePosts={RandomProfilePosts}  randomUser={randomUserR} randomSetUser={setRandomUser} randomUserId={randomUserId} randomSetUserId={setRandomUserId}    />}></Route>
        <Route path='/login' element={     <Login setFolowersArr={setFolowersArr} setFolowArr={setFolowArr} setFolowLength={setFolowLength} setFolowersLength={setFolowersLength}  setPostLength={setPostLength}   setPostAddedCount={setPostAddedCount} user={userR} setProfilePosts={setProfilePosts} count={count} setBackgroundProfileImg={setBackgroundProfileImg} setUser={setUser} userId={userId} setUserId={setUserId} showHeader={setShohHeader} />}></Route>
 <Route path='/' element={     <SingIn setFolowLength={setFolowLength} setFolowersLength={setFolowersLength}  count={count} setPostLength={setPostLength}   setBackgroundProfileImg={setBackgroundProfileImg}  setUserProfileImg={setUserProfileImg} user={userR} setUser={setUser} userId={userId} setUserId={setUserId} showHeader={setShohHeader} setUserProfileImgRef={setUserProfileImgRef}   />}></Route>
    <Route path='/home' element={<Homer    deleteHeaderMenuItemADDHOME={deleteHeaderMenuItemADDHOME}   profilePosts={profilePosts} folowArr={folowArr}  setFolowLength={setFolowLength} setFolowersLength={setFolowersLength} folowersLength={folowersLength}  folowLength={folowLength}   setPostLength={setPostLength} postsLength={postsLength}  setRandomProfilePosts={setRandomProfilePosts}  randomProfilePosts={RandomProfilePosts}  randomUser={randomUserR} randomSetUser={setRandomUser} randomUserId={randomUserId} randomSetUserId={setRandomUserId}    postAddedCount={postAddedCount} count={count}  setUserPostId={setUserPostId} postId={postId} setPostId={setPostId}  user={userR} setUser={setUser} userId={userId} setUserId={setUserId}  setUserProfileImg={setUserProfileImg}  userProfileImg={userProfileImg} userProfileImgRef={userProfileImgRef} showFolow={setShowFolow}  showForm={setShowForm} showBackground={setShowBackground} />}></Route>
   <Route path='/edit' element={<EditProfile count={count}   backgroundProfileImg={backgroundProfileImg} setUserProfileImg={setUserProfileImg}  userProfileImg={userProfileImg} setBackgroundProfileImg={setBackgroundProfileImg} user={userR} setUser={setUser} userId={userId} setUserId={setUserId}/>}></Route>
   <Route path='/postpage' element={<PostPage  deleteHeaderMenuItemADDHOME={deleteHeaderMenuItemADDHOME}  postsLength={postsLength}  setProfilePosts={setProfilePosts}  profilePosts={profilePosts} setFolowLength={setFolowLength} setFolowersLength={setFolowersLength}  setPostLength={setPostLength}  randomUser={randomUserR} randomSetUser={setRandomUser} setRandomProfilePosts={setRandomProfilePosts} count={count}  userPostId={userPostId}  setPostId={setPostId} postId={postId} user={userR} setUser={setUser} userId={userId} setUserId={setUserId}/>}></Route>
    <Route path='/profile' element={<ProfilePage  deleteHeaderMenuItemADDHOME={deleteHeaderMenuItemADDHOME} folowArr={folowArr} setFolowers={setFolowers}  setFolowLength={setFolowLength} setFolowersLength={setFolowersLength} folowersLength={folowersLength} folowLength={folowLength} postsLength={postsLength}  setPostLength={setPostLength}  postAddedCount={postAddedCount}  setUserPostId={setUserPostId} postId={postId} setPostId={setPostId} count={count} profilePosts={profilePosts} setBackgroundProfileImg={setBackgroundProfileImg} user={userR} setUser={setUser} userId={userId} setUserId={setUserId} setUserProfileImg={setUserProfileImg}  userProfileImg={userProfileImg} userProfileImgRef={userProfileImgRef}  showFolow={setShowFolow} showForm={setShowForm} showBackground={setShowBackground} />}></Route>
</Routes>

 
        
      
        <div className={showNotification ? 'showNotification': 'unShowNotification'}>
            <p>No notifications</p>
        </div>
        <div className= {showProfileOptions ? 'showprofileOptions': 'unShowprofileOptions'}>
           <Link className='profile-link' to='/profile'><p onClick={(event)=>
        {  deleteHeaderMenuItem(event)
            document.querySelector(".insta-router-img-profile").classList.add('chosen')
      }}>Profile</p></Link> 
          <Link className='logout-link' to='/'> <p onClick={handleLogout}>Logout</p></Link> 

        </div>
        <div  className={showBackground ? 'form-background': 'unshow'}>

        <form  className={showForm ? 'form': 'unshow'}>
                <div className='form-header'>
                    <p>Create a new post</p>
                    <p onClick={()=>{setShowForm(false)
                    setShowBackground(false)}} className='close-form'>X</p>
                </div>
                <div className='form-file'>
                    <label for='add-post-file-input' ><img src={addPostImg&& URL.createObjectURL(addPostImg)}></img></label>
                    <input id='add-post-file-input' onChange={(e)=>{
                        setAddPostImg(e.target.files[0])
                        console.log(e.target.files[0])
                    }} className='form-file-input' type='file'   accept="image/png, image/jpeg" placeholder='Upload File'></input>
                </div>
                <div className='form-caption'>
                   <textarea className='form-caption-input' onChange={(e)=>{
                    setPostBio(e.target.value)
                   }} placeholder='Choose a caption'></textarea>
                </div>
                <button onClick={addPost}> Post</button>
            </form>
  

            <div className={showFolow ? 'folowers': 'unshow'}>
                <div className='folowers-header'>
                
                     <div className='folowers-header-heading'><h1 onClick={()=>{
                        if(folowers === false){
                            setFolowers(true)
                        }
                        
                        
                      }}>Folowers</h1>
                     <h1 onClick={()=>{
                        
                        if(folowers === true){
                            setFolowers(false)
                        }
                     }}>Folowing</h1></div>
                   
                     <div onClick={()=>{ 
                        setShowBackground(false)
                        setShowFolow(false)
                                            
                     }} className='folowers-header-close'><h1>X</h1></div>
                </div>
                <div className={ folowers ?'folower' : 'unshow'}>
                        {folowersArr && folowersArr.map((folow)=>{
                        return <FolowPerson deleteHeaderMenuItemADDHOME={deleteHeaderMenuItemADDHOME}  folowersLength={folowersLength} setFolowersLength={setFolowersLength} folowers={folowers} setRandomProfilePosts={setRandomProfilePosts} setPostLength={setPostLength}    randomSetUser={setRandomUser} folowLength={folowLength} user={userR} setFolowLength={setFolowLength}  setFolowersArr={setFolowersArr} setFolowArr={setFolowArr}  folowersArr={folowersArr} folowArr={folowArr} userId={folow.userId} profilePhoto={folow.profilePhoto} userName={folow.userName}/>})}
                </div>
             
                <div className={ folowers ?' unshow' : 'folower'}>
                     {folowArr && folowArr.map((folow)=>{
                        return <FolowPerson deleteHeaderMenuItemADDHOME={deleteHeaderMenuItemADDHOME}  folowersLength={folowersLength} setFolowersLength={setFolowersLength}  folowers={folowers}  setRandomProfilePosts={setRandomProfilePosts} setPostLength={setPostLength}  randomSetUser={setRandomUser}  folowLength={folowLength} user={userR} setFolowLength={setFolowLength}  setFolowersArr={setFolowersArr} setFolowArr={setFolowArr}  folowersArr={folowersArr} folowArr={folowArr} userId={folow.userId} profilePhoto={folow.profilePhoto} userName={folow.userName}/>
                     })}


                    </div>

                </div>      

  
                <div className={RshowFolow ? 'Rfolowers': 'unshow'}>
                <div className='folowers-header'>
                
                     <div className='folowers-header-heading'><h1 onClick={()=>{
                        if(Rfolowers === false){
                            RsetFolowers(true)
                        }
                        
                        
                      }}>Folowers</h1>
                     <h1 onClick={()=>{
                        
                        if(Rfolowers === true){
                            RsetFolowers(false)
                        }
                     }}>Folowing</h1></div>
                   
                     <div onClick={()=>{ 
                        setShowBackground(false)
                        RsetShowFolow(false)
                                            
                     }} className='folowers-header-close'><h1>X</h1></div>
                </div>
                <div className={ Rfolowers ?'folower' : 'unshow'}>
                {RfolowersArr && RfolowersArr.map((folow)=>{
                        return <RFolowPerson  deleteHeaderMenuItemADDHOME={deleteHeaderMenuItemADDHOME}   displayName={folow.displayName} Rfolowers={Rfolowers}  folowersLength={folowersLength} setFolowersLength={setFolowersLength}  folowers={folowers}  setRandomProfilePosts={setRandomProfilePosts} setPostLength={setPostLength}  randomSetUser={setRandomUser}  folowLength={folowLength} user={userR} setFolowLength={setFolowLength}  setFolowersArr={setFolowersArr} setFolowArr={setFolowArr}  folowersArr={folowersArr} folowArr={folowArr} userId={folow.userId} profilePhoto={folow.profilePhoto} userName={folow.userName}/>})}

                </div>
             
                <div  className={ Rfolowers ?' unshow' : 'folower'}>
                 
                {RfolowArr && RfolowArr.map((folow)=>{
                        return <RFolowPerson  deleteHeaderMenuItemADDHOME={deleteHeaderMenuItemADDHOME}  displayName={folow.displayName} Rfolowers={Rfolowers} folowersLength={folowersLength} setFolowersLength={setFolowersLength}  folowers={folowers}  setRandomProfilePosts={setRandomProfilePosts} setPostLength={setPostLength}  randomSetUser={setRandomUser}  folowLength={folowLength} user={userR} setFolowLength={setFolowLength}  setFolowersArr={setFolowersArr} setFolowArr={setFolowArr}  folowersArr={folowersArr} folowArr={folowArr} userId={folow.userId} profilePhoto={folow.profilePhoto} userName={folow.userName}/>})}



                    </div>

                </div>     

                        </div>


                        <div className= {showSearch ?  'searchBar' :'unshow'}>
                     
                      {afterSeatchUsers && afterSeatchUsers.map((item, index) =>{
                return <SearchItem      deleteHeaderMenuItemADDHOME={   deleteHeaderMenuItemADDHOME}  setFolowLength={setFolowLength} setFolowersLength={setFolowersLength}   setPostLength={setPostLength} setRandomProfilePosts={setRandomProfilePosts}  randomSetUser={setRandomUser} key={index} userId={item.userId} img={item.profilePhoto} name={item.userName}/>

              })}

                        

        </div>
     
            </div>
           </Router>   </AuthContextProvider>

  )
}

export default Container
/* 

 



*/