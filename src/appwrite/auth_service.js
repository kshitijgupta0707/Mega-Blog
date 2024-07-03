import conf from "../conf/config";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    let result = this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
    let result2 = this.account = new Account(this.client);
    // console.log( result);
    console.log( result2);
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
      // Check if there is an active session
      const sessions = await this.account.getSession("current");
      if (sessions) {
        // If session exists, get user details
        const user = await this.account.get();
        return user;
      }
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
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
      const result = await this.accountaccount.updatePassword(newP, oldP);
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
