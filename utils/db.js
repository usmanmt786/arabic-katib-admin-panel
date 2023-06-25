import mysql from 'serverless-mysql';

const db = mysql({  
config: {    
   //host: process.env.MYSQL_HOST,
host:'localhost',    
    //port: process.env.MYSQL_PORT,
port:3307,
    //database: process.env.MYSQL_DATABASE,
database:'katib',
    //user: process.env.MYSQL_USER,
user:'Usmanmt786',
    //password: process.env.MYSQL_PASSWORD
password:'usman@786'
}});

export default async function excuteQuery({ query, values }) {  

try {    
const results = await db.query(query, values);

    await db.end();
    return results;  } 
catch (error) { 
   return { error };  
}}


