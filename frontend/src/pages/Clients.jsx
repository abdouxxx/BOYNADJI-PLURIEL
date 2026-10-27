import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
    FaUserPlus,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import "./Clients.css";

function Clients() {

    const [clients, setClients] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");

    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        telephone: "",
        email: "",
        adresse: "",
        typePiece: "",
        numeroPiece: ""
    });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/clients"
            );

            setClients(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    const filteredClients = clients.filter(
        (client) =>
            client.nom.toLowerCase().includes(search.toLowerCase()) ||
            client.prenom.toLowerCase().includes(search.toLowerCase()) ||
            client.telephone.includes(search)
    );

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await axios.put(
                    `http://localhost:5000/api/clients/${editingId}`,
                    formData
                );

                Swal.fire({
                    icon: "success",
                    title: "Client modifié",
                    timer: 1500,
                    showConfirmButton: false
                });

            } else {

                await axios.post(
                    "http://localhost:5000/api/clients",
                    formData
                );

                Swal.fire({
                    icon: "success",
                    title: "Client ajouté",
                    timer: 1500,
                    showConfirmButton: false
                });

            }

            setFormData({
                nom: "",
                prenom: "",
                telephone: "",
                email: "",
                adresse: "",
                typePiece: "",
                numeroPiece: ""
            });

            setEditingId(null);
            setShowModal(false);

            fetchClients();

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Impossible d'enregistrer le client."
            });

        }

    };

    const editClient = (client) => {

        setEditingId(client._id);

        setFormData({
            nom: client.nom,
            prenom: client.prenom,
            telephone: client.telephone,
            email: client.email,
            adresse: client.adresse,
            typePiece: client.typePiece,
            numeroPiece: client.numeroPiece
        });

        setShowModal(true);

    };

    const deleteClient = async (id) => {

        const result = await Swal.fire({
            title: "Supprimer ce client ?",
            text: "Cette action est irréversible.",
            icon: "warning",
            width: "340px",
            showCancelButton: true,
            confirmButtonText: "Oui",
            cancelButtonText: "Annuler"
        });

        if (!result.isConfirmed) return;

        await axios.delete(
            `http://localhost:5000/api/clients/${id}`
        );

        fetchClients();

        Swal.fire({
            icon: "success",
            title: "Client supprimé",
            timer: 1500,
            showConfirmButton: false
        });
    };


    return (

    <div className="clients-page">

        <Sidebar />

        <div className="clients-content">

            <Topbar />

            <div className="clients-header">

                <h1>Gestion des Clients</h1>

                <button
                    className="add-btn"
                    onClick={() => {

                        setEditingId(null);

                        setFormData({
                            nom: "",
                            prenom: "",
                            telephone: "",
                            email: "",
                            adresse: "",
                            typePiece: "",
                            numeroPiece: ""
                        });

                        setShowModal(true);

                    }}
                >
                    <FaUserPlus />
                    Nouveau client
                </button>

            </div>

            {/* Statistiques */}

            <div className="stats-grid">

                <div className="stat-card">
                    <p>Total Clients</p>
                    <h2>{clients.length}</h2>
                </div>

                <div className="stat-card">
                    <p>Clients Actifs</p>
                    <h2>{clients.length}</h2>
                </div>

                <div className="stat-card">
                    <p>Locations</p>
                    <h2>0</h2>
                </div>

                <div className="stat-card">
                    <p>Ventes</p>
                    <h2>0</h2>
                </div>

            </div>

            {/* Barre de recherche */}

            <input
                className="search-box"
                type="text"
                placeholder="🔍 Rechercher un client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Modal */}

            {showModal && (

                <div className="modal-overlay">

                    <div className="modal">

                        <div className="modal-header">

                            <h2>
                                {editingId
                                    ? "Modifier un client"
                                    : "Ajouter un client"}
                            </h2>

                            <button
                                className="close-btn"
                                onClick={() => setShowModal(false)}
                            >
                                ✖
                            </button>

                        </div>

                        <form
                            className="client-form"
                            onSubmit={handleSubmit}
                        >

                            <input
                                type="text"
                                name="nom"
                                placeholder="Nom"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="prenom"
                                placeholder="Prénom"
                                value={formData.prenom}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="telephone"
                                placeholder="Téléphone"
                                value={formData.telephone}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="adresse"
                                placeholder="Adresse"
                                value={formData.adresse}
                                onChange={handleChange}
                            />

                            <select
                                name="typePiece"
                                value={formData.typePiece}
                                onChange={handleChange}
                            >
                                <option value="">Type de pièce</option>
                                <option value="CNI">CNI</option>
                                <option value="Passeport">Passeport</option>
                                <option value="Permis">Permis</option>
                            </select>

                            <input
                                type="text"
                                name="numeroPiece"
                                placeholder="Numéro de pièce"
                                value={formData.numeroPiece}
                                onChange={handleChange}
                            />

                            <button className="submit-btn">

                                {editingId
                                    ? "Mettre à jour"
                                    : "Ajouter le client"}

                            </button>

                        </form>

                    </div>

                </div>

            )}

            {/* Liste des clients */}

            <div className="client-grid">

                {filteredClients.map((client) => (

                    <div className="client-card" key={client._id}>

    <div className="client-avatar">
        👤
    </div>

    <div className="client-info">

        <h3>{client.nom} {client.prenom}</h3>

        <p>📞 {client.telephone}</p>

        <p>📧 {client.email || "Non renseigné"}</p>

        <p>📍 {client.adresse || "Non renseignée"}</p>

        <span className="piece-badge">
            {client.typePiece} • {client.numeroPiece}
        </span>

    </div>

    <div className="client-actions">

        <button
            className="edit-btn"
            onClick={() => editClient(client)}
        >
            <FaEdit />
        </button>

        <button
            className="delete-btn"
            onClick={() => deleteClient(client._id)}
        >
            <FaTrash />
        </button>

    </div>

</div>
                ))}

            </div>

        </div>

    </div>

);

}

export default Clients;

