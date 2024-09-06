import config from "../config/config.js";
import{Client,ID,Storage,Query,Databases} from "appwrite";

export class Service{
    client = new Client()
    databases;
    storage;

    constructor(){
        this.client.setEndpoint(config.appWriteUrl)
        this.client.setProject(config.projectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async CreatePost({Title,Content,Image,status,Userid,slug}){
        try {
            return await this.databases.createDocument(
                config.dataBaseId,
                config.collectionId,
                slug,{
                    Title,
                    Content,
                    Image,
                    status,
                    Userid,
                }
            )
            
        } catch (error) {
            console.log("CreatePost error",error)
            return false
            
        }

    }
    async DeletePost(slug){
        try {
            return await this.databases.deleteDocument(
                config.dataBaseId,
                config.collectionId,
                slug,   
            )
       
        } catch (error) {
            console.log("appwrite Error:: DeletePost",error)
           return false 
        }

    }
    async UpdatePost(slug,{Title,Content,Image,status,Userid}){
        try {
            return await this.databases.updateDocument(
                config.dataBaseId,
                config.collectionId,
                slug,{
                    Title,Content,status,Image,Userid
                }
            )
            
        } catch (error) {
            console.log("appwrite Error:: Updatefunction",error)
            
        }
    }
    async GetPost(slug){
        try {
            return await this.databases.getDocument(
                config.dataBaseId,
                config.collectionId,
                slug,
            )
            
        } catch (error) {
            console.log("appwrite Error :: Getpost  ppp",error)
            return false
            
        }
    }
    async ListPosts(queires = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.dataBaseId,
                config.collectionId,
                queires,
            )
            
        } catch (error) {
            console.log("appwrite Error :: ListPost",error)
            return false
            
        }
    }

    //file uploading related service
    async UploadFile(file){
        try {
            return await this.storage.createFile(
                config.bucketId,
                ID.unique(),
                file,
            )
            
        } catch (error) {
            console.log("appwrite Error :: UploadFile",error)
            
        }
    }
    async DeleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.bucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("appwrite Error :: Deletefile",error)
        }
    }
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            config.bucketId,
            fileId,
        )
    }

}

const DBService = new Service()
export default DBService