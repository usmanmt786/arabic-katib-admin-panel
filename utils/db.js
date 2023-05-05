import mysql from 'serverless-mysql';

const db = mysql({  
config: {    
    host: "sql329.main-hosting.eu",    
    port:"",
    database: "u753608608_katibnew",
    user:"u753608608_katibnew",
    password: "Katib@mncmg123!@#"  
}});

export default async function excuteQuery({ query, values }) {  

try {    
const results = await db.query(query, values);

    await db.end();
    return results;  } 
catch (error) { 
   return { error };  
}}


