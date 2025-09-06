import {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";
import wpApi from "../lib/api/axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // check for saved token on loads
    const savedToken = localStorage.getItem("homestay_token");
    if (savedToken) {
      setToken(savedToken);
    }

    setIsLoading(false);
  }, []);

  // login fethch
  const login = async (username, password) => {
    try {
      const response = await wpApi.post("/jwt-auth/v1/token", {
        username,
        password,
      });

      // axios pust the response data in .data property
      const { token: newToken, user_display_name, user_email } = response.data;

      setToken(newToken);
      setUser({
        user_display_name,
        user_email,
      });
      localStorage.setItem("homestay_token", newToken);
      return true;
    } catch (error) {
      console.error("Login error", err);

      // axios can provide detailed error information
      if (error.response) {
        // server responded with error status (400 - 500)
        console.error(
          "Server response error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // request was made but no response received
        console.error("Network error: No response received");
      } else {
        // other things happen
        console.error("Error:", error.message);
      }
      return false;
    }
  };

  // logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("homestay_token");
  };

  const value = {
    user,
    token,
    login,
    logout,
    isLoading,
  };

  return<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
