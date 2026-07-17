import { useEffect, useState } from "react";
import "./TableauDeBord.css";

function TableauDeBord() {

    const [stats, setStats] = useState({
        chiffreAffaires: 0,
        factures: 0,
        produits: 0,
        clients: 0
    });

    useEffect(() => {

        const historique =
            JSON.parse(localStorage.getItem("factures")) || [];

        let chiffreAffaires = 0;
        let produits = 0;
        const clients = new Set();

        historique.forEach((facture) => {

            chiffreAffaires += facture.total;

            clients.add(
                facture.client.nom + " " + facture.client.prenom
            );

            facture.produits.forEach((produit) => {

                produits += produit.quantitePanier;

            });

        });

        setStats({

            chiffreAffaires,
            factures: historique.length,
            produits,
            clients: clients.size

        });

    }, []);

    return (

        <div className="dashboard-container">

            <h1>📊 Tableau de bord</h1>

            <div className="cards">

                <div className="card">
                    <h2>💰 Chiffre d'affaires</h2>
                    <p>{stats.chiffreAffaires} FCFA</p>
                </div>

                <div className="card">
                    <h2>🧾 Factures</h2>
                    <p>{stats.factures}</p>
                </div>

                <div className="card">
                    <h2>📦 Produits vendus</h2>
                    <p>{stats.produits}</p>
                </div>

                <div className="card">
                    <h2>👥 Clients</h2>
                    <p>{stats.clients}</p>
                </div>

            </div>

        </div>

    );
}

export default TableauDeBord;