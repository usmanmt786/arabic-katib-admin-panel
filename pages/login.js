import Layout from '@/comps/Layout'
import Image from 'next/image'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import { BsArrowRightShort } from 'react-icons/bs'
import {signIn} from 'next-auth/react'
import {getError} from '@/utils/error'
import {toast} from 'react-toastify'
import {useEffect} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/router'
export default function LoginPage() {
const router = useRouter()
const { data:session} = useSession()
const {redirect}=router.query
useEffect(()=>{
if(session?.user){
router.push(redirect || '/')
}
},[router,session,redirect])

const {
handleSubmit,
register,
formState: {errors},
} = useForm();

const submitHandler=async ({username,password})=>{
try{
const result = await signIn('credentials',{ 

redirect:false,
username,
password,
 })
if(result.error){
console.log(result)
toast.error(result.error)
}
}catch (err){
console.log(err)
toast.error(getError(err))
}
}

  return (
      <Layout title="KATIB - Login">
<div className="h-full flex flex-col items-center justify-center gap-5 text-gray-600">
<div className="flex flex-col items-center gap-2">
<Image
 src="/img/cropped-logo.jpg"
      alt="KATIB LOGO"
      width={100}
      height={100}
className="rounded-full bg-white p-1 shadow-md"
/>
<h1 className="text-5xl font-semibold">KATIB</h1>
<h3 className="text-xl font-semibold">Admin Panel</h3>
</div>
<form className="bg-zinc-200 px-4 py-3 w-4/5 sm:w-1/3 md:w-1/4 shadow-md h-fit rounded"
onSubmit={handleSubmit(submitHandler)}
>
<h2 className="text-2xl font-semibold text-center mb-2">Login</h2>
<div className="mb-2">
<label htmlFor="username">User Name</label>
<input 
id="username" 
type="text" 
className="w-full"
{...register('username',{required:"Please enter username"})}
/>
{errors.username && <div className="text-red-500">{errors.username.message}</div>  }
</div>
<div className="mb-2">
<label htmlFor="password">Password</label>
<input 
id="password" 
type="password" 
className="w-full"
{...register('password',{required:"Please enter username"})}
/>
{errors.password && <div className="text-red-500">{errors.password.message}</div>  }
</div>
<Link href="https://katib.in" legacyBehavior><a>Go to Katib<BsArrowRightShort className='inline'/></a></Link>
<button className="primary-button block m-auto my-2">Login</button>
</form>
</div>
</Layout>
  
  )
}
