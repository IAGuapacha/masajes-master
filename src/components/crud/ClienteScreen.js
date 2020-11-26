import React, { useState,useEffect } from 'react'
import { AddClienteForm } from '../AddClienteForm';
import { ClienteTable } from '../ClienteTable'
import { EditClienteForm } from '../EditClienteForm';
import {SERVER} from '../../server/Server'

import '../index2.css'
import axios from 'axios';
export const ClienteScreen = () => {

    

    useEffect(() => {
        
        listarClientes()
        
    }, [])

    const [clientes, setClientes] = useState([
        { id: '',
            cedula: '',
            direccion: '',
            email: '',
            nombre: '',
            ocupacion: '',
            telefono: '' }
    ]);


    //lista clientes
    const listarClientes = () => {

        
        axios.get(`${SERVER}clientes`)
        .then(res => {

            setClientes(res.data);
            console.log(res.data);
            
        })

    }


    //agregar cliente
    const addCliente = (cliente) => {

        const usuario = JSON.parse(localStorage.getItem("usuario"));
        axios.post(`${SERVER}clientes`, 
                 {
                    cedula: cliente.cedula,
                    direccion: cliente.direccion,
                    email: cliente.email,
                    fecha_nacimiento: "2000-10-10",
                    idSecretario: usuario.id,
                    nombre: cliente.nombre,
                    ocupacion:cliente.ocupacion,
                    telefono: cliente.telefono

            }
      )
      .then(function(res) {

        listarClientes()
    
      })
      .catch(function(err) {
        console.log(err);
      })

    }

    //Eliminar cliente
    const deleteCliente = id => {

        axios.delete(`${SERVER}clientes/`+id, 
            
      )
      .then(function(res) {
        
        listarClientes()
        

      })
      .catch(function(err) {
        console.log(err);
      })

      
    }

    //Editar cliente
    const [editing, setEditing] = useState(false);
    const [currentCliente, setCurrentCliente] = useState({
        id: null, cedula: '', direccion: '', email: '', nombre: '', ocupacion: '', telefono: ''
    });

    const editRow = (cliente) => {
        setEditing(true);
        setCurrentCliente({
            id: cliente.id, cedula: cliente.cedula, direccion: cliente.direccion, email: cliente.email,nombre: cliente.nombre, ocupacion: cliente.ocupacion, telefono: cliente.telefono
        })
    }

    const updateCliente = (id, updateCliente) => {
        setEditing(false);

        axios.put(`${SERVER}clientes/`+id, 
                 {
                    cedula: updateCliente.cedula,
                    direccion: updateCliente.direccion,
                    email: updateCliente.email,
                    fecha_nacimiento: "2000-10-10",
                    idSecretario: 1,
                    nombre: updateCliente.nombre,
                    ocupacion:updateCliente.ocupacion,
                    telefono: updateCliente.telefono

            }
      )
      .then(function(res) {

        listarClientes()
    
      })
      .catch(function(err) {
        console.log(err);
      })
        
    }

    return (
        <div>
            <div className="container">
                <h1>Gestión Clientes</h1>
                <div className="flex-row">
                    <div className="flex-large">
                        {
                            editing ? (
                                <div>
                                    <h2>Editar Cliente</h2>
                                    <EditClienteForm
                                        updateCliente={updateCliente}
                                        currentCliente={currentCliente} />
                                </div>

                            ) : (
                                    <div>
                                        <h2>Agregar Cliente</h2>
                                        <AddClienteForm addCliente={addCliente} />
                                    </div>
                                )
                        }



                    </div>
                    <div className="flex-large">
                        <h2>Clientes</h2>
                        <ClienteTable
                            clientes={clientes}
                            deleteCliente={deleteCliente}
                            editRow={editRow} />
                    </div>
                </div>
            </div>
        </div>
    )
}
