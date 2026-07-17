import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Facture.css";

function Facture() {

    const navigate = useNavigate();

    const [client, setClient] = useState({});
    const [produits, setProduits] = useState([]);

    useEffect(() => {

        const facture = JSON.parse(localStorage.getItem("facture"));

        if (facture) {

            setClient(facture.client);
            setProduits(facture.produits);

        }

    }, []);

    const totalGeneral = produits.reduce((total, produit) => {

        return total + (produit.prix * produit.quantitePanier);

    }, 0);

    const imprimer = () => {

        window.print();

    };

    const validerVente = () => {

        // Vérifier qu'il y a des produits
    if (produits.length === 0) {

        alert("Aucun produit à enregistrer.");

        return;

    }
      

    const historique =
        JSON.parse(localStorage.getItem("factures")) || [];

    const nouvelleFacture = {

        numero: "FAC-" + Date.now(),

        date: new Date().toLocaleString(),

        client,

        produits,

        total: totalGeneral

    };

    historique.push(nouvelleFacture);

    localStorage.setItem(
        "factures",
        JSON.stringify(historique)
    );

    alert("Facture enregistrée avec succès.");

    localStorage.removeItem("cart");

    localStorage.removeItem("facture");

    navigate("/commerce");

};

    return (

        <div className="facture-container">

            <div className="facture">

                <h1>BOYNADJI-PLURIEL</h1>

              <p className="entreprise">
             Commerce • Transport • Informatique • Prestations de services
             </p>

            <p className="adresse">
            Rufisque - Sénégal
          </p>

        <p className="telephone">
       Tél : +221 XX XXX XX XX
      </p>






                <p className="sous-titre">
                    Gestion Commerce
                </p>

                <hr />

                <div className="infos">

                    <div>

                        <h3>Client</h3>

                        <p><strong>Nom :</strong> {client.nom}</p>

                        <p><strong>Prénom :</strong> {client.prenom}</p>

                        <p><strong>Téléphone :</strong> {client.telephone}</p>

                        <p><strong>Adresse :</strong> {client.adresse}</p>

                    </div>

                   <div>

             <h3>Facture</h3>

            <p><strong>N° :</strong> FAC-{Date.now()}</p>

           <p>
             <strong>Date :</strong>{" "}
             {new Date().toLocaleDateString()}
          </p>

    <p>
        <strong>Heure :</strong>{" "}
        {new Date().toLocaleTimeString()}
    </p>

</div>
                </div>

                <table>

                    <thead>

                        <tr>

                            <th>Produit</th>
                            <th>Prix</th>
                            <th>Qté</th>
                            <th>Total</th>

                        </tr>

                    </thead>

                    <tbody>

                        {produits.map((produit) => (

                            <tr key={produit._id}>

                                <td>{produit.nomProduit}</td>

                                <td>{produit.prix} FCFA</td>

                                <td>{produit.quantitePanier}</td>

                                <td>
                                    {produit.prix * produit.quantitePanier} FCFA
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <h2 className="total">

                    Total : {totalGeneral} FCFA

                </h2>

                <div className="buttons">

                    <button onClick={imprimer}>

                        🖨️ Imprimer

                    </button>

                    <button onClick={validerVente}>
                         ✅ Valider la vente
                   </button>

                    <button onClick={() => navigate("/panier")}>

                        Retour

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Facture;