import Link from 'next/link'
import Image from 'next/image'
import { AiFillHome } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { BsPinAngleFill } from 'react-icons/bs'
import { FaUserTie } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import { MdModeComment,MdPermMedia } from 'react-icons/md' 
import {GoSignOut} from 'react-icons/go'
import {signOut} from 'next-auth/react' 
function SideNav({activePage = 0}){
const css=`
.navOptions li:nth-child(${activePage}){
background:rgb(244 244 245);
}
.navOptions li:nth-child(${activePage}) a{
color:rgb(75 85 99);
}
`
const logout=()=>{
signOut({callbackUrl:'/login'})
}

return (
<aside className="min-h-screen h-max flex flex-col justify-between bg-gray-600 gap-5">
<style>
{css}
</style>

<div className="flex flex-col gap-1">
<Link href="/">
<div className="flex flex-col items-center p-3 gap-1">
<img 
src="/img/cropped-logo.jpg" 
className="rounded-full bg-zinc-100 p-1 shadow-md w-8 md:w-12"
/>
<h1 className="font-semibold text-zinc-100 text-2xl play hidden md:inline">مجلة الكاتب</h1>
<h3 className="font-semibold text-zinc-100 text-md hidden md:inline">Admin Panel</h3>
</div>
</Link>
<ul className="navOptions">
<li className="text-center md:text-start"><Link href="/"><AiFillHome className="inline align-sub"/> <span className='hidden md:inline'>Home</span></Link></li>
<li className="text-center md:text-start"><Link href="/posts"><BsPinAngleFill className="inline align-sub"/> <span className='hidden md:inline'>Posts</span></Link></li>
<li className="text-center md:text-start"><Link href="/authors"><FaUserTie className="inline align-baseline"/> <span className='hidden md:inline'>Authors</span></Link></li>
<li className="text-center md:text-start"><Link href="/categories"><BiCategory className="inline align-sub"/> <span className='hidden md:inline'>Categories</span></Link></li>
<li className="text-center md:text-start"><Link href="/subscriptions"><IoMdMail className="inline align-sub"/> <span className='hidden md:inline'>Subscriptions</span></Link></li>
<li className="text-center md:text-start"><Link href="/media"><MdPermMedia className="inline align-sub"/> <span className='hidden md:inline'>Media</span></Link></li>
<li className="text-center md:text-start"><Link href="/comments"><MdModeComment className="inline sub"/> <span className='hidden md:inline'>Comments</span></Link></li>
</ul>
</div>
<ul>

<li className="text-center md:text-start cursor-pointer" onClick={logout}><GoSignOut className="inline"/> <span className='hidden md:inline'>Logout</span></li>
</ul>
</aside>
)
}

export default SideNav
