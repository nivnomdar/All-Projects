// authService.ts
// התחברות משתמש
import axios from "axios";
import { gamesWeb } from "../../Redux/Store";

const authService = {

    authenticateUserOnServer: async (email: string, password: string) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/users/login",
          {
            email,
            password,
          }
        );
  
        return response.data;
      } catch (error) {
        throw error;
      }
    },

  logout: () => {
    // Remove the token from local storage (only in client-side code)
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
    }
  },

  isAuthenticated: () => {
    // Check if a token exists in local storage (only in client-side code)
    if (localStorage.getItem("token")) {
      // console.log("Logged-in: TRUE");

      return true;
    } else {
      // console.log("Logged-in: FALSE")
    
    return false;
  }
  },

  login: (token: string) => {
    // Store the token in local storage (only in client-side code)
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  },

};

export default authService;
