import Head from 'next/head'
import Home from '../containers/Home'

export default function HomePage() {
  return (
    <>
      <Head>
        <title> Welcome</title>
      </Head>
      <Home />
    </>
  )
}
