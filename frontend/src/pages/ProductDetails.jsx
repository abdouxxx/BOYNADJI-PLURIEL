import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProductById } from "../services/productService";
import "./ProductDetails.css";
function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    useEffect(() => {

        loadProduct();

    }, [id]);

    const loadProduct = async () => {

        try {

            const data = await getProductById(id);

            setProduct(data);

        } catch (error) {

            console.log(error);

        }

    };

    const addToCart = () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(
        item => item._id === product._id
    );

    if (index !== -1) {

        cart[index].quantitePanier += 1;

    } else {

        cart.push({
            ...product,
            quantitePanier: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Produit ajouté au panier !");
};

    if (!product) {

        return <h2>Chargement...</h2>;

    }
    

   return (
    <div className="details-container">

        <button
            className="back-btn"
            onClick={() => navigate("/commerce")}
        >
            ← Retour
        </button>

        <div className="details-card">

            <div className="details-image">

                {product.image && (
                    <img
                        src={`http://localhost:5000/uploads/${product.image}`}
                        alt={product.nomProduit}
                    />
                )}

            </div>

            <div className="details-info">

                <span className="badge">
                    {product.categorie?.nom}
                </span>

                <h1>{product.nomProduit}</h1>

                <h2>{product.prix.toLocaleString()} FCFA</h2>

                <p>

                    <strong>Stock disponible :</strong>{" "}

                    {product.quantite}

                </p>

                <div className="description">

                    <h3>Description</h3>

                    <p>{product.description}</p>

                </div>

                <button
               className="cart-btn"
                onClick={addToCart}
                >
               🛒 Ajouter au panier
              </button>

            </div>

        </div>

    </div>
);

}

export default ProductDetails;