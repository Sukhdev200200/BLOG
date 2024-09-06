import React,{useState,useEffect} from 'react'
import  DBService from '../appwrite/DBfilemanage'
import  Container  from '../components/container/Container'
import BlogCard from '../components/BlogCard'


function Home() {
    const [post,setPost] = useState([])
    useEffect(()=>{
        DBService.GetPost([]).then((post)=>{
            if(post){
                setPost(post.documents)
            }
        })
    },[])
    if(post.length === 0){
        return (
            <div className='w-full'>
                <Container>
                    <div className=''>
                        <h2 className='text-center text-red-500'>There is No Posts Are Available Please Login</h2>
                    </div>
                </Container>
            </div>
        )
        
    }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap">
          {post.map((posts) => (
            <div className="p-2 w-1/4" key={posts.$id}>
              <BlogCard {...posts} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
