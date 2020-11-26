import React, { useState, useEffect } from 'react'
import { TarjetaClienteDatos } from './TarjetaClienteDatos';
import axios from 'axios';
import {SERVER} from '../server/Server'



export const GestionClientes = () => {


    const [clientes, setClientes] = useState([
        {
            id: '',
            cedula: '',
            direccion: '',
            email: '',
            nombre: '',
            ocupacion: '',
            telefono: '',
            fechaNacimiento: ''
        }
    ]);

    const [citas, setCitas] = useState([
        {
            idCita: '',
            nombreTerapia: '',
            nombreProfesional: '',
            fechaInicial: '',
            horaInicio: ''
        }
    ]);

    const [clienteActual, setClienteActual] = useState(
        {
            id: '',
            cedula: '',
            direccion: '',
            email: '',
            nombre: '',
            ocupacion: '',
            telefono: '',
            fechaNacimiento: ''
        }
    );



    const [visualDatos, setVisuaalDatos] = useState(false);

    useEffect(() => {

        const usuario = JSON.parse(localStorage.getItem("usuario"));

        axios.get(`${SERVER}terapeutas/clientes/` + usuario.id)
            .then(res => {

                setClientes(res.data);


            })

    }, [])

    const mostrarCliente = (cliente) => {

        
        setClienteActual(cliente);
        obtenerCitas(cliente.id);
        setVisuaalDatos(true);


    }

    const obtenerCitas = (id) => {

        axios.get(`${SERVER}citas/cleinte/` + id)
            .then(res => {
                console.log(res.data);

                setCitas(res.data);


            })

    }



    return (
        <>
            <div>
                <div className="container">
                    <h1>Gestión Clientes</h1>
                    <div className="flex-row">
                        <div className="flex-large">

                            {
                                clientes.length > 0 ? (
                                    clientes.map((cliente) => {
                                        return <TarjetaClienteDatos key={cliente.id} cliente={cliente} mostrarCliente={mostrarCliente} />
                                    })
                                ) : (
                                       <h1>No tiene clientes asociados</h1>
                                    )
                                
                            }

                        </div>
                        <div className="flex-large">
                            {
                                visualDatos ? (

                                    <div>
                                        <ul className="list-group">
                                            <li className="list-group-item">{"Nombre: " + clienteActual.nombre}</li>
                                            <li className="list-group-item">{"Cedula: " + clienteActual.cedula}</li>
                                            <li className="list-group-item">{"Fecha Nacimiento:: " + clienteActual.fechaNacimiento}</li>
                                            <li className="list-group-item">{"Direccion: " + clienteActual.direccion}</li>
                                            <li className="list-group-item">{"Email: " + clienteActual.email}</li>
                                            <li className="list-group-item">{"Ocupacion: " + clienteActual.ocupacion}</li>
                                            <li className="list-group-item">{"Telefono: " + clienteActual.telefono}</li>
                                        </ul>
                                        <br />
                                        <br />


                                        <table class="table">
                                            <thead class="thead-dark">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Terapia</th>
                                                    <th scope="col">Terapeuta</th>
                                                    <th scope="col">Fecha</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    citas.map((cita,index) => {
                                                        return (<tr>
                                                            <th scope="row">{1+index}</th>
                                                            <td>{cita.nombreTerapia}</td>
                                                            <td>{cita.nombreProfesional}</td>
                                                            <td>{cita.fechaInicial+" "+cita.horaInicio}</td>
                                                        </tr>
                                                        )

                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                        <div></div>

                                    )
                            }

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
