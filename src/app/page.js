import Nav from '@/components/Nav'
import Social from '@/components/Social'
import Landing from '@/pages/Landing'
import Image from 'next/image'
import styles from './globals.css'

export default function Home() {
  return (
    <main className="main">
      <Nav />
      <Social />
      <Landing />
    </main>
  )
}
