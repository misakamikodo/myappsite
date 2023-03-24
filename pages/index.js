import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Card from '@components/Card'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Card title="计算器">
            内容
        </Card>
      </main>

      <Footer />
    </div>
  )
}
