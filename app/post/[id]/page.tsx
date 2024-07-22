"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Skeleton from '../../components/skeleton';

interface Params {
  id: string;
}
interface Comment {
  id: number;
  body: string;
}

interface Post {
  title: string;
  body: string;
  tags: string[];
}
export default function PostPage({params}:{ params: Params}){
  const { id } = params;
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loadMore, setLoadMore] = useState(3);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchPost = async () => {
        try {
          const res = await fetch(`https://dummyjson.com/posts/${id}`);
          const data = await res.json();
          setPost(data);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };

      const fetchComments = async () => {
        try {
          const res = await fetch(`https://dummyjson.com/posts/${id}/comments`);
          const data = await res.json();
          setComments(data.comments);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };

      Promise.all([fetchPost(), fetchComments()])
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <>
      <style jsx>{`
        .skeleton-container{
          padding:8rem 13rem 8rem 13rem;
        }
      `}</style>
      <div className='container skeleton-container mx-auto'>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
      </div>
      </>
    );
  }

  if (!post) return null;

  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <>
    <style jsx>{`
        .post-container{
          padding:5rem 10rem 5rem 10rem;
        }
        .post-comments-container{
          line-height:2.5rem;
          text-indent:1rem;
        }
        .post-comments-content{
          border:1px solid rgba(0,0,0,.125);
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tag {
          padding: 4px 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: #f5f5f5;
          font-size: 0.875rem;
        }
      `}</style>
      <div className='container post-container mx-auto px-4 py-5'>
        <h1 className='text-center text-3xl font-bold pb-8'>{post.title}</h1>
        <p className='text-lg pb-5'>{post.body}</p>
        <div className='tags pb-8'>
          {post.tags.map((tag: string, index: number) => (
            <span key={index} className='tag'>{tag}</span>
          ))}
        </div>
        <h2 className='text-xl font-semibold pb-2'>Comments</h2>
        <ul className='post-comments-container'>
          {comments.slice(0, loadMore).map(comment => (
            <li key={comment.id} className='post-comments-content mb-2'>{comment.body}</li>
          ))}
        </ul>
        {loadMore < comments.length && (
          <button onClick={() => setLoadMore(loadMore + 3)} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
            Load More
          </button>
        )}
      </div>
    </>
  );
};
