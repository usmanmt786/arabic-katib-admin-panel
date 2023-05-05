import Layout from '@/comps/Layout'
import SideNav from '@/comps/SideNav'
import Link from 'next/link'
import MediaScreen from '@/comps/MediaScreen'
import excuteQuery from '@/utils/db'

export default function MediaPage({data}) {
const posts=JSON.parse(data)

  return (
      <Layout title="KATIB - Media">
<section className="flex">
<SideNav activePage={6}/>
<div className="w-full h-screen overflow-hidden p-2 flex flex-col gap-2">
<div className="flex justify-between border-b-2 border-gray-300 p-2 ">
<h1 className="  font-semibold text-3xl ">Media</h1>
</div>


<MediaScreen data={posts}/>

</div>
</section>
</Layout>
  
  )
}
MediaPage.auth=true


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
