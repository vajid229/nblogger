import conf from "../conf/conf";
import { Client, Databases, ID, Query, Storage } from "appwrite";
import authService from './auth.js'; 

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject("6630b0ea00305331ebb8");
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId, author}) {
        try {
          return await this.databases.createDocument(
            "6630cec9003780a423b9",
            "6630ced400321215ee4b",
            slug,
            {
              title,
              content,
              featuredImage,
              status,
              userId,
              author
            }
          );
        } catch (error) {
          console.log("Appwrite Service :: Create Post :: Error ::", error);
          throw error
        }
    }

    async updatePost(slug, {title,  content, featuredImage, status, author}){
        try {
            return await this.databases.updateDocument(
                "6630cec9003780a423b9",
                "6630ced400321215ee4b",
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    author 
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: Update Post :: Error ::", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument("6630cec9003780a423b9", "6630ced400321215ee4b", slug)
            return true
        } catch (error) {
            console.log("Appwrite Service :: Delete Post :: Error :: ", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                "6630cec9003780a423b9",
                "6630ced400321215ee4b",
                slug
            )
        } catch (error) {
            console.log("Appwrite Service :: Get Post :: Error :: ", error);
            throw error;
        }
    }
    
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                "6630cec9003780a423b9",
                "6630ced400321215ee4b",
                queries
            )
        } catch (error) {
            console.log("Appwrite Service :: Get Posts :: Error :: ", error);
            throw error;
        }
    }

    //storage  service
    // upload file
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
               "6630b1d20018463ac872",
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: Upload File :: Error :: ", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
               "6630b1d20018463ac872",
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: Delete File :: Error :: ", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
           "6630b1d20018463ac872",
            fileId
        )
    }



}

const service = new Service();
export default service;