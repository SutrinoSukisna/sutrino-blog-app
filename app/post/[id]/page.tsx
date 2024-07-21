"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Define the type for the params
interface Params {
  id: string;
}
export default function PostPage({params}:{ params: Params}){
  const { id } = params;
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loadMore, setLoadMore] = useState(3);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const res = await fetch(`https://dummyjson.com/posts/${id}`);
        const data = await res.json();
        setPost(data);
      };

      fetchPost();

      const fetchComments = async () => {
        const res = await fetch(`https://dummyjson.com/posts/${id}/comments`);
        const data = await res.json();
        console.log(data);
        setComments(data.comments);
      };

      fetchComments();
    }
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>{post.tags}</p>
      <h2>Comments</h2>
      <ul>
        {comments.slice(0, loadMore).map(comment => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
      {loadMore < comments.length && (
        <button onClick={() => setLoadMore(loadMore + 3)}>Load More</button>
      )}
    </div>
  );
};
