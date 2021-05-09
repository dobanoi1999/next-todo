import Head from 'next/head'
import { useRouter, withRouter } from 'next/router';
import { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { logged } from "../recoil/logged";
import AddTodo from '../component/addtodo'
import ListTodo from '../component/listTodo'
import axios from 'axios';


const Home = () => {
  const [isLogged, setIsLogged] = useRecoilState(logged);

  const router = useRouter()
  useEffect(() => {
    axios.get('api/auth/check', {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      }
    }).then(res => {
      setIsLogged(res.data)

      if (!res.data) return router.push("/login")
    })
      .catch(err => console.log(err.response))
  })

  return (
    <>
      <Head >
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="p-5 text-white font-mono "  >
        <div className="shadow-xl bg-gray-600 max-w-2xl rounded-lg mx-auto p-8">
          <h1 className="text-center font-bold text-3xl">My todo list</h1>
          <AddTodo />
          <ListTodo />
        </div>
      </div>
    </>
  )
}
export default withRouter(Home)