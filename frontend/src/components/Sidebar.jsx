import { Link, useLocation } from "react-router-dom";
import {
    FaCar,
    FaUsers,
    FaFileContract,
    FaCalendarAlt,
    FaShoppingCart,
    FaChartBar,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (

        <div className="sidebar">

            <div className="sidebar-logo">

                <img
                    src="/logo.png"
                    alt="BOYNADJI"
                />

            </div>

            <h2>
                BACOUM HOLDING
                 <br />
                <small
                    style={{
                    color:"#94A3B8",
                    fontSize:"14px",
                    fontWeight:"normal"
                    }}
                >
                 Gestion Automobile
                </small>
            </h2>

            <ul>

                <li className={location.pathname === "/transport" ? "active-menu" : ""}>
                    <Link to="/transport">
                        <FaCar />
                        <span>Véhicules</span>
                    </Link>
                </li>

                <li className={location.pathname === "/clients" ? "active-menu" : ""}>
                    <Link to="/clients">
                        <FaUsers />
                        <span>Clients</span>
                    </Link>
                </li>

                <li>
    <Link to="/Contracts">
        <FaFileContract />
        <span>Contracts</span>
    </Link>
</li>

<li>
    <Link to="/retours">
        <FaCalendarAlt />
        <span>Retours</span>
    </Link>
</li>

<li>
    <Link to="/ventes">
        <FaShoppingCart />
        <span>Ventes</span>
    </Link>
</li>

<li>
    <Link to="/statistiques">
        <FaChartBar />
        <span>Statistiques</span>
    </Link>
</li>

            </ul>

            <div className="logout-container">

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    Déconnexion
                </button>

            </div>

        </div>

    );
}

export default Sidebar;