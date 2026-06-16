import ServiceCard from "../components/ServiceCard";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const services = [
        {
            title: "TRANSPORT",
            image: "/transport.png",
            route: "/transport"
        },
        {
            title: "COMMERCE",
            image: "/commerce.png",
            route: "/commerce"
        },
        {
            title: "PRESTATIONS DE SERVICES",
            image: "/service.png",
            route: "/services"
        },
        {
            title: "MÉCANIQUE",
            image: "/mecanique.png",
            route: "/mecanique"
        },
        {
            title: "INFORMATIQUE",
            image: "/informatique.png",
            route: "/informatique"
        },
        {
            title: "BTP",
            image: "/btp.png",
            route: "/btp"
        }
    ];

    return (
        <div className="dashboard-container">

            <div className="dashboard-header">
                <div className="logo-section">
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="logo"
                    />

                    <h1>BOYNADJI PLURIEL</h1>
                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Déconnexion
                </button>
            </div>

            <div className="cards-container">

                {services.map((service, index) => (

                    <div
                        key={index}
                        className="service-card"
                        onClick={() =>
                            navigate(service.route)
                        }
                    >

                        <img
                            src={service.image}
                            alt={service.title}
                        />

                        <h3>{service.title}</h3>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Dashboard;