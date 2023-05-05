import { useRouter } from 'next/router'
import React, {useEffect,useState} from "react";
import Link from 'next/link'
import axios from 'axios'
import PostsSearch from '@/comps/PostsSearch'
function PostTable({data,count}){
const [postData,setPostData]=useState(data)
const [optionStatus,setOPtionStatus]=useState()
const [loading,setLoading]=useState(false)
const [featureCount,setFeatureCount]=useState(count)
const [searchState,setSearchState]=useState(false)
const [query,setQuery]=useState('')
const [searchResults,setSearchResults]=useState([])
const [tableContent, setTableContent]=useState([])
useEffect(()=>{
if(searchState){
setTableContent(searchResults)
return
}
setTableContent(postData)
},[searchState,postData,searchResults])
return(
<div className="overflow-hidden flex flex-col">
<PostsSearch data={postData} searchResults={searchResults} setSearchResults={setSearchResults} setSearchState={setSearchState} query={query} setQuery={setQuery}/>
<div className="table_body">
      <table className="w-full">
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Post Id</th>
            <th>Post Title</th>
            <th>Author</th>
            <th>Post Type</th>
            <th>Post Category </th>
            <th>Posted Date</th>
           <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableContent.map((obj,index)=>(<tr onMouseOver={()=>{

setOPtionStatus(index)

}}
onMouseLeave={()=>{
setOPtionStatus()
}}
>
            <td className="text-center">{index+1}</td>
            <td className="text-center">{obj.post_id}</td>
            <td className="noto">{obj.post_title}
{optionStatus==index && <div className="text-sm mt-2" style={{color:'blue'}}>
<Link href={`/posts/edit/${obj.post_link}`} >Edit Post</Link> | <a className="hover:underline cursor-pointer" onClick={async()=>{
let answer = confirm(`Are you sure to delete ${obj.post_title}`)
if(answer){
let {data}=await axios.post('/api/posts/delete',{postId:obj.post_id})
if(data.status){
alert('Post deleted successfully')
axios.post('/api/posts').then(result=>{
result.data.map((obj)=>{
obj.post_addedOn=new Date(obj.post_addedOn).toLocaleDateString()
if(obj.cat_name) obj.cat_name=obj.cat_name.replace(/,/g, ", ")



})
setPostData(result.data)
setFeatureCount(result.data.filter((item)=>item.post_is_featured==1).length)
})



}else{
alert('Post deletion failed')
}}
}}
>Delete Post</a> | <Link href={`https://katib.in/${obj.post_link}`} legacyBehavior><a target="_blank">View Post</a></Link>
</div>}

</td>
            <td className="noto">{obj.author_name}</td>
            <td className="text-center">{obj.post_type}</td>
            <td>{obj.cat_name}</td>
            <td className="text-center">{obj.post_addedOn}</td>
<td className="text-center">{obj.post_is_featured==1 ? <button title="Click to 'Unfeature'" className="status-button featured" onClick={async()=>{
let agree=confirm(`Are you sure to unfeature ${obj.post_title}` )
if(agree){
setLoading(true)
let {data}=await axios.post('/api/posts/statusChange',{postId:obj.post_id,value:0})
setLoading(false)
if(data.status){
alert('Post is unfeatured')
axios.post('/api/posts').then(result=>{
result.data.map((obj)=>{
obj.post_addedOn=new Date(obj.post_addedOn).toLocaleDateString()
if(obj.cat_name) obj.cat_name=obj.cat_name.replace(/,/g, ", ")



})
setPostData(result.data)
setFeatureCount(result.data.filter((item)=>item.post_is_featured==1).length)
})



}else{
alert('Action failed..!')
}

}
}}>{loading ? 'Loading' : "Featured"}</button>:<button title={featureCount>=3 ? "" : "Click to 'Feature'"} className={`status-button ${featureCount>=3 ? 'disabled' : 'not-featured'}`}  onClick={async()=>{
let agree=confirm(`Are you sure to feature ${obj.post_title}` )
if(agree){
setLoading(true)
let {data}=await axios.post('/api/posts/statusChange',{postId:obj.post_id,value:1})
setLoading(false)
if(data.status){
alert('Post is featured')
axios.post('/api/posts').then(result=>{
result.data.map((obj)=>{
obj.post_addedOn=new Date(obj.post_addedOn).toLocaleDateString()
if(obj.cat_name) obj.cat_name=obj.cat_name.replace(/,/g, ", ")



})
setPostData(result.data)
setFeatureCount(result.data.filter((item)=>item.post_is_featured==1).length)
})



}else{
alert('Action failed..!')
}

}
}} disabled={featureCount>=3 ? "disabled" : ''}>Not Featured</button>}</td>
          </tr>))}
        
        </tbody>
      </table>
     </div>
</div>
)
}

export default PostTable

