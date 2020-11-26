import React from 'react'

export const TarjetaClienteDatos = ({ cliente,mostrarCliente }) => {

    const handleOnclickCliente = () =>{
        mostrarCliente(cliente);
    }

    

    return (
        <>
            <div className="card bg-light mb-3" >
                <div className="card-header">Cliente</div>
                <div className="card-body">
                    <h5 className="card-title">{"Nombre: "+cliente.nombre}</h5>
                    <h5 className="card-title">{"Cedula: "+cliente.cedula}</h5>
                    <h5 className="card-title">{"Telefono: "+cliente.telefono}</h5>
                    
                    <button className="btn btn-primary" onClick={handleOnclickCliente}>Ver Cliente</button>
                </div>
            </div>

        </>
    )
}