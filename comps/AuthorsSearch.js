import React,{useState,useEffect} from 'react'
import {BsSearch} from "react-icons/bs";

function AuthorsSearch({data,query,setQuery,setSearchState,searchResults,setSearchResults}) {

useEffect(()=>{
if(query!=""){
setSearchState(true)
let temp=data.filter((item)=>{
return item.author_name.toLowerCase().startsWith(query.toLowerCase());
})
setSearchResults(temp)
}else setSearchState(false)
},[query])
  return (

<div className="flex justify-end items-center my-2  ">
<div className=" bg-white pl-4 p-2 rounded-full">
<BsSearch className="inline"/>
<input type="search" style={{outline:"0"}} placeholder="Search table.." className="ml-2" value={query} onChange={(e)=>{
setQuery(e.target.value)

}}/>
</div>
</div>
       
  )
}

export default AuthorsSearch








 
