import React,{useCallback} from 'react'
import Rte from '../Rte'
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"
import { useForm } from 'react-hook-form'
import  DBService  from '../../appwrite/DBfilemanage'
import Input from '../Input'
import Select from '../Select'
import Button from '../Button'


export default function PostForm({post}) {
    const {register,handleSubmit,watch,setValue,getValues,control} = useForm({
        defaultValues:{
            title : post?.Title || "",
            slug : post?.slug || "",
            content : post?.Content || "",
            status:post?.status || "active",
        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state)=> state.auth.userData)

    const Submit = async(data)=>{
        if(post){
            const File = await data.image[0]? await DBService.UploadFile(data.image[0]):null

            if(File){
                DBService.DeleteFile(post.Image)
            }
            const DBPost = await DBService.UploadFile(post.$id,{...data,
            Image: File?File.$id:undefined}) 

            if(DBPost){
                navigate(`post/${DBPost.$id}`)
            }
        } else{
            const file = await DBService.UploadFile(data.image[0])
            if(file){
                const fileId = file.$id
                data.Image = fileId
                const dbPost =await DBService.CreatePost({...data, UserId: userData.$id})

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }
    const SlugTransform = useCallback((value)=>{
        if(value && typeof value === "string") return value
        .trim()
        .toLowerCase().
        replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, "-")

    },[])
    React.useEffect(()=>{
        watch((value,{name})=>{
            if(name === "title"){
                setValue(slug,SlugTransform(value.title),{shouldValidate:true})
            }
        })

    },[SlugTransform,watch,setValue])
  return (
    <form onSubmit={handleSubmit(Submit)} className='flex flex-wrap'>
        <div className='w-2/3'>
            <Input
            lable = "Title"
            placeholder = "Title"
            className = ""
            {...register("title",{required:true})}
            />
            <Input
            lable = "slug"
            placeholder = "slug"
            className = ""
            {...register("slug",{required:true})}
            onInput = {(e)=>{
                setValue("slug",SlugTransform(e.currentTarget.value),{shouldValidate:true})
            }}
            />
             <Rte
                label="Content: "
                name="content"
                control={control}
                defaultValue={getValues("content")}
                />
        </div>
        <div className='w-1/2'>
        <Input
                label="Image"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg"
                {...register("Image", {required: !post})}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img src={DBService.getFilePreview(post.Image)} alt={post.Title}
                        className="rounded-lg"
                        />    
                    </div>
                )}
                <Select
                options={["active", "inactive"]}
                label="status"
                className="mb-4"
                {...register("status", {required: true})}
                />
                <Button
                type="submit"
                bgColor={post ? "bg-green-500": undefined}
                className="w-full"
                >{post ? "Update": "Submit"}</Button>

        </div>

    </form>
  )
}


