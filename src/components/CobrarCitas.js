import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { SERVER } from '../server/Server'

export const CobrarCitas = () => {


    const [citas, setCitas] = useState([
        {
            idCita: '',
            nonmbreCliente: '',
            fechaInicial: '',
            horaInicio: '',
            fechaFinal: '',
            horaFinal: '',
            estadoPago: ''
        }
    ]);

    useEffect(() => {

        axios.get(`${SERVER}citas`)
            .then(res => {
                setCitas(res.data);

            })

    }, [])

    const obtenerCitas = () => {

        axios.get(`${SERVER}citas`)
            .then(res => {
                setCitas(res.data);

            })
    }

    const handleCobro = (idCita) => {


        axios.put(`${SERVER}cita/pagar/` + idCita)
            .then(res => {
                obtenerCitas();

            })
    }


    return (
        <div>
            {
                citas.length > 0 ? (
                    <table class="table">


                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Terapia</th>
                                <th scope="col">Terapeuta</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Cobro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                citas.map((cita, index) => {
                                    return (<tr>
                                        <th scope="row">{1 + index}</th>
                                        <td>{cita.nombreTerapia}</td>
                                        <td>{cita.nombreProfesional}</td>
                                        <td>{cita.fechaInicial + " " + cita.horaInicio}</td>
                                        <td>
                                            {
                                                cita.estadoPago === 0 ? (
                                                    <button className="btn btn-danger" onClick={() => handleCobro(cita.idCita)}>Cobrar</button>
                                                ) : (
                                                        <button className="btn btn-success">Pago</button>
                                                    )
                                            }

                                        </td>
                                    </tr>
                                    )

                                })
                            }

                        </tbody>
                    </table>

                ) : (
                        <h1>No hay citas</h1>
                    )
            }

        </div>
    )
}
