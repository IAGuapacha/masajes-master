import React, { useState, useEffect } from 'react'
import { TarjetaCita } from './TarjetaCita';
import axios from 'axios';
import { TarjetaObservacion } from './TarjetaObservacion';
import {SERVER} from '../server/Server'


export const GestionSesiones = () => {


    const [citas, setCitas] = useState([
        {
            idCita: '',
            nonmbreCliente: '',
            fechaInicial: '',
            horaInicio: '',
            fechaFinal: '',
            horaFinal: ''
        }
    ]);

    const [observaciones, setObservaciones] = useState([
        {
            observacion: '',

        }
    ]);

    const [citaActual, setCitaActual] = useState(
        {
            idCita: '',
            nonmbreCliente: '',
            fechaInicial: '',
            horaInicio: '',
            fechaFinal: '',
            horaFinal: ''
        }
    );

    const [value, setValues] = useState(
        {
            observacion: '',

        }
    );

    const [visualObservaciones, setVisualObservaciones] = useState(false);

    const handleValues = (e) => {

        setValues({
            ...value,
            [e.target.name]: e.target.value
        });

    }

    useEffect(() => {

        const usuario = JSON.parse(localStorage.getItem("usuario"));
        axios.get(`${SERVER}citas/terapeuta/` + usuario.id,)
            .then(res => {
                setCitas(res.data);

            })

    }, [])

    const mostrarCita = (cita) => {


        setCitaActual(cita);
        listarObservaciones(cita.idCita);
        setVisualObservaciones(true);

    }

    const listarObservaciones = (idCita) => {

        axios.get(`${SERVER}citas/observaciones/` + idCita)
            .then(res => {


                setObservaciones(res.data);


            })
    }

    const onSubmitObservacion = (e) => {


        e.preventDefault();

        const usuario = JSON.parse(localStorage.getItem("usuario"));
        axios.post(`${SERVER}cita/observacion`,
            {
                idCita: citaActual.idCita,
                idTerapeuta: usuario.id,
                observacion: value.observacion

            }
        )
            .then(function (res) {

                listarObservaciones(citaActual.idCita);
                setValues({
                    observacion: ''
                })

            })
            .catch(function (err) {
                console.log(err);
            })


    }

    return (
        <>
            <div className="container">

            <h1>Gestión Sesiones</h1>
                <div className="flex-row">
                    <div className="flex-large">
                        {

                            citas.length > 0 ? (
                                citas.map((cita) => {
                                    return <TarjetaCita key={cita.idCita} cita={cita} mostrarCita={mostrarCita} />
                                })
                            ) : (
                                   <h1>No tiene citas</h1>
                                )

                        }


                    </div>
                    <div className="flex-large">

                        {
                            visualObservaciones ? (

                                <div>
                                    {
                                        observaciones.map((observacion) => {
                                            return <TarjetaObservacion observacion={observacion} />
                                        })
                                    }


                                    <form onSubmit={onSubmitObservacion}>

                                        <input type="text"
                                            name="observacion"
                                            placeholder="Ingrese observación"
                                            onChange={handleValues}
                                            value={value.observacion} />

                                        <button type="submit">Agregar</button>
                                    </form>
                                </div>


                            ) : (
                                    <div></div>

                                )
                        }





                    </div>
                </div>
            </div>
        </>
    )
}
