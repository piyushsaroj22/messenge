import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data }); //============================================================================================= yeha pe user add kiya hai
      get().connectSocket(); // Connect to socket after successful login
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data }); //============================================================================================= yeha pe user add kiya hai

      toast.success("Account created successfully!");

      get().connectSocket(); // Connect to socket after successful login
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create account");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data }); //============================================================================================= yeha pe user add kiya hai

      toast.success("Logged in successfully");

      get().connectSocket(); // Connect to socket after successful login
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to log in");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket(); // Disconnect socket after logout
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to log out");
      console.error("Error logging out:", error);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data }); //============================================================================================= yeha pe user add kiya hai
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      console.error("Error updating profile:", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true, // this ensures cookies are sent with the connection
    });
    socket.connect();
    set({ socket });
    // listen for online users event
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
    socket.on("userUpdated", (updatedUser) => {
      set((state) => ({
        authUser:
          state.authUser?._id === updatedUser._id
            ? {
                ...state.authUser,
                fullName: updatedUser.fullName,
                profilePicture: updatedUser.profilePicture,
              }
            : state.authUser,
      }));
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (!socket) return;
    socket.off("getOnlineUsers");
    socket.off("userUpdated");
    socket.disconnect();
    set({
      socket: null,
      onlineUsers: [],
    });
  },
}));
