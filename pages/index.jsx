import Link from 'next/link'

export default function Home() {
  return (
    <>
      <ul>
        <li>
          <Link href="/a" as="/a">
            <a>A Page</a>
          </Link>
        </li>
        <li>
          <Link href="/b" as="/b">
            <a>B Page</a>
          </Link>
        </li>
      </ul>
      <br />
      
    </>
  )
}