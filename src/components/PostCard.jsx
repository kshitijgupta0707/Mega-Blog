import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'
//id ko yeh dena ka tarreka hianappwrite ka
//bhut sre features hote hain view count vagara
const PostCard = ({ $id, title, featuredImage }) => {
    return (
        <Link to={`/post/${$id}`} >
            <div className=' w-full bg-gray-100 rounded-xl p-4' >
                <div className=' w-full justify-center mb-4' >
                    <img src={service.getFilePreview(featuredImage)} alt={title} className=' rounded-xl' />
                </div>
                <h2 className=' text-xl font-bold'  >{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard