"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage(){
  const [posts, setPosts] = useState<any[]>([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`https://dummyjson.com/posts?limit=6&skip=${(page-1)*6}`);
      const data = await res.json();
      setPosts(data.posts);
      setTotalPages(Math.ceil(data.total / 6));
    };

    fetchPosts();
  }, [page]);

  return (
    <div className='container mx-auto'>
      <h1>Blog Posts</h1>
      <ul>
      {posts.map(post => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>
              {post.title}
            </Link>
            <p>{post.body.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
};
