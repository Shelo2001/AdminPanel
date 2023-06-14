import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useCategories = create(
    devtools((set) => ({
        categories: [],
        products: [],
        product: {},
        loading: false,
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
        getProducts: async (filters) => {
            const query = new URLSearchParams(filters).toString();
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/products?${query}`
            );

            set({ products: await res.data.products });
        },
        deleteProductById: async (id) => {
            const res = await axios.delete(
                `${import.meta.env.VITE_API_URL}/products/${id}`
            );
            if (res.data.success) {
                set({
                    success: `Product deleted successfully`,
                });
                set((prevState) => ({
                    products: prevState.products.filter(
                        (product) => product.id !== id
                    ),
                }));
                setTimeout(() => {
                    set({
                        success: null,
                    });
                }, 3000);
            }
        },
        getProductById: async (id) => {
            set({ loading: true });
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/products/${id}`
            );
            set({
                loading: false,
                product: res.data.product,
            });
        },
    }))
);
