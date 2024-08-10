import React,{useState} from 'react'
import {Link} from "react-router-dom"
import parse from  "html-react-parser"
import moment from 'moment'
import { useSelector } from 'react-redux'

function PostCard({
    id, title, imgUrl,content,category,datePosted,time,status,uid
}) {
  const [user,setUser] = useState(useSelector((state) => state.auth.user.user))
console.log(uid,user.uid)
  return (
    <Link to={(status === "active") || (status === "inactive" && user.uid === uid) ? `/post/${id}` : ""}>
  
        <div className={`max-w-sm h-[500px] rounded-xl overflow-hidden   shadow-md transition-shadow duration-300 ${status === "active" ? `cursor-pointer` : `cursor-not-allowed opacity-50`} hover:shadow-xl hover:shadow-gray-400`}>                                                          
  <img class="w-full" src={imgUrl} className='h-[300px] object-cover w-full '></img>
  <div class="px-4 py-4">
  <div className='flex gap-[10px] font-semibold text-stone-500  font-sans text-[14px]'>
  <h1 >{category}</h1>
  <h1>{datePosted}</h1>
  {/* <h1>{moment.utc(time).local().startOf('seconds').fromNow() == "a few seconds ago" ? "just now" :moment.utc(time).local().startOf('seconds').fromNow()}</h1> */}
  </div>
       
    <h1 className="font-bold italic text-[16px] text-gray-800 uppercase">{title}</h1>
 <p class="text-gray-500 text-[14px] text-left">{parse(content.slice(0,200) + `.....`)}</p>
 <div className='flex gap-[2.5px] font-semibold text-stone-500  font-sans text-[14px]'>
 
  <h1>{moment.utc(time).local().startOf('seconds').fromNow() == "a few seconds ago" ? "just now" :moment.utc(time).local().startOf('seconds').fromNow()}</h1>
  </div>
  </div>
</div>
    </Link> 
  )
}

export default PostCard