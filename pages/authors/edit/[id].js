import Layout from '@/comps/Layout'
import SideNav from '@/comps/SideNav'
import Link from 'next/link'
import EditAuthorForm from '@/comps/EditAuthorForm'
import excuteQuery from '@/utils/db'

export default function EditAuthorPage({data}) {
const author=JSON.parse(data.author)

  return (
      <Layout title="KATIB - Edit Author ">
<section className="flex">
<SideNav activePage={3}/>
<div className="w-full h-screen overflow-hidden p-2 flex flex-col gap-2">
<div className="flex justify-between border-b-2 border-gray-300 p-2 ">
<h1 className="  font-semibold text-3xl ">Add Author</h1>
<Link href="/authors/add" legacyBehavior><a className="add-button">Edit Author</a></Link>
</div>


<EditAuthorForm author={author}/>

</div>
</section>
</Layout>
  
  )
}
EditAuthorPage.auth=true

export async function getServerSideProps(context){
const {params}=context
const {id}=params
const author = await excuteQuery({
query:'SELECT * FROM authors WHERE author_id=?',
values:[id]
})
  
return {

props:{
data:{author:JSON.stringify(author[0])}
}
}
}

