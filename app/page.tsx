"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Skeleton from '../app/components/skeleton';

export default function HomePage(){
  const [posts, setPosts] = useState<any[]>([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/posts?limit=6&skip=${(page-1)*6}`);
        const data = await res.json();
        setPosts(data.posts);
        setTotalPages(Math.ceil(data.total / 6));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const numberOfSkeletons = loading ? 6 : posts.length;

  const visiblePages = 5;
  const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  return (
    <>
      <style jsx>{`
        .blog-container {
          padding-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .blog-card{
          display: grid;
          grid-template-columns: repeat(3,auto);
          position: relative;
          min-width: 0;
          word-wrap: break-word;
          background-color: #fff;
          background-clip: border-box;
          gap: 1rem;
        }
        .blog-content{
          border: 1px solid rgba(0,0,0,.125);
          border-radius: 0.25rem;
          padding: 1rem;
        }
          .blog-pagination{
            display:flex;
            gap:1rem;
            justify-content:end;
          }
          .blog-pagination button{
            padding: 8px 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: white;
            cursor: pointer;
          }
          .blog-pagination button.active{
            background: #0070f3;
            color: white;
          }
      `}</style>
    <div className='container blog-container mx-auto'>
      <h1 className='font-bold text-xl'>Blog Posts</h1>
      {loading ? (
        <div>
          {Array.from({length : numberOfSkeletons}).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
    ) : (
      <>
        <ul className='blog-card'>
            {posts.map(post => (
              <li className='blog-content' key={post.id}>
                <Link className='font-bold text-lg mb-4' href={`/post/${post.id}`}>
                  {post.title}
                </Link>
                <p>{post.body.slice(0, 100)}...</p>
              </li>
            ))}
          </ul>
          <div className="blog-pagination">
            {startPage > 1 && (
              <>
                <button onClick={() => setPage(1)}>1</button>
                {startPage > 2 && <span>...</span>}
              </>
            )}
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
              <button
                key={startPage + i}
                onClick={() => setPage(startPage + i)}
                className={page === startPage + i ? 'active' : ''}
              >
                {startPage + i}
              </button>
            ))}
            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && <span>...</span>}
                <button onClick={() => setPage(totalPages)}>{totalPages}</button>
              </>
            )}
      </div>
        </>
      )}
    </div>
    </>
  );
};
