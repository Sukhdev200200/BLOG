import React ,{useState,useEffect}from 'react'
import {Link,useNavigate,useParams} from "react-router-dom"
import  DBService  from '../appwrite/DBfilemanage'
import Button from '../components/Button'
import  Container  from '../components/container/Container'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'


function Post() {
    const navigate = useNavigate()
    const [post,setPost] = useState()
    const {slug} = useParams()
    const userData = useSelector((state)=>state.auth.userData)
    const IsAdmin = post && userData ? post.userid === userData.$id :false

    useEffect(()=>{
        if(slug){
            DBService.GetPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }else{
                    navigate("/")
                }
            })
        }

    },[slug,navigate])

    const Deletepost = ()=>{
        DBService.DeletePost(post.$id).then((status)=>{
            if(status){
                DBService.DeleteFile(post.Image)
                navigate("/")
            }
        })
    }
  return post?(
    <div className="py-8">
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img src={DBService.getFilePreview(post.Image)} alt={post.Title} className='rounded-xl' />
          { IsAdmin && (
            <div className="absolute-right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" 
              onClick={Deletepost}
              >Delete</Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.Title}</h1>
          <div className="browser-css">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post
