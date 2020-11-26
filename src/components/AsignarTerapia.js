import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {SERVER} from '../server/Server'

export const AsignarTerapia = () => {

    const [terapias, setTerapias] = useState([
        {
            id: '-1',
            nombre: 'Seleccione'
        }
    ]);

    const [terapeutas, setTerapeutas] = useState([
        {
            id: '-1',
            nombre: 'Seleccione'
        }
    ]);

    const [value, setValues] = useState(
        {
            terapia: '',
            terapeuta: '',
        }
    );

    const handleValues = (e) => {

        setValues({
            ...value,
            [e.target.name]: e.target.value
        });

    }

    useEffect(() => {

        axios.get(`${SERVER}terapias`)
            .then(res => {
                setTerapias(res.data);

            })

        axios.get(`${SERVER}terapeutas`)
        .then(res => {
            setTerapeutas(res.data);

        })

    }, [])

    const onSubmitAsignar = (e) => {

        e.preventDefault();
        axios.post(`${SERVER}terapias/asignacion`,{
            idTerapeuta:value.terapeuta,
            idTerapia:value.terapia
            
        })
        .then(res => {

            console.log(res.status);
            if(res.status === 201){

                alert("Asignación exitosa");
            }else{
                alert("Algo salio mal");
            }
              
            
        })

    }

    return (
        <div>
            <div className="container">
                <h1>Gestión Clientes</h1>
                <div className="flex-row">
                    <div className="flex-large">

                        <form onSubmit={onSubmitAsignar}>
                            <label>Terapia</label>
                            <select name="terapia" value={value.terapia} onChange={handleValues}>
                            
                                {
                                    
                                    terapias.map((terapia) => {
                                        return <option key={terapia.id} value={terapia.id}>{terapia.nombre}</option>
                                    })
                                }
                                <option value={-5}>Hola</option>
                            </select>

                            <label>Terapeuta</label>
                            <select name="terapeuta" value={value.terapeuta} onChange={handleValues}>
                                {
                                    terapeutas.map((terapeuta) => {
                                        return <option key={terapeuta.id} value={terapeuta.id}>{terapeuta.nombre}</option>
                                    })
                                }
                            </select>


                            <button>Asignar</button>
                        </form>


                    </div>
                    <div className="flex-large">


                    </div>
                </div>
            </div>
        </div>
    )
}
