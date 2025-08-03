import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, post_content, post_image, user_id, status}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, ID.unique(), {
                title, post_content, post_image, user_id, status
            })
        } catch (error) {
            console.log("Appwrite service :: create post :: error ", error);
        }
    }

    async updatePost(id, {title, post_content, post_image, status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, id, {
                title, post_content, post_image, status
            })
        } catch (error) {
            console.log("Appwrite service :: update post :: error ", error);
        }
    }

    async deletePost(id){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, id);
            return true;
        } catch (error) {
            console.log("Appwrite service :: delete post :: error ", error);
            return false;
        }
    }

    async getPost(id){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, id);
        } catch (error) {
            console.log("Appwrite service :: get post :: error ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        } catch (error) {
            console.log("Appwrite service :: get posts :: error ", error);
            return false;
        }
    }

    //File upload services

    async uploadFile(){
        try {
            return await this.storage.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.log("Appwrite service :: file upload :: error ", error);
            return false;
        }
    }

    async uploadFile(fileId){
        try {
            return await this.storage.deleteFile(conf.appwriteBucketId, fileId);
        } catch (error) {
            console.log("Appwrite service :: file delete :: error ", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    }
}

const service = new Service();

export default service;