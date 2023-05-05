import Layout from '@/comps/Layout'
import SideNav from '@/comps/SideNav'
import Link from 'next/link'
import AuthorTable from '@/comps/AuthorTable'
import excuteQuery from '@/utils/db'

export default function AuthorsPage({data}) {
const authors=JSON.parse(data)

  return (
      <Layout title="KATIB - Authors ">
<section className="flex">
<SideNav activePage={3}/>
<div className="w-full h-screen overflow-hidden p-2 flex flex-col gap-2">
<div className="flex justify-between border-b-2 border-gray-300 p-2 ">
<h1 className="  font-semibold text-3xl ">Authors</h1>
<Link href="/authors/add" legacyBehavior><a className="add-button">Add Author</a></Link>
</div>


<AuthorTable data={authors}/>

</div>
</section>
</Layout>
  
  )
}
AuthorsPage.auth=true


export async function getServerSideProps(){


        const authors = await excuteQuery({
            query: 'SELECT * FROM authors'
            
        });
        
  
return {

props:{
data:JSON.stringify(authors)
}
}
}
