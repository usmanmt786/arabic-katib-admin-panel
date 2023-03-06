import Layout from '@/comps/Layout'
import SideNav from '@/comps/SideNav'
export default function Home() {
  return (
      <Layout title="KATIB - Admin">
<section className="flex">
<SideNav activePage={1}/>

</section>


</Layout>
  
  )
}
Home.auth=true
