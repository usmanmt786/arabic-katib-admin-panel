import Layout from '@/comps/Layout'
import SideNav from '@/comps/SideNav'
import Link from 'next/link'
import PostTable from '@/comps/PostTable'
import excuteQuery from '@/utils/db'
import {useEffect} from 'react'
export default function PostsPage({data}) {
const posts=JSON.parse(data)
let count
count=posts.filter((item)=>item.post_is_featured==1).length
useEffect(()=>{
posts.map((obj,index)=>{
obj.post_addedOn=new Date(obj.post_addedOn).toLocaleDateString()

if(obj.cat_name) obj.cat_name=obj.cat_name.replace(/,/g, ", ")
})
},[posts])
  return (
      <Layout title="KATIB - Posts ">
<section className="flex">
<SideNav activePage={2}/>
<div className="w-full h-screen overflow-hidden p-2 flex flex-col gap-2">
<div className="flex justify-between border-b-2 border-gray-300 p-2 ">
<h1 className="  font-semibold text-3xl ">Posts</h1>
<Link href="/posts/add" legacyBehavior><a className="add-button">Add Post</a></Link>
</div>


<PostTable data={posts} count={count}/>

</div>
</section>
</Layout>
  
  )
}
PostsPage.auth=true


export async function getServerSideProps(){


        const posts = await excuteQuery({
            query: 'SELECT posts.*,authors.author_name, GROUP_CONCAT(categories.cat_name) as cat_name  FROM posts LEFT JOIN authors ON posts.post_authorId=authors.author_id LEFT JOIN categories ON find_in_set(categories.cat_id,posts.post_categoryId) >0 GROUP BY posts.post_id'
            
        });
        
  
return {

props:{
data:JSON.stringify(posts)
}
}
}
