import {
    FaBell,
    FaSearch,
    FaUserCircle
} from "react-icons/fa";

import "./Topbar.css";

function Topbar() {

    return (

        <div className="topbar">

            <div className="search-bar">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Rechercher..."
                />

            </div>

            <div className="topbar-right">

                <FaBell className="icon"/>

                <div className="user">

                    <FaUserCircle className="avatar"/>

                    <div>

                        <h4>Administrateur</h4>



                    </div>

                </div>

            </div>

        </div>

    );

}

export default Topbar;