import excuteQuery from '@/utils/db'

const handler = async (req,res)=>{

if(req.method !== 'POST'){
return
}
const {id}=req.body
 const {name}=req.body
    const {parent}=req.body
    const {link}=req.body
    const {type}=req.body
   

try{
const result = await excuteQuery({
            query: "UPDATE categories SET  cat_name=?,cat_parent=?,cat_link=?,cat_type=? WHERE cat_id=?",
values:[name,parent,link,type,id]

            
        });

if(result){

res.send({status:true})
return
}       
res.send({status:false}) 
}catch(error){
console.log(error)
res.send({status:false})
}
    
    

} 
export default handler
