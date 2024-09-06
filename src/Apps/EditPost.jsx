import React ,{useState,useEffect}from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import  DBService  from '../appwrite/DBfilemanage'
import  Container  from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'

function EditPost() {
    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
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
  return (
    <div className='py-5'>
        <Container>
            <PostForm post={post}/>
        </Container>
      
    </div>
  )
}

export default EditPost
