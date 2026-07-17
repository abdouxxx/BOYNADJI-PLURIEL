import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HistoriqueFactures.css";

function HistoriqueFactures() {

    const navigate = useNavigate();

    const [factures, setFactures] = useState([]);
    const [recherche, setRecherche] = useState("");

    useEffect(() => {

        const historique =
            JSON.parse(localStorage.getItem("factures")) || [];

        setFactures(historique);

    }, []);


  const voirFacture = (facture) => {

    localStorage.setItem(
        "facture",
        JSON.stringify(facture)
    );

    navigate("/facture");

};
const supprimerFacture = (numero) => {

    if (!window.confirm("Supprimer cette facture ?")) return;

    const nouvellesFactures = factures.filter(
        facture => facture.numero !== numero
    );

    setFactures(nouvellesFactures);

    localStorage.setItem(
        "factures",
        JSON.stringify(nouvellesFactures)
    );

};

const facturesFiltrees = factures.filter((facture) => {

    const texte = recherche.toLowerCase();

    return (

        facture.numero.toLowerCase().includes(texte) ||

        facture.client.nom.toLowerCase().includes(texte) ||

        facture.client.prenom.toLowerCase().includes(texte)

    );

});


    return (

        <div className="historique-container">

            <h1>📚 Historique des factures</h1>
            <input
             type="text"
             placeholder="Rechercher une facture..."
             value={recherche}
             onChange={(e) => setRecherche(e.target.value)}
             className="search-input"
/>

            <table>

                <thead>

                    <tr>

                        <th>N° Facture</th>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Total</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {factures.length === 0 ? (

                        <tr>

                            <td colSpan="5">

                                Aucune facture enregistrée.

                            </td>

                        </tr>

                    ) : (

                        facturesFiltrees.map((facture, index) => (

                            <tr key={index}>

                                <td>{facture.numero}</td>

                                <td>{facture.date}</td>

                                <td>

                                    {facture.client.nom} {facture.client.prenom}

                                </td>

                                <td>{facture.total} FCFA</td>

                            <td>

    <button onClick={() => voirFacture(facture)}>
        👁️ Voir
    </button>

    <button
        onClick={() => voirFacture(facture)}
        style={{ marginLeft: "8px" }}
    >
        🖨️ Imprimer
    </button>

    <button
        onClick={() => supprimerFacture(facture.numero)}
        style={{ marginLeft: "8px", background: "#dc3545", color: "#fff" }}
    >
        🗑️ Supprimer
    </button>

</td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default HistoriqueFactures;