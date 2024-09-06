import React from 'react'
import DBService  from '../appwrite/DBfilemanage'
import {Link} from 'react-router-dom'

function BlogCard({
    $id,Title,Image

}) {
  return (
    <Link to={`/Blog/${$id}`}>
        <div className='w-full'>
            <div>
                <img src={DBService.getFilePreview(Image)} alt={Title} className='rounded-lg'/>
            </div>
            <h2 className='font-bold '>{Title}</h2>
        </div>
    </Link>
  )
}

export default BlogCard
