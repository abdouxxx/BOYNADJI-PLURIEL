import { useEffect, useState } from "react";
import axios from "axios";
import "./transport.css";

function Transport() {

    const [vehicles, setVehicles] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");

    const [formData, setFormData] = useState({
        marque: "",
        modele: "",
        annee: "",
        immatriculation: "",
        prixJour: "",
        photo: ""
    });
//recherche
const filteredVehicles = vehicles.filter(
    (vehicle) =>
        vehicle.marque
            .toLowerCase()
            .includes(search.toLowerCase()) ||
        vehicle.modele
            .toLowerCase()
            .includes(search.toLowerCase())
);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/vehicles"
            );

            setVehicles(response.data);

        } catch (error) {
            console.error(error);
        }
    };

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
                `http://localhost:5000/api/vehicles/${editingId}`,
                formData
            );

        } else {

            await axios.post(
                "http://localhost:5000/api/vehicles",
                formData
            );
        }

        setFormData({
            marque: "",
            modele: "",
            annee: "",
            immatriculation: "",
            prixJour: "",
            photo: ""
                });

        setEditingId(null);
        setShowModal(false);

        fetchVehicles();

    } catch (error) {
        console.error(error);
    }
};
const editVehicle = (vehicle) => {

    setEditingId(vehicle._id);

    setFormData({
        marque: vehicle.marque,
        modele: vehicle.modele,
        annee: vehicle.annee,
        immatriculation: vehicle.immatriculation,
        prixJour: vehicle.prixJour,
        photo: vehicle.photo || ""
    });

    setShowModal(true);
};
const deleteVehicle = async (id) => {

    const confirmDelete = window.confirm(
        "Supprimer ce véhicule ?"
    );

    if (!confirmDelete) return;

    try {

        await axios.delete(
            `http://localhost:5000/api/vehicles/${id}`
        );

        fetchVehicles();

    } catch (error) {

        console.error(error);
    }
};

    return (
        <div className="transport-page">

    <div className="sidebar-t">
        <div className="sidebar-logo">

         <img
        src="/logo.png"
        alt="logo"
         />
        </div>

        <h2>BACOUM HOLDING</h2>
        <br/>
        <h2>TRANSPORT🚗</h2>

        <ul>
            <li>🚗 Véhicules</li>
            <li>👤 Clients</li>
            <li>📄 Contrats</li>
            <li>📅 Retours</li>
        </ul>
        <div className="logout-container">

    <button
        className="logout-btn"
        onClick="merci au revoir"
         >
        🚪 Déconnexion
    </button>

        </div>
    </div>

    <div className="transport-content">

        <div className="transport-header">

            <h1>Gestion des Véhicules</h1>

            <button className="add-btn" onClick={() => {setEditingId(null);

                 setFormData({
                     marque: "",
                     modele: "",
                     annee: "",
                     immatriculation: "",
                     prixJour: "",
                     photo: ""
                     });

                    setShowModal(true);
                }}
                    >
                + Nouveau véhicule
            </button>

        </div>

        <div className="stats-grid">

            <div className="stat-card">
                <p>Total véhicules</p>
                <h2>{vehicles.length}</h2>
            </div>

            <div className="stat-card">
                <p>Disponibles</p>
                <h2>
                    {
                        vehicles.filter(
                            v => v.statut === "Disponible"
                        ).length
                    }
                </h2>
            </div>

            <div className="stat-card">
                <p>Loués</p>
                <h2>
                    {
                        vehicles.filter(
                            v => v.statut === "Loué"
                        ).length
                    }
                </h2>
            </div>

            <div className="stat-card">
                <p>Maintenance</p>
                <h2>
                    {
                        vehicles.filter(
                            v => v.statut === "Maintenance"
                        ).length
                    }
                </h2>
            </div>

        </div>

        {showModal && (
    <div className="modal-overlay">

        <div className="modal">

            <div className="modal-header">

                <h2>
                    {editingId ? "Modifier un véhicule" : "Ajouter un véhicule"}
                </h2>

                <button
                    className="close-btn"
                    onClick={() => setShowModal(false)}
                >
                    ✖
                </button>

            </div>

            <form className="vehicle-form" onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="marque"
                    placeholder="Marque"
                    value={formData.marque}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="modele"
                    placeholder="Modèle"
                    value={formData.modele}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="annee"
                    placeholder="Année"
                    value={formData.annee}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="immatriculation"
                    placeholder="Immatriculation"
                    value={formData.immatriculation}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="prixJour"
                    placeholder="Prix/Jour"
                    value={formData.prixJour}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="photo"
                    placeholder="URL de la photo"
                    value={formData.photo}
                    onChange={handleChange}
                />

                <button className="submit-btn">
                    {editingId ? "Mettre à jour" : "Ajouter le véhicule"}
                </button>

            </form>

        </div>

    </div>
)}

        {/* Barre recherche ici */}
        <input
    className="search-box"
    placeholder="🔍 Rechercher un véhicule..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
        />

        {/* Cartes véhicules ici */}
        <div className="vehicle-grid">

    {filteredVehicles.map((vehicle) => (

        <div className="vehicle-card" key={vehicle._id}>



    <div className="vehicle-image">

        <img
            src={vehicle.photo}
            alt={vehicle.modele}
        />

    </div>


            <div className="vehicle-body">

                <h3 className="vehicle-title">
                    {vehicle.marque} {vehicle.modele}
                </h3>

                <p>📅 {vehicle.annee}</p>

                <p>🚘 {vehicle.immatriculation}</p>

                <p className="vehicle-price">
                    {vehicle.prixJour} FCFA / Jour
                </p>

                <span
                    className={`badge ${
                        vehicle.statut === "Disponible"
                            ? "available"
                            : "rented"
                    }`}
                >
                    {vehicle.statut}
                </span>

                <div className="vehicle-actions">

                    <button
                        className="edit-btn"
                        onClick={() => editVehicle(vehicle)}
                    >
                        ✏ Modifier
                    </button>

                    <button
                        className="delete-btn"
                        onClick={() => deleteVehicle(vehicle._id)}
                    >
                        🗑 Supprimer
                    </button>

                </div>

            </div>

        </div>

    ))}

</div>

    </div>

</div>
    );
}

export default Transport;