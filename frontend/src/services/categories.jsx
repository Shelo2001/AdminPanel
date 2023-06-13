import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useCategories = create(
    devtools((set) => ({
        categories: [],
        getCategories: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/categories`
            );
            set({ categories: await res.data.categories });
        },
        createCategory: async (data) => {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/categories`,
                data
            );
            if (res.data.success == true) {
                set({
                    success: `Category - ${data.name} - created successfully`,
                });

                setTimeout(() => {
                    set({
                        success: null,
                    });
                }, 3000);
            }
        },
        createProduct: async (data) => {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/product/create`,
                data
            );
            if (res.data.success == true) {
                set({
                    success: `Product - ${data.name} - created successfully`,
                });

                setTimeout(() => {
                    set({
                        success: null,
                    });
                }, 3000);
            }
        },
    }))
);
