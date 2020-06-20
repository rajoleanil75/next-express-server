import Link from 'next/link'
import useSwr from 'swr'
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error } = useSwr(`/blogs/get`, fetcher)
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
      {data}
    </>
  )
}