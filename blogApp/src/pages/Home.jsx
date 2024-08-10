import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Container from '../components//Container'
import PostCard from "../components/PostCard"
import { getDocs,collection,query,where } from 'firebase/firestore'
import { db } from "../firebase";     
import { useSelector } from 'react-redux'
 

function Home() {
  const [posts, setPosts] = useState([])
  const [user,setUser]= useState(useSelector((state) => state.auth.user.user))
  const [loading,setLoading] = useState(false)
  useEffect(() =>{
    const submit = async()=>{
      setLoading(true)
     const copy = []

     const querySnapshot = collection(db, "blog")
     
     let q = query(querySnapshot, where("uid", "==", user.uid));
     q = await getDocs(q);
   
    
      q.forEach((doc) => {
       copy.push(doc.data())
      });
      setPosts(copy)
      setLoading(false)
    }
    submit() 
    console.log(user)
  }, [])
  return (
    <div className=' h-full flex ml-[100px] flex-col'>
      {/* <Container> */}
        <h1 className='text-3xl mx-2.5 text-gray-800 font-bold pt-[25px]'>Your Blogs, </h1>
     {!loading?   <div className="flex flex-wrap py-[10px]">
          {posts.length > 0 ? posts.map((post) => (
            <div className="p-2.5 w-1/4   " key={post.id}>
              <PostCard {...post} />
            </div>
          )):   
            <div className="flex  h-screen  w-full justify-center items-center">
          <h1 className='text-3xl text-stone-400'> No Blogs Yet!</h1>
            </div>}
        </div>:
    
        
    <div className="flex h-screen w-full justify-center items-center">
    <div
      className="inline-block h-[45px] w-[45px] text-stone-500 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
  </div>
    }
      {/* </Container>/ */}
    </div>
  )
}

export default Home