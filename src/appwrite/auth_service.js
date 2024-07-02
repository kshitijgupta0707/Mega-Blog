import conf from "../conf/config";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      await this.account.get();
    } catch (error) {
      console.log("Appwrite serice :: getCurrentUser :: error", error);
    }
    return null;
  }

  async logout() {
    try {
      //willl be logout from all the browsers
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serice :: Logout :: error", error);
    }
  }
  async updatePassword(oldP, newP) {
    try {
      const result = await account.updatePassword(newP, oldP);
    } catch (error) {
      console.log("Appwrite serice :: Update Password :: error", error);
    }
  }
  //password recovery
  //login by number
//   yh sb krna hain
}
const authService = new AuthService();

export default authService;
