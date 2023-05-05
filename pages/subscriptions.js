import Layout from '@/comps/Layout'
import SideNav from '@/comps/SideNav'
import Link from 'next/link'
import SubscriptionTable from '@/comps/SubscriptionTable'
import excuteQuery from '@/utils/db'

export default function SubscriptionsPage({data}) {
const subscriptions=JSON.parse(data)

  return (
      <Layout title="KATIB - Subscriptions ">
<section className="flex">
<SideNav activePage={5}/>
<div className="w-full h-screen overflow-hidden p-2 flex flex-col gap-2">
<div className="flex justify-between border-b-2 border-gray-300 p-2 ">
<h1 className="  font-semibold text-3xl ">Subscriptions</h1>
</div>


<SubscriptionTable data={subscriptions}/>

</div>
</section>
</Layout>
  
  )
}
SubscriptionsPage.auth=true


export async function getServerSideProps(){


        const subscriptions = await excuteQuery({
            query: 'SELECT * FROM email_subscription'
            
        });
        
  
return {

props:{
data:JSON.stringify(subscriptions)
}
}
}
