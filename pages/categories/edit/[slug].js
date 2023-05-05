import Layout from '@/comps/Layout'
import SideNav from '@/comps/SideNav'
import Link from 'next/link'
import EditCategoryForm from '@/comps/EditCategoryForm'
import excuteQuery from '@/utils/db'

export default function EditCategoryPage({data}) {
const categories=JSON.parse(data.categories)
const category=JSON.parse(data.category)
console.log(category)
  return (
      <Layout title="KATIB - Edit Category ">
<section className="flex">
<SideNav activePage={4}/>
<div className="w-full h-screen overflow-hidden p-2 flex flex-col gap-2">
<div className="flex justify-between border-b-2 border-gray-300 p-2 ">
<h1 className="  font-semibold text-3xl ">Edit Category</h1>

</div>


<EditCategoryForm data={categories} category={category}/>

</div>
</section>
</Layout>
  
  )
}
EditCategoryPage.auth=true


export async function getServerSideProps(context){
const {params} = context
const {slug}=params

        const category = await excuteQuery({
            query: 'SELECT * FROM categories WHERE cat_link=?',

values:[slug]
            
        });
         const categories = await excuteQuery({
            query: 'SELECT * FROM categories',


            
        });
  
return {

props:{
data:{category:JSON.stringify(category[0]),categories:JSON.stringify(categories)}
}
}
}
