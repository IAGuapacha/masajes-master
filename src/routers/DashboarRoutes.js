import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AgendarCita } from '../components/AgendarCita'
import { AsignarTerapia } from '../components/AsignarTerapia'
import { CobrarCitas } from '../components/CobrarCitas'
import { ClienteScreen } from '../components/crud/ClienteScreen'
import { TerapeutaScreen } from '../components/crud/TerapeutaScreen'
import { GestionClientes } from '../components/GestionClientes'
import { GestionSesiones } from '../components/GestionSesiones'
import { Navbar } from '../components/ui/NavBar'

export const DashboarRoutes = () => {
    return (
        <>
            <Navbar/>
            <div>
                <Switch>
                    <Route exact path = "/terapeuta" component ={TerapeutaScreen}/>
                    <Route exact path = "/cliente" component = {ClienteScreen}/>
                    <Route exact path = "/agendarcitas" component = {AgendarCita}/>
                    <Route exact path = "/gestionsesiones" component = {GestionSesiones}/>
                    <Route exact path = "/gestionclientes" component = {GestionClientes}/>
                    <Route exact path = "/cobrarcitas" component = {CobrarCitas}/>
                    <Route exact path = "/asignarterapia" component = {AsignarTerapia}/>
                </Switch>

            </div>


            
        </>
    )
}
