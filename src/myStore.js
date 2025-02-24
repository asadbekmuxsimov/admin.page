import { create } from "zustand";

const useAuthStore = create((set) => ({
    token: "",
    user: null,
    setAuth: (data) => set(data),
}));

export default useAuthStore;
