import axios from "axios";

const API_URL = "http://localhost:5000/api/products";


// récupérer les produits
export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};


// ajouter un produit avec image
export const addProduct = async (product) => {

    const response = await axios.post(
        API_URL,
        product,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};


// modifier un produit
export const updateProduct = async (id, product) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        product,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};


// supprimer un produit
export const deleteProduct = async (id) => {

    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;
};