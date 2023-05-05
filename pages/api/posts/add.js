import excuteQuery from '@/utils/db'

const handler = async (req,res)=>{
const featureUpdate=async ()=>{
try{
const result=await excuteQuery({
query:"SELECT MIN(post_id) AS minId FROM  posts WHERE post_is_featured=?",
values:[1]
})
if(result){
const minFeaturedId=result[0].minId
try{
const result=await excuteQuery({
query:"UPDATE posts SET post_is_featured=0 WHERE post_id=?",
values:[minFeaturedId]
})
if(result){

return
}else{
featureUpdate()
}
}catch(error){
console.log(error)
featureUpdate()
}
}else{
featureUpdate()

}
}catch(error){
console.log(error)
featureUpdate()
}
}
if(req.method !== 'POST'){
return
}
 const {title}=req.body
    const {body}=req.body
    const {type}=req.body
    const {author}=req.body
    const {category}=req.body
    const {feature}=req.body
    const {thumb}=req.body
    const {seoThumb}=req.body
    const {postLink}=req.body
    const {excerpt}=req.body
    const {podLink}=req.body
    const {vidLink}=req.body
    const {tags}=req.body
    const {seoTags}=req.body
    const {credit}=req.body
    const {creditLink}=req.body
    const {nexts}=req.body
try{
const result = await excuteQuery({
            query: "INSERT INTO posts (post_title, post_body,post_type,post_authorId,post_categoryId,post_thumb,post_seo_thumb,post_podLink, post_vidLink, post_tags, post_seoTags, post_link,post_excerpt, post_is_featured,post_credit,post_credit_link,post_next_posts,post_addedBy) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
values:[title,body,type,author,category,thumb,seoThumb,podLink,vidLink,tags,seoTags,postLink,excerpt,feature,credit,creditLink,nexts,0]

            
        });

if(result){
if(feature == 1){
featureUpdate()

}
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
