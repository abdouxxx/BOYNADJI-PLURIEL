import axios from "axios";

const API_URL = "http://localhost:5000/api/categories";

// récupérer les catégories
export const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ajouter une catégorie
export const addCategory = async (category) => {
  const response = await axios.post(API_URL, category);
  return response.data;
};

// modifier une catégorie
export const updateCategory = async (id, category) => {
  const response = await axios.put(`${API_URL}/${id}`, category);
  return response.data;
};

// supprimer une catégorie
export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};