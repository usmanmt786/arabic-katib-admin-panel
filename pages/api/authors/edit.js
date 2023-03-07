import excuteQuery from '@/utils/db'

const handler = async (req,res)=>{

if(req.method !== 'POST'){
return
}
const {id}=req.body
 const {name}=req.body
    const {bio}=req.body
    const {email}=req.body
    const {image}=req.body
    const {socialLink}=req.body
    const {books}=req.body
    const {works}=req.body
  console.log(email)
try{
const result = await excuteQuery({
            query: "UPDATE authors SET  author_name=?,author_bio=?,author_email=?,author_image=?,author_social_link=?,author_books=?,author_works=? WHERE author_id=?",
values:[name,bio,email,image,socialLink,books,works,id]

            
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
