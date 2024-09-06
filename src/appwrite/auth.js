import config from "../config/config.js";
import{Client,Account,ID} from "appwrite";

export class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client.setEndpoint(config.appWriteUrl)
        .setProject(config.projectId)
        this.account = new Account(this.client)
    }

    async CreateAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
        
            if (userAccount) {
                return this.Login({email,password})
                
            } else {
                return userAccount
            }
            
        } catch (error) {
            throw error  
        }
    }
    async Login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)    
        } catch (error) {
            throw error   
        }
    }
    async GetCurrentUser(){
        try {
            return await this.account.get();    
        } catch (error) {
            console.log("appwrite service :: GetCurrentUser error",error)   
        }
        return null
    }
    async LogOut(){
        try {
            return await this.account.deleteSessions() 
        } catch (error) {
            console.log("appwrite service :: GetCurrentUser()",error)
            
        }
    }

}
const authService = new AuthService()

export default authService