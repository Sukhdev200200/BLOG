import React ,{useState,useEffect}from 'react'
import DBService from '../appwrite/DBfilemanage'
import  Container  from '../components/container/Container'
import BlogCard from '../components/BlogCard'


function Allposts() {
    const[posts,setPosts] = useState()

    useEffect(()=>{
        DBService.GetPost([]).then((posts)=> {
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
  return (
    <div className='w-full'>
        <Container>
            <div className='felx flex-wrap'>
                {posts.map((post)=>(
                    <div className='p-2 w-1/2 'key={post.$id}>
                        <BlogCard {...post}/>
                    </div>
                ))}
                
            </div>
        </Container>
      
    </div>
  )
}

export default Allposts
