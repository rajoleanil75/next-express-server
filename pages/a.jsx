import Link from 'next/link'
export default function A() {
  return(
    <>
      You are in Page A
      <br />
      <Link href="/b" as="/b">
        <a>GOTO Page B</a>
      </Link>
      <br />
      <Link href="/" as="/">
        <a>GOTO Home Page</a>
      </Link>
    </>
  ) 
}