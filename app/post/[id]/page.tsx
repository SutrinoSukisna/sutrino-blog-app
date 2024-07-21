import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Post(){
    // const router = useRouter();
    // const { id } = router.query;

    return (
        <>
            <div>
                {/* <h1>{post.title}</h1>
                <p>{post.body}</p> */}
                <h2>Comments</h2>
                {/* <ul>
                    {comments.slice(0, loadMore).map(comment => (
                    <li key={comment.id}>{comment.body}</li>
                    ))}
                </ul>
                {loadMore < comments.length && (
                    <button onClick={() => setLoadMore(loadMore + 3)}>Load More</button>
                )} */}
            </div>
        </>
    );
} 