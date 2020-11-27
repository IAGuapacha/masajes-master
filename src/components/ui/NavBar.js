import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useHistory } from "react-router-dom";

export const Navbar = () => {

    const usuario = JSON.parse(localStorage.getItem("usuario"))
    let history = useHistory();

    const isSecretario = () => {
        console.log(usuario)
        if(usuario == null){
            
            history.push("/login");
            return false;
        }
        if(usuario.identificador == "1"){
            return true;
        }
    
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
        
            <div className="navbar-collapse">
                <div className="navbar-nav">


                    {
                        isSecretario() ? (

                            <div className="navbar-nav">

                        <NavLink 
                            activeClassName="active"
                            className="nav-item nav-link" 
                            exact
                            to="/terapeuta"
                        >
                            Gestión Terapeuta
                            
                        </NavLink>
    
                        <NavLink 
                            activeClassName="active"
                            className="nav-item nav-link" 
                            exact
                            to="/cliente"
                        >
                            Gestión Cliente
                        </NavLink>
    
                        <NavLink 
                            activeClassName="active"
                            className="nav-item nav-link" 
                            exact
                            to="/agendarcitas"
                        >
                            Agendar Citas
                            
                        </NavLink>

                        <NavLink 
                            activeClassName="active"
                            className="nav-item nav-link" 
                            exact
                            to="/asignarterapia"
                        >
                            Asignar Terapia
                            
                        </NavLink>

                        <NavLink 
                            activeClassName="active"
                            className="nav-item nav-link" 
                            exact
                            to="/cobrarcitas"
                        >
                            Cobrar Citas
                            
                        </NavLink>

                            </div>
                        

                            ) : (
                                    <div className="navbar-nav">

                            <NavLink 
                                         activeClassName="active"
                                        className="nav-item nav-link" 
                                        exact
                                        to="/gestionsesiones"
                                    >
                                    Gestion Sesiones
                        
                                </NavLink>

                                <NavLink 
                                         activeClassName="active"
                                        className="nav-item nav-link" 
                                        exact
                                        to="/gestionclientes"
                                    >
                                    Gestion Clientes
                        
                                </NavLink>

                                    </div>

                                )
                    }
                    
                    
                    

                    

                    
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/login"
                    >
                        Cerrar sesion
                    </NavLink>
                </ul>
            </div>
        </nav>
    )
}