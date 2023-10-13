import Post from '@/components/Post'
import Test_api from '@/components/test'
import Image from 'next/image'



export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
        <h1>Axios</h1>
      <Test_api/>
      <div>
        <Post/>
      </div>
    </main>
  )
}
