import React, { useState,useEffect } from 'react'
import { AddTerapeutaForm } from '../AddTerapeutaForm';
import { EditTerapeuta } from '../EditTerapeuta';
import { TerapeutaTable } from '../TerapeutaTable';
import {SERVER} from '../../server/Server'
import axios from 'axios';

export const TerapeutaScreen = () => {

   

    const [terapeutas, setTerapeutas] = useState([
        { id: '',
             cedula: '',
             clave: '',
             direccion: '',
             email:'',
             nombre: '',
             profesion: '' }
    ]);

    useEffect(() => {
        
        listarTerapeutas();
        
    }, [])

    //lista terapeutas
    const listarTerapeutas = () => {

        axios.get(`${SERVER}terapeutas`)
        .then(res => {

            setTerapeutas(res.data);
            
            
        })

    }

    //agregar terapeuta
    const addTerapeuta = (terapeuta) => {

        axios.post(`${SERVER}terapeutas`, 
                 {
                    cedula: terapeuta.cedula,
                    clave: terapeuta.clave,
                    direccion: terapeuta.direccion,
                    email: terapeuta.email,
                    nombre: terapeuta.nombre,
                    profesion:terapeuta.profesion,
            }
      )
      .then(function(res) {

        listarTerapeutas();
    
      })
      .catch(function(err) {
        console.log(err);
      })
        
    }

    //Eliminar terapeuta
    const deleteTerapeuta = id => {

        axios.delete(`${SERVER}terapeutas/`+id, 
            
        )
        .then(function(res) {
          
          listarTerapeutas();
          
  
        })
        .catch(function(err) {
          console.log(err);
        })
     
    }

    //Editar terapeutas
    const [editing, setEditing] = useState(false);
    const [currentTerapeuta, setCurrentTerapeuta] = useState({
        id: null, cedula: '', clave: '', direccion: '', email: '', nombre: '', profesion: ''
    });

    const editRow = (terapeuta) => {
        setEditing(true);
        setCurrentTerapeuta({
            id: terapeuta.id, cedula: terapeuta.cedula, clave: terapeuta.clave, direccion: terapeuta.direccion,nombre: terapeuta.nombre,email: terapeuta.email, profesion: terapeuta.profesion 
        })
    }

    const updateTerapeuta = (id, updateTerapeuta) => {

        axios.put(`${SERVER}terapeuta/`+id, 
                 {
                    cedula: updateTerapeuta.cedula,
                    clave: updateTerapeuta.clave,
                    direccion: updateTerapeuta.direccion,
                    email: updateTerapeuta.email,
                    nombre: updateTerapeuta.nombre,
                    profesion:updateTerapeuta.profesion,

            }
      )
      .then(function(res) {

        listarTerapeutas();
    
      })
      .catch(function(err) {
        console.log(err);
      })
        setEditing(false);
        
    }

    return (
        <div>
            <div className="container">
                <h1>Gestión Terapeutas</h1>
                <div className="flex-row">
                    <div className="flex-large">
                        {
                            editing ? (
                                <div>
                                    <h2>Editar Terapeuta</h2>
                                    <EditTerapeuta
                                        updateTerapeuta={updateTerapeuta}
                                        currentTerapeuta={currentTerapeuta} />
                                </div>

                            ) : (
                                    <div>
                                        <h2>Agregar Terapeuta</h2>
                                        <AddTerapeutaForm addTerapeuta={addTerapeuta} />
                                    </div>
                                )
                        }



                    </div>
                    <div className="flex-large">
                        <h2>Terapeutas</h2>
                        <TerapeutaTable
                            terapeutas={terapeutas}
                            deleteTerapeuta={deleteTerapeuta}
                            editRow={editRow} />
                    </div>
                </div>
            </div>
        </div>
    )
}
