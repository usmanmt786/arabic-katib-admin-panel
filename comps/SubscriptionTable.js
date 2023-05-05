import React, { useState } from 'react'


function SubscriptionTable({data}){
return (
<div className="overflow-hidden flex flex-col">
<div className="table_body">
      <table className="w-full ">
        <thead>
          <tr>
            <th className="w-1/12">Sl.No</th>
            <th className='w-1/12'>Subscription Id</th>
            
            <th>Subscripted Email</th>
           
          
           
          </tr>
        </thead>
        <tbody>
          {data.map((obj,index)=>(
          <tr>
            <td className="text-center">{index+1}</td>
            <td className="text-center">{obj.subs_id}</td>
            <td className="pl-5 md:text-center">{obj.subs_email}


</td>
        
          </tr>
          ))}
        
        </tbody>
      </table>
      </div>

</div>
)
}
export default SubscriptionTable
