import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import excuteQuery from '@/utils/db'
export default NextAuth({
session:{
strategy: 'jwt',
},
callbacks:{
async jwt({token, user}){
if(user?.id) token.id= user.id
if(user?.displayName) token.displayName = user.displayName
return token;
},
async session({session, token}){
if(token?.id)session.user.id=token.id
if(token?.displayName)session.user.displayName=token.displayName
return session
},
},
providers:[
CredentialProvider({
async authorize(credentials){
try {
        const result = await excuteQuery({
            query: 'SELECT * FROM users WHERE BINARY user_username = ?',
            values: [ credentials.username ],
        });
        if(result && credentials.password == result[0].user_password){

return {
id: result[0].user_id,
name:result[0].user_username,
email:result[0].user_email,
displayName:result[0].user_displayName
}
}
throw new Error('Invalid user or password');
    } catch (error) {
        console.log(error);
    }



}
})
]
})
