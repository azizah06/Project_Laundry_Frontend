import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "./image/washing-machine.png";

function Logout(){
//remove data user dan token dari local storage
localStorage.removeItem("user")
localStorage.removeItem("token")
}
export default function Navbar(props){
    return(
        <div>
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                {/** brand */}
                <a className="navbar-brand">
                    Jijaa's Laundry
                    <img src={logo} className="nav-logo" alt=""/>
                </a>
                

                {/** button */}
                <button className="navbar-toggler" data-bs-toggle="collapse" 
                data-bs-target="#myNav" aria-controls="myNav" aria-expanded="false">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/** define menu */}
                <div className="collapse navbar-collapse" id="myNav">
                    <ul className=" navbar-nav me-auto: mb-2 mb-lg-0">
                    <li className="nav-item">
                            <Link to= "/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to= "/member" className="nav-link">
                                Member
                            </Link>
                        </li>
                        <li className="nav-item">
                        <Link to= "/paket" className="nav-link">
                                Paket
                            </Link>
                        </li>
                        <li className="nav-item">
                        <Link to= "/transaksi" className="nav-link">
                                Transaksi
                            </Link>
                        </li>
                        <li className="nav-item">
                        <Link to= "/formtransaksi" className="nav-link">
                                Transaksi baru
                            </Link>
                        </li>
                        <li className="nav-item">
                           <Link to="/login" className="nav-link" onClick={() => Logout()}>
                               Logout
                           </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        {props.children}
        </div>
    )
}