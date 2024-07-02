import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/config";

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
  

  async updatePost(slug  , {title, content , featuredImage , status }){
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


}

const service = new DatabaseService();
export default service;
