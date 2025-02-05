import conf from "../conf/conf";
import { Client, Account, ID} from 'appwrite';

export class AuthService {
    client = new Client()
    account

    constructor(){
        this.client.setEndpoint("https://cloud.appwrite.io/v1").setProject("6630b0ea00305331ebb8");
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount) return this.login({email, password})
            else return userAccount
        } catch (error) {
            throw error
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite :: Get Current User :: Error::", error);
        }
        return null
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite :: Logout :: Error ::", error);
        }
    }
    async getUserId() {
        const user = await this.getCurrentUser();
        return user ? user.$id: null;
    }
}

const authService = new AuthService()

export default authService