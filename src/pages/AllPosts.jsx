import React from 'react'
import { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components/index'

const AllPosts = () => {



    const [posts, setPosts] = useState([]);
    useEffect(() => {
        service.getAllPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.document);
            }
        })
    }, [])





    return (
        <div className='w-full py-8' >


            <Container>
                <div className='flex flex-wrap' >
                    {
                        posts.map((post) => {
                            return <div key={post.$id} className='p-2 w-1/4' >
                                <PostCard post={post} />
                            </div>
                        })
                    }
                </div>
            </Container>




        </div>
    )
}

export default AllPosts