import { useEffect, useState } from "react";
import "./Categories.css";

import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [nom, setNom] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom.trim()) {
      alert("Veuillez saisir un nom de catégorie.");
      return;
    }

    try {
      if (editId) {
        await updateCategory(editId, { nom });
        alert("Catégorie modifiée.");
      } else {
        await addCategory({ nom });
        alert("Catégorie ajoutée.");
      }

      setNom("");
      setEditId(null);
      loadCategories();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Une erreur est survenue.");
    }
  };

  const handleEdit = (category) => {
    setNom(category.nom);
    setEditId(category._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cette catégorie ?")) {
      await deleteCategory(id);
      loadCategories();
    }
  };

  return (
    <div className="categories-container">

      <h1>Gestion des catégories</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        <button type="submit">
          {editId ? "Modifier" : "Ajouter"}
        </button>

      </form>

      <table>

        <thead>
          <tr>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {categories.map((category) => (

            <tr key={category._id}>

              <td>{category.nom}</td>

              <td>

                <button onClick={() => handleEdit(category)}>
                  Modifier
                </button>

                <button onClick={() => handleDelete(category._id)}>
                  Supprimer
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Categories;