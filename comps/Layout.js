import Head from 'next/head'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function Layout ({children,title}){
return(
<>
  <Head>
        <title>{title ? title :"KATIB - Admin"}</title>
        <meta name="description" content="Admin Panel of KATIB Magazine" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/cropped-logo.jpg" />
      </Head>
<ToastContainer position="bottom-center" limit={1}/>
<main className="flex min-h-screen flex-col bg-zinc-100 overflow-x-hidden">
{children}
</main>
</>
)
}
export default Layout
