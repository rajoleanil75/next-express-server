import Link from 'next/link'
export default function B() {
  return(
    <>
      You are in Page B
      <br />
      <Link href="/a" as="/a">
        <a>GOTO Page A</a>
      </Link>
      <br />
      <Link href="/" as="/">
        <a>GOTO Home Page</a>
      </Link>

    </>
  ) 
}