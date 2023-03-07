import Layout from '@/comps/Layout'
import SideNav from '@/comps/SideNav'
import Dashboard from '@/comps/Dashboard'
import excuteQuery from '@/utils/db'
export default function Home({data}) {
  return (
      <Layout title="KATIB - Admin">
<section className="flex">
<SideNav activePage={1}/>
<div className="w-full h-screen overflow-hidden p-2 flex flex-col gap-2">
<div className="flex justify-between border-b-2 border-gray-300 p-2 ">
<h1 className="  font-semibold text-3xl ">Dashboard</h1>

</div>


<Dashboard data={data}/>

</div>
</section>


</Layout>
  
  )
}
Home.auth=true

export async function getServerSideProps(){


        const posts = await excuteQuery({
            query: "SELECT COUNT(post_id) AS posts FROM posts",

        });

const authors = await excuteQuery({
            query: "SELECT COUNT(author_id) AS authors FROM authors",

        });
const categories = await excuteQuery({
            query: "SELECT COUNT(cat_id) AS categories FROM categories",

        });
const subscriptions = await excuteQuery({
            query: "SELECT COUNT(subs_id) AS subscriptions FROM email_subscription",

        });
        
  console.log(posts)
return {

props:{
data:{posts:posts[0].posts,authors:authors[0].authors,categories:categories[0].categories,subscriptions:subscriptions[0].subscriptions}
}
}
}
