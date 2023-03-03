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
        return result[0];
    } catch (error) {
        console.log(error);
    }


if(result && credentials.password == result.user_password){

return {
id: result.user_id,
name:result.user_username,
email:result.user_email,
displayName:result.user_displayName
}
}
throw new Error('Invalid email or password')
}
})
]
})
