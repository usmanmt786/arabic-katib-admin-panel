import React, { useState } from 'react'
import Link from 'next/link'
function CategoryTable({data}){
const [optionStatus,setOPtionStatus]=useState()
return (
<div className="overflow-hidden flex flex-col">
 <div className="table_body">
      <table className="w-full ">
        <thead>
          <tr>
            <th className="w-1/12">Sl.No</th>
            <th className='w-1/12'>Category Id</th>
            
            <th>Category Name</th>
<th>Category Type</th>
            <th>Parent Category</th>
          
           
          </tr>
        </thead>
        <tbody>
          {data.map((obj,index)=>(
          <tr 
          onMouseOver={()=>{

setOPtionStatus(index)

}}
onMouseLeave={()=>{
setOPtionStatus()
}}
>
            <td className="text-center">{index+1}</td>
            <td className="text-center">{obj.cat_id}</td>
            <td className="text-center">{obj.cat_name}
{optionStatus==index && <div className="text-sm mt-2" style={{color:'blue'}}>
<Link href={`/admin/categories/edit/${obj.cat_link}`}
>Edit Category</Link> | <Link href={`https://katib.in/cat/${obj.cat_link}`}>View Category</Link>
</div>}

</td>
 <td className="text-center">{obj.cat_type}</td>
        <td className="text-center">{obj.parentname ? obj.parentname : obj.cat_name}</td>
          </tr>
          ))}
        
        </tbody>
      </table>
     </div>
</div>

)
}

export default CategoryTable
