import React from 'react'

export const TarjetaCita = ({cita,mostrarCita}) => {

    const handleOnClick = () =>{
        mostrarCita(cita);
    }
    
    return (
        <div>
            <div className="card bg-light mb-3" >
                <div className="card-header">Cita</div>
                <div className="card-body">
                    <h5 className="card-title">{cita.nombreCliente}</h5>
                    <p className="card-title">{"Fecha Inicio: "+cita.fechaInicial+" "+cita.horaInicio}</p>
                    <p className="card-title">{"Fecha Final: "+cita.fechaFinal+" "+cita.horaFinal}</p>
                    
                    <button className="btn btn-primary" onClick={handleOnClick}>Ver Cita</button>
                </div>
            </div>

            
        </div>
    )
}
