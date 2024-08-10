import React from 'react'
import { Container,Logo} from './index.js'
import {Link} from "react-router-dom"
import { useNavigate,useLocation } from 'react-router-dom'
import { logout } from '../firebase.js'
import Modal from 'react-modal'
    
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'100px',
      height:'100px'
     
    },
  };
  
 
  

function Header() {
  let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    // const [activeTab,setActiveTab] = useState("Home")
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }
  


    const navItems = [
        {
            name: "Home",
            slug: "/"
        },
        {
            name: "All Posts",
            slug: "/all-posts",
        },
        {
            name: "Add Post",
            slug: "/add-post",
        },
    ]

  return (
 
        <Container>
  
    <div id="sidebar-mini" class="bg-stone-500 fixed top-0 start-0 bottom-0 z-[60] w-20  border-e border-stone-800 lg:block lg:tran[#1db954]-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full   " role="dialog" tabindex="-1" aria-label="Mini Sidebar">
      <div class="flex flex-col gap-[50px] justify-center items-center py-4 ">
        <div class="mb-4">
          <a class="flex-none focus:outline-none focus:opacity-80" href="#">
           <img src='/src/assets/blog.png' className='w-[42px] h-[42px]'></img>
          </a>
        </div>
        <div className='mb-4 flex flex-col gap-[20px]'>
        <div class="[--placement:right] inline-block">
         <Link to={!modalIsOpen ? `/` : useLocation().pathname}>              
         <button type="button" class={` ${useLocation().pathname === "/" && !modalIsOpen ? `bg-stone-100` : ``} size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent  hover:bg-stone-100 focus:outline-none  disabled:opacity-50 disabled:pointer-events-none`}>
          <img src="/src/assets/home.png" className='w-[24px] h-[24px]'></img>
          </button>
          </Link>    
        </div>
   
        <div class="hs-tooltip [--placement:right] inline-block">
        
        <Link to={!modalIsOpen ? `/all-posts` : useLocation().pathname}>       
         <button type="button" class={`hs-tooltip-toggle size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray hover:bg-stone-100 focus:outline-none disabled:opacity-50 disabled:pointer-events-none  ${useLocation().pathname === "/all-posts" && !modalIsOpen? `bg-stone-100` : ``} `}>
          <img src="/src/assets/all_posts.png" className='w-[24px] h-[24px]'></img>
          </button>
          </Link>        
          </div>
    
        
         <div class="hs-tooltip [--placement:right] inline-block">
  

<Link to={!modalIsOpen ? `/add-post` : useLocation().pathname}>    

   <button type="button" class={`hs-tooltip-toggle size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray hover:bg-stone-100 focus:outline-none disabled:opacity-50 disabled:pointer-events-none   ${useLocation().pathname === "/add-post" && !modalIsOpen ? `bg-stone-100` : ``}`}>
          <img src="/src/assets/add_post.png" className='w-[24px] h-[24px]'></img>
       
          </button>
          </Link>
        </div>
        
     
        
        <div class="hs-tooltip [--placement:right] inline-block">
          <button onClick={() => openModal()} type="button" class={`size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent  hover:bg-stone-100 focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${modalIsOpen ? `bg-stone-100` : ``}  `}>
          <img src="/src/assets/logout.png" className='w-[24px] h-[24px]'></img>
       
          </button>
        </div>
        
        
      </div>
    </div>
    
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // customStyles={customStyles}
        className={`w-[300px] h-[150px] p-2.5 absolute top-[40%] left-[40%] border-[1.5px] border-stone-800  bg-stone-500 ${useLocation().pathname === "/add-post" ? `top-[30%]` :``  }`}>
   <div className='flex flex-col  '>
      {/* <button onClick={closeModal} className=''>close</button></div> */}
        <div className='text-center m-[10px] text-[18px]'>Do you really want to logout?</div>
          <div className='flex justify-center'>
          <button onClick={() => logout()}  className='m-[24px] w-[72px] h-[36px] hover:bg-stone-50 border-stone-800 bg-stone-200 border-[1.5px] shadow-xl'>YES</button>
          <button onClick={() => closeModal()}  className='m-[24px] w-[72px] h-[36px] hover:bg-stone-50 border-stone-800 bg-stone-200 border-[1.5px] shadow-xl' >NO</button>
          </div>
          </div>
      </Modal>
   
<script src="../scripts/js/open-modals-on-init.js"></script>
</div>
     
        </Container>
  )
}

export default Header