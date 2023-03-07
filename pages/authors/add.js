import Layout from '@/comps/Layout'
import SideNav from '@/comps/SideNav'
import Link from 'next/link'
import AddAuthorForm from '@/comps/AddAuthorForm'


export default function AddAuthorPage() {


  return (
      <Layout title="KATIB - Add Author ">
<section className="flex">
<SideNav activePage={3}/>
<div className="w-full h-screen overflow-hidden p-2 flex flex-col gap-2">
<div className="flex justify-between border-b-2 border-gray-300 p-2 ">
<h1 className="  font-semibold text-3xl ">Add Author</h1>
<Link href="/authors/add" legacyBehavior><a className="add-button">Add Author</a></Link>
</div>


<AddAuthorForm/>

</div>
</section>
</Layout>
  
  )
}
AddAuthorPage.auth=true



