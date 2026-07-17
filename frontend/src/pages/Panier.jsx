import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Panier.css";

function Panier() {


    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {

        const panier = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(panier);

    }, []); 

 const [client, setClient] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    adresse: ""
});

    const supprimerProduit = (id) => {

        const nouveauPanier = cart.filter(item => item._id !== id);

        setCart(nouveauPanier);

        localStorage.setItem("cart", JSON.stringify(nouveauPanier));
    };

    const handleSelect = (id) => {

    if (selectedItems.includes(id)) {

        setSelectedItems(
            selectedItems.filter(item => item !== id)
        );

    } else {

        setSelectedItems([
            ...selectedItems,
            id
        ]);

    }

};
   const modifierQuantite = (id, valeur) => {

    const nouveauPanier = cart.map(item => {

        if (item._id === id) {

            const nouvelleQuantite = item.quantitePanier + valeur;

            return {
                ...item,
                quantitePanier:
                    nouvelleQuantite < 1 ? 1 : nouvelleQuantite
            };

        }

        return item;

    });

    setCart(nouveauPanier);

    localStorage.setItem("cart", JSON.stringify(nouveauPanier));
};





    const totalSelection = cart
        .filter(item => selectedItems.includes(item._id))
       .reduce(
        (total, item) => total + item.prix * item.quantitePanier,
        0
    );
     
    const handleClientChange = (e) => {
    setClient({
        ...client,
        [e.target.name]: e.target.value
    });
};

const genererFacture = () => {

    const produitsSelectionnes = cart.filter(item =>
        selectedItems.includes(item._id)
    );

    if (produitsSelectionnes.length === 0) {

        alert("Sélectionnez au moins un produit.");

        return;
    }

    if (
        !client.nom ||
        !client.prenom ||
        !client.telephone ||
        !client.adresse
    ) {

        alert("Veuillez remplir les informations du client.");

        return;
    }

    const facture = {

        client,

        produits: produitsSelectionnes

    };

    localStorage.setItem(
        "facture",
        JSON.stringify(facture)
    );

    navigate("/facture");

};






















    return (

        <div className="panier-container">

            <h1>🛒 Panier</h1>

            <table>

                <thead>

                 <tr>

                 <th></th>
                <th>Produit</th>
               <th>Prix unitaire</th>
                <th>Quantité</th>
               <th>Total</th>
              <th>Action</th>

             </tr>

                </thead>

                <tbody>

                    {cart.length === 0 ? (

                        <tr>

                            <td colSpan="6">

                                Aucun produit dans le panier.

                            </td>

                        </tr>

                    ) : (

                        cart.map((item) => (

                          <tr key={item._id}>

                            <td>
                             <input
                            type="checkbox"
                              checked={selectedItems.includes(item._id)}
                             onChange={() => handleSelect(item._id)}
                            />
                          </td>

                                <td>{item.nomProduit}</td>

                                <td>{item.prix} FCFA</td>

                               <td>
                           <div className="quantite-actions">

                            <button onClick={() => modifierQuantite(item._id, -1)}>
                             ➖
                           </button>

                            <span>{item.quantitePanier}</span>

                         <button onClick={() => modifierQuantite(item._id, 1)}>
                            ➕
                         </button>

                           </div>
                          </td>

                                <td>{item.prix * item.quantitePanier} FCFA</td>

                                <td>

                                    <button onClick={() => supprimerProduit(item._id)}>
                                        Supprimer
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

    <div className="panier-total">
          <h2>
            Montant total : {totalSelection} FCFA
         </h2>
   </div>
  
<div className="client-form">

    <h2>Informations du client</h2>

    <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={client.nom}
        onChange={handleClientChange}
    />

    <input
        type="text"
        name="prenom"
        placeholder="Prénom"
        value={client.prenom}
        onChange={handleClientChange}
    />

    <input
        type="text"
        name="telephone"
        placeholder="Téléphone"
        value={client.telephone}
        onChange={handleClientChange}
    />

    <textarea
        name="adresse"
        placeholder="Adresse"
        value={client.adresse}
        onChange={handleClientChange}
    />

     <button onClick={genererFacture}>
    📄 Générer la facture
</button>
</div>


        </div>

    );
}

export default Panier;