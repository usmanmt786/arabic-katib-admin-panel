import excuteQuery from '@/utils/db'

const handler = async (req,res)=>{

if(req.method !== 'POST'){
return
}
const {postId}=req.body
const {value} = req.body

try{
const result = await excuteQuery({
            query: 'UPDATE posts SET post_is_featured=? WHERE post_id=?',
values:[value,postId]

            
        });

if(result){
res.send({status:true})
console.log(result)
return
}       
res.send({status:false}) 
}catch(error){
console.log(error)
res.send({status:false})
}
}
export default handler
