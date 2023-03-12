import Link from 'next/link'
import DashCard from '@/comps/DashCard'

function QuickLinks({data}){


return(

<div className="overflow-auto flex flex-col grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-3 mb-2">
<DashCard title="Posts" link="posts" data={data.posts} add={true}/>
<DashCard title="Authors" link="authors" data={data.authors} add={true}/>
<DashCard title="Categories" link="categories" data={data.categories} add={true}/>
<DashCard title="Subscriptions" link="subscriptions" data={data.subscriptions}/>
</div>

)
}
export default QuickLinks
