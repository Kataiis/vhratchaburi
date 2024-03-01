import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";


export const usePatientStore = create((set: any) => ({
  patient: null,
  updatePatient: (value: any) => set({ patient: value })
}));

export const userStore = create<any>(
  devtools(
    persist(
      (set, get) => ({
        userData: null,
        updateUserData: (value: any) => set({ userData: value }),
      }),
      {
        name: "user",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);







