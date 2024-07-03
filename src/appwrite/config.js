import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/config";
//creating the database service
export class DatabaseService {
  client = new Client();
  databases;
  bucket; //storage

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, //id.unique()
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite serice :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, //id.unique()
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serice :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug //id.unique()
      );

      return true;
    } catch (error) {
      console.log("Appwrite serice :: DeletePost :: error", error);
      return false;
    }
  }
  //getting only 1 post
  async getPost(slug) {
    try {
      await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serice :: getPost :: error", error);
      return false;
    }
  }
  // it will give all documents , but i want to get only documents whose active status is true
  async getAllPosts() {
    try {
      await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
      return true;
    } catch (error) {
      console.log("Appwrite serice :: getAllPost :: error", error);
      return false;
    }
  }
  // it will give all documents whose active status is true
  //you have to make indexes to run the querytyyyyy
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
        //  Query.e  qual("status", ["true" , "active" , "1"])
      );
      return true;
    } catch (error) {
      console.log("Appwrite serice :: getPosts  :: error", error);
      return false;
    }
  }

  //file upload methodd

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serice :: uploadfile  :: error", error);
      return false;
    }
  }
  //delete file method
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite serice :: deletefile  :: error", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new DatabaseService();
export default service;
