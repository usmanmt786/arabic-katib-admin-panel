import excuteQuery from '@/utils/db'

const handler = async (req,res)=>{

if(req.method !== 'POST'){
return
}
       const posts = await excuteQuery({
            query: 'SELECT posts.*,authors.author_name, GROUP_CONCAT(categories.cat_name) as cat_name  FROM posts LEFT JOIN authors ON posts.post_authorId=authors.author_id LEFT JOIN categories ON find_in_set(categories.cat_id,posts.post_categoryId) >0 GROUP BY posts.post_id'
            
        });
        
    
res.send(posts)
} 
export default handler
