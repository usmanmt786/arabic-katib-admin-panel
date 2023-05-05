import Link from 'next/link'

function DashCard({title,link,data,add}){
return(
<div className="card">
<h1>{title}</h1>
<div>
<h3>Overview</h3>
<div>
<h4>Total {title}</h4>
<h4>{data}</h4>
</div>

</div>
<div>
<Link href={`/${link}`}>View</Link>
{add && <Link href={`/${link}/add`}>Add New</Link>}
</div>
</div>
)
}
export default DashCard
