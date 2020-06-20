import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import axios from 'axios'

export default function Home() {
  const [blogData, setBlogData] = useState('');

  useEffect(() => {
    axios
    .get(`/blogs/get`)
    .then((response) => {
      if (response.status === 200)
        setBlogData(response.data);
      else
        setBlogData('Error occured while fetching data..!!');
    })
    .catch((errors) => {
      setBlogData('Error occured while fetching data..!!');
    });
  });

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
      {blogData}
    </>
  )
}