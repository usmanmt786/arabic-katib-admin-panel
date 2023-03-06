import excuteQuery from '@/utils/db'

const handler = async (req,res)=>{

if(req.method !== 'POST'){
return
}
const {postId}=req.body
try{
const result = await excuteQuery({
            query: 'DELETE FROM posts WHERE post_id=?',
values:[postId]

            
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
