import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
export default NextAuth({
session:{
strategy: 'jwt',
},
callbacks:{
async jwt({token, user}){
if(user?.name) token.name = user.name
return token;
},
async session({session, token}){
if(token?.name)session.user.name=token.name
return session
},
},
providers:[
CredentialProvider({
async authorize(credentials){
try {
        
        if(credentials.username==='KATIB' && credentials.password == 'katib@mnc'){

return {
name:'KATIB'
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
