import Layout from '@/comps/Layout'
import SideNav from '@/comps/SideNav'
import Link from 'next/link'
import AddPostForm from '@/comps/AddPostForm'
import excuteQuery from '@/utils/db'
import axios from 'axios'
import {useEffect,useState} from 'react'
export default function AddPostPage({data}) {
const [posts,setPosts] = useState([])
useEffect(()=>{
const getPosts=async ()=>{
const data=await axios.post('/api/posts')
setPosts(data.data)

}
getPosts()
 
},[posts])

const authors=JSON.parse(data.authors)
const categories=JSON.parse(data.categories)

  return (
      <Layout title="KATIB - Add Post ">
<section className="flex">
<SideNav activePage={2}/>
<div className="w-full h-screen overflow-hidden p-2 flex flex-col gap-2">
<div className="flex justify-between border-b-2 border-gray-300 p-2 ">
<h1 className="  font-semibold text-3xl ">Add New Post</h1>

</div>

<AddPostForm authors={authors} categories={categories} posts={posts}/>


</div>
</section>
</Layout>
  
  )
}
AddPostPage.auth=true


export async function getServerSideProps(){

        const authors = await excuteQuery({
            query: 'SELECT * FROM authors'
            
        });
           const categories = await excuteQuery({
            query: 'SELECT * FROM categories'
            
        });
  
return {

props:{
data:{authors:JSON.stringify(authors),categories:JSON.stringify(categories)}
}
}
}
