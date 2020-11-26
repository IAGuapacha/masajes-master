import React, { useState, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
import { TarjetaCliente } from './TarjetaCliente';
import axios from 'axios';
import {SERVER} from '../server/Server'

export const AgendarCita = () => {


    // const { register, errors, handleSubmit, setValue } = useForm({
    //     defaultValues: {}
    // });


    const [cliente, setCliente] = useState(
        {
            id: '',
            cedula: '',
            direccion: '',
            email: '',
            nombre: '',
            ocupacion: '',
            telefono: ''
        }
    );

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
            cedula: '',
            terapia: '',
            fecha: '',
            hora: '',
            terapeuta: ''
        }
    );

    const [visualCliente, setVisualCliente] = useState(false);
    const [visualForm, setVisualForm] = useState(false);


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

    }, [])

    const onSubmitCliente = (e) => {

        e.preventDefault();
        axios.get(`${SERVER}cliente/cedula/` + value.cedula)
            .then(res => {
              
                setCliente(res.data);
                setVisualForm(true);
                setVisualCliente(true);
                //limpiar campos



            })

    }

    const onSubmitTerapeutas = (e) => {
     

        e.preventDefault();
        axios.get(`${SERVER}terapeutas/availables`,{
            params:{
                fechaEntrada: value.fecha,
                idTerapia: value.terapia
            }
        })
        .then(res => {

           
            setTerapeutas(res.data);


        })
        

    }

    const asignarCita = () => {

        const usuario = JSON.parse(localStorage.getItem("usuario"));

        
        axios.post(`${SERVER}cita`, 
                 {
                    fecha: value.fecha,
                    idCliente: cliente.id,
                    idSecretario: usuario.id,
                    idTerapeuta: value.terapeuta,
                    idTerapia:value.terapia,
            }
      )
      .then(function(res) {

        alert("Cita creada con exito");

        window.location.reload(true);

        
    
      })
      .catch(function(err) {
        console.log(err);
      })

        
    }



    return (
        <>
            <div className="container">

                <div className="flex-row">
                    <div className="flex-large">

                        <form onSubmit={onSubmitCliente}>
                            <label>Cedula</label>
                            <input type="text"
                                name="cedula"
                                onChange={handleValues}
                                value={value.cedula} />

                            <button type="submit">Buscar Cliente</button>
                        </form>
                        {
                            visualCliente ? (

                                <div>
                                    <TarjetaCliente cliente={cliente} />
                                </div>


                            ) : (
                                    <div></div>

                                )
                        }



                    </div>
                    <div className="flex-large">

                        {
                            visualForm ? (

                                <div>
                                    <form onSubmit={onSubmitTerapeutas}>
                                        <label>Terapia</label>
                                        <select name="terapia" value={value.terapia} onChange={handleValues}>
                                            {
                                                terapias.map((terapia) => {
                                                    return <option key={terapia.id} value={terapia.id}>{terapia.nombre}</option>
                                                })
                                            }

                                        </select>

                                        <label>Fecha y hora</label>
                                        <div className="form-group row">
                                            <div className="col-12">
                                                <input className="form-control"
                                                    type="datetime-local"
                                                    value={value.fecha}
                                                    id="example-datetime-local-input"
                                                    name="fecha"
                                                    onChange={handleValues} />
                                            </div>
                                        </div>

                                        {/* <label>Fecha</label>
                            <input type="text" name="fecha"/>
                            <label>Hora</label>
                            <input type="text" name="hora" /> */}


                                        <button>Terapeutas disponibles</button>
                                    </form>


                                    <label>Terapuetas disponibles</label>
                                    <select name="terapeuta" value={value.terapeuta} onChange={handleValues}>

                                        {
                                            terapeutas.map((terapeuta) => {
                                                return <option key={terapeuta.id} value={terapeuta.id}>{terapeuta.nombre}</option>
                                            })
                                        }

                                    </select>
                                    <button onClick={asignarCita}>Guardar cita</button>
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
