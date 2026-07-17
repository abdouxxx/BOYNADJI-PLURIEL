import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Commerce.css";

import { 
    getProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct 
} from "../services/productService";

import { getCategories } from "../services/categoryService";


function Commerce() {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editId, setEditId] = useState(null);

    const [image, setImage] = useState(null);


    const [formData, setFormData] = useState({

        nomProduit: "",
        prix: "",
        quantite: "",
        description: "",
        categorie: ""

    });



    useEffect(() => {

        loadProducts();
        loadCategories();

    }, []);



    const loadProducts = async () => {

        const data = await getProducts();

        setProducts(data);

    };



    const loadCategories = async () => {

        const data = await getCategories();

        setCategories(data);

    };



    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };



    const handleImage = (e) => {

        setImage(e.target.files[0]);

    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        const data = new FormData();


        data.append("nomProduit", formData.nomProduit);
        data.append("prix", formData.prix);
        data.append("quantite", formData.quantite);
        data.append("description", formData.description);
        data.append("categorie", formData.categorie);


        if(image){

            data.append("image", image);

        }



        try {


            if(editId){

                await updateProduct(editId, data);

                alert("Produit modifié");


            }else{

                await addProduct(data);

                alert("Produit ajouté");

            }



            setFormData({

                nomProduit:"",
                prix:"",
                quantite:"",
                description:"",
                categorie:""

            });


            setImage(null);

            setEditId(null);

            setShowForm(false);


            loadProducts();



        } catch(error){

            console.log(error);

        }


    };




    const handleEdit = (product) => {


        setFormData({

            nomProduit: product.nomProduit,
            prix: product.prix,
            quantite: product.quantite,
            description: product.description,
            categorie: product.categorie?._id || ""

        });


        setEditId(product._id);

        setShowForm(true);


    };
 



    const handleDelete = async (id) => {


        if(window.confirm("Supprimer ce produit ?")){


            await deleteProduct(id);


            loadProducts();


        }


    };


    const addToCart = (product) => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(item => item._id === product._id);

    if (index !== -1) {
        cart[index].quantitePanier += 1;
    } else {
        cart.push({
            ...product,
            quantitePanier: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Produit ajouté au panier !");
};



    return (

        <div className="commerce-container">


            <h1>Gestion Commerce</h1>
         <div className="commerce-actions">

    <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Fermer" : "Ajouter un produit"}
    </button>

    <button onClick={() => navigate("/categories")}>
        Catégories
    </button>

    <button onClick={() => navigate("/panier")}>
    🛒 Panier
</button>
<button onClick={() => navigate("/historique-factures")}>
    📚 Historique
</button>
<button onClick={() => navigate("/tableau-bord")}>
    📊 Tableau de bord
</button>
     
</div>




            {showForm && (

            <form onSubmit={handleSubmit}>


                <input

                    type="text"

                    name="nomProduit"

                    placeholder="Nom du produit"

                    value={formData.nomProduit}

                    onChange={handleChange}

                />



                <input

                    type="number"

                    name="prix"

                    placeholder="Prix"

                    value={formData.prix}

                    onChange={handleChange}

                />



                <input

                    type="number"

                    name="quantite"

                    placeholder="Quantité"

                    value={formData.quantite}

                    onChange={handleChange}

                />



                <textarea

                    name="description"

                    placeholder="Description"

                    value={formData.description}

                    onChange={handleChange}

                />



                <select

                    name="categorie"

                    value={formData.categorie}

                    onChange={handleChange}

                >

                    <option value="">

                        Choisir catégorie

                    </option>


                    {categories.map(cat => (

                        <option

                            key={cat._id}

                            value={cat._id}

                        >

                            {cat.nom}

                        </option>

                    ))}


                </select>



                <input

                    type="file"

                    accept="image/*"

                    onChange={handleImage}

                />



                <button type="submit">

                    {editId ? "Modifier" : "Enregistrer"}

                </button>


            </form>

            )}






            <h2>Produits</h2>



            <div className="products-list">


                {products.map(product => (


                    <div className="product-card" key={product._id}>


                        {product.image && (

                            <img

                                src={`http://localhost:5000/uploads/${product.image}`}

                                width="150"

                            />

                        )}



                        <h3>{product.nomProduit}</h3>


                        <p>
                            Prix : {product.prix} FCFA
                        </p>


                        <p>
                            Quantité : {product.quantite}
                        </p>


                        <p>
                            Catégorie : {product.categorie?.nom}
                        </p>



     <div className="product-actions">

    <button onClick={() => handleEdit(product)}>
        Modifier
    </button>

    <button onClick={() => handleDelete(product._id)}>
        Supprimer
    </button>

    <button onClick={() => addToCart(product)}>
        🛒 Ajouter au panier
    </button>

</div>



                    </div>


                ))}


            </div>


        </div>

    );

}


export default Commerce;