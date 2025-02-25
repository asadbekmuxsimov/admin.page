import { create } from "zustand";

const useAuthStore = create((set) => {
  const ls = JSON.parse(localStorage.getItem("auth"));
  console.log(ls);

  return {
    token: ls?.token,
    user: ls?.user,
    setAuth: (data) => set(data),
  };
});

export default useAuthStore;
