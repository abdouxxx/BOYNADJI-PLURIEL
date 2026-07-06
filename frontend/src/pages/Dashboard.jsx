import "./dashboard.css";
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
            image: "/transport2.png",
            route: "/transport",
            color: "#FDE8DC",
            accent: "#E07A5F",
            icon: "🚛"
        },
        {
            title: "COMMERCE",
            image: "/commerce.png",
            route: "/commerce",
            color: "#D8EFE0",
            accent: "#3D9970",
            icon: "🏪"
        },
        {
            title: "PRESTATION DE SERVICE",
            image: "/service.png",
            route: "/service",
            color: "#D6EEF5",
            accent: "#2980B9",
            icon: "🤝"
        },
        {
            title: "MÉCANIQUE",
            image: "/mecanic.png",
            route: "/mecanique",
            color: "#EDE0D4",
            accent: "#8B5E3C",
            icon: "⚙️"
        },
        {
            title: "INFORMATIQUE",
            image: "/informatique.png",
            route: "/informatique",
            color: "#EAD6F0",
            accent: "#7D3C98",
            icon: "💻"
        },
        {
            title: "BTP",
            image: "/btp.png",
            route: "/btp",
            color: "#FDE8D8",
            accent: "#CA6F1E",
            icon: "🏗️"
        }
    ];

    return (
        <div className="dashboard">

            <div className="sidebar">
                <div className="sidebar-inner">

                    <div className="sidebar-logo">
                        <div className="logo-circle">
                            <img
                        src="/logo.png"
                        alt="logo"
                        className="header-logo"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    /></div>
                    </div>

                    <div className="sidebar-company">
                        <span className="company-name">BOYNADJI</span>
                        <span className="company-tag">PLURIELS</span>
                    </div>

                    <div className="sidebar-divider" />

                    <p className="presentation">
                        Entreprise multiservice spécialisée dans
                        l'informatique, le BTP, la mécanique,
                        le transport, le commerce
                        et les prestations de services.
                    </p>

                    <p className="sidebar-tagline">
                        Expertise · Professionnalisme · Efficacité
                    </p>

                </div>
            </div>

            <div className="main-content">

                <div className="top-header">

                    <div className="header-right">
                        <span className="welcome-text">BIENVENUE</span>
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            <span className="logout-icon">⎋</span>
                            Déconnexion
                        </button>
                    </div>
                </div>

                <div className="banner">
                    <div className="banner-track">
                        <span className="banner-icon">✦</span>
                        Boynadji facilite la gestion des activités et services de la famille à travers une plateforme centralisée et accessible.
                        <span className="banner-icon">✦</span>
                        Boynadji facilite la gestion des activités et services de la famille à travers une plateforme centralisée et accessible.
                        <span className="banner-icon">✦</span>
                        Boynadji facilite la gestion des activités et services de la famille à travers une plateforme centralisée et accessible.
                        <span className="banner-icon">✦</span>
                        Boynadji facilite la gestion des activités et services de la famille à travers une plateforme centralisée et accessible.
                        <span className="banner-icon">✦</span>
                    </div>
                </div>

                <div className="section-label">Nos secteurs d'activité</div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-card"
                            style={{
                                backgroundColor: service.color,
                                "--accent": service.accent
                            }}
                        >
                            <div
                                className="card-accent-bar"
                                style={{ backgroundColor: service.accent }}
                            />

                            <div className="card-body">
                                <div className="card-icon-wrap">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="card-image"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div
                                        className="card-emoji-fallback"
                                        style={{ display: 'none', color: service.accent }}
                                    >
                                        {service.icon}
                                    </div>
                                </div>

                                <h3
                                    className="card-title"
                                    style={{ color: service.accent }}
                                >
                                    {service.title}
                                </h3>

                                <button
                                    className="card-btn"
                                    style={{
                                        borderColor: service.accent,
                                        color: service.accent
                                    }}
                                    onClick={() => navigate(service.route)}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = service.accent;
                                        e.target.style.color = "#fff";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = "transparent";
                                        e.target.style.color = service.accent;
                                    }}
                                >
                                    Accéder →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}

export default Dashboard;