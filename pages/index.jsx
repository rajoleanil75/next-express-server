/*******************************************************************************
 * MIT License
 * 
 * Copyright (c) 2020 Anil D Rajole
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE. 
 ******************************************************************************/
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