import Layout from '@/comps/Layout'
import SideNav from '@/comps/SideNav'
import Link from 'next/link'
import CategoryTable from '@/comps/CategoryTable'
import excuteQuery from '@/utils/db'

export default function CategoriesPage({data}) {
const categories=JSON.parse(data)

  return (
      <Layout title="KATIB - Categories ">
<section className="flex">
<SideNav activePage={4}/>
<div className="w-full h-screen overflow-hidden p-2 flex flex-col gap-2">
<div className="flex justify-between border-b-2 border-gray-300 p-2 ">
<h1 className="  font-semibold text-3xl ">Categories</h1>
<Link href="/authors/add" legacyBehavior><a className="add-button">Add Category</a></Link>
</div>


<CategoryTable data={categories}/>

</div>
</section>
</Layout>
  
  )
}
CategoriesPage.auth=true


export async function getServerSideProps(){


        const categories = await excuteQuery({
            query: 'SELECT * FROM categories'
            
        });
        
  
return {

props:{
data:JSON.stringify(categories)
}
}
}
