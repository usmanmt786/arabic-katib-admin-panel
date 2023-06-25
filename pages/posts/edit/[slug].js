import Layout from '@/comps/Layout'
import SideNav from '@/comps/SideNav'
import Link from 'next/link'
import EditPostForm from '@/comps/EditPostForm'
import excuteQuery from '@/utils/db'
import axios from 'axios'
import {useEffect,useState} from 'react'
export default function EditPostPage({data}) {
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
const post = JSON.parse(data.post)

  return (
      <Layout title="KATIB - Edit Post ">
<section className="flex">
<SideNav activePage={2}/>
<div className="w-full h-screen overflow-hidden p-2 pb-1 flex flex-col gap-2">
<div className="flex justify-between border-b-2 border-gray-300 p-2 ">
<h1 className="  font-semibold text-3xl ">Edit Post</h1>

</div>


<EditPostForm authors={authors} categories={categories} post={post} posts={posts}/>

</div>
</section>
</Layout>
  
  )
}
EditPostPage.auth=true


export async function getServerSideProps(context){
const {params}=context
const {slug} = params
const post = await excuteQuery({
query:'SELECT * FROM posts WHERE post_link=?',
values:[slug]
})
const postCategories= await excuteQuery({
query:"SELECT * FROM categories WHERE find_in_set(cat_id,?)",
values:[post[0].post_categoryId]
})
const nextPosts=await excuteQuery({
query:"SELECT * FROM posts WHERE find_in_set(post_id,?)",
values:[post[0].post_next_posts]
})
post[0].categories=postCategories
post[0].nextPosts=nextPosts

       const authors = await excuteQuery({
            query: 'SELECT * FROM authors'
            
        });
           const categories = await excuteQuery({
            query: 'SELECT * FROM categories'
            
        });
  
return {

props:{
data:{authors:JSON.stringify(authors),categories:JSON.stringify(categories),post:JSON.stringify(post[0])}
}
}
}

