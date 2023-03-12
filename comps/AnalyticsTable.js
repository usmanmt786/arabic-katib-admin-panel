import {useEffect,useState} from 'react'
import axios from 'axios'
function AnalyticsTable({allPosts}){
const toDateInputValue = function (date) {
    var local = new Date(date);
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset())
    return local.toJSON().slice(0, 10)
}

const today=new Date()
const [toDate,setToDate]=useState(toDateInputValue(today))

const [loading,setLoading]=useState()
const [toMax,setToMax]=useState()
const [fromDate,setFromDate]=useState(toDateInputValue(today.setDate(today.getDate() - 7)))
const [toMin,setToMin]=useState()
const [fromMax,setFromMax]=useState()



const temp=[]
const [postViews,setPostViews]=useState([])
useEffect(()=>{
setLoading(true)
const today=new Date()

const getAnalyticsData=async ()=>{
const {data}=await axios.post('/api/analytics',{
startDate:fromDate,
endDate:toDate
})

data.map(obj=>{
allPosts.map(item=>{
if(obj.dimensionValues[0].value==`/${item.post_link}`){
obj.dimensionValues[0].title=item.post_title
temp.push(obj)
}

})
})

setPostViews(temp)
setLoading(false)

}
if(fromDate!=''&&toDate!=''){
setToMax(toDateInputValue(today))
setToMin(toDateInputValue(new Date(fromDate).setDate(new Date(fromDate).getDate()+1)))
setFromMax(toDateInputValue(new Date(toDate).setDate(new Date(toDate).getDate()-1)))
getAnalyticsData()
}
},[fromDate,toDate])
return(
<div className=" h-screen flex flex-col">
<h1 className="text-2xl font-bold border-b-2 mb-2">Analytics Report</h1>
<div className="flex justify-end items-center gap-2 mb-2 pr-2">
<div>
<label htmlFor="from" className="font-semibold">From: </label>
<input id="from" type="date" value={fromDate} max={fromMax} onChange={(e)=>{
setFromDate(e.target.value)

}}/>
</div>

<div>
<label  htmlFor="to" className="font-semibold">To: </label>
<input id="to" type="date" value={toDate} min={toMin} max={toMax} onChange={(e)=>{
setToDate(e.target.value)

}}/>
</div>

</div>

<div className="table_body ">
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-1/12 ">Sl.No</th>
            <th>Posts</th>
            
            <th className="w-2/12">Views</th>
            <th className="w-2/12">Users</th>
          
           
          </tr>
        </thead>
        <tbody>
         {!loading ? postViews.map((obj,index)=>(
<tr>
<td className="text-center">{index+1}</td>
<td  className="noto">{obj.dimensionValues[0].title}</td>
<td className="text-center">{obj.metricValues[0].value}</td>
<td  className="text-center">{obj.metricValues[1].value}</td>
</tr>
)):<tr>
<td colSpan={4} className="text-center font-semibold text-xl">
Loading....
</td>
</tr>}
        
        </tbody>
      </table>
     </div>
</div>

)
}
export default AnalyticsTable
