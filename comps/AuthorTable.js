import React, { useEffect,useState } from 'react'
import AuthorsSearch from '@/comps/AuthorsSearch'
import Link from 'next/link'
function AuthorTable({data}){

  const [optionStatus,setOPtionStatus]=useState()
const [searchState,setSearchState]=useState(false)
const [query,setQuery]=useState('')
const [authors,setAuthors]=useState(data)
const [searchResults,setSearchResults]=useState([])
const [tableContent, setTableContent]=useState([])

useEffect(()=>{
if(searchState){
setTableContent(searchResults)
return
}
setTableContent(authors)
},[searchState,authors,searchResults])

return (
<div className="overflow-hidden flex flex-col">
<AuthorsSearch data={authors}  searchResults={searchResults} setSearchResults={setSearchResults} setSearchState={setSearchState} query={query} setQuery={setQuery}/>
<div className="table_body">
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-1/12">Sl.No</th>
            <th className='w-1/12'>Author Id</th>
            
            <th>Author Name</th>
            <th>Author Email</th>
          
           
          </tr>
        </thead>
        <tbody>
          {tableContent.map((obj,index)=>(
          <tr 
          onMouseOver={()=>{

setOPtionStatus(index)

}}
onMouseLeave={()=>{
setOPtionStatus()
}}
>
            <td className="text-center">{index+1}</td>
            <td className="text-center">{obj.author_id}</td>
            <td className="md:pl-20 noto">{obj.author_name}
{optionStatus==index && <div className="text-sm mt-2" style={{color:'blue'}}>
<Link href={`/authors/edit/${obj.author_id}`}>Edit Author</Link> | <Link href={`https://ar.katib.in/author/${obj.author_id}`}>View Author</Link>
</div>}

</td>
        <td className="md:pl-20 ">{obj.author_email}</td>
          </tr>
          )) }
        
        </tbody>
      </table>
     </div>
</div>
)
}
export default AuthorTable
