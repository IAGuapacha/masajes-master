import React from 'react'

export const TarjetaObservacion = ({ observacion }) => {
    return (
        <div className="card text-white bg-secondary mb-10" >
                <div className="card-header">Observacion</div>
                <div className="card-body">
                    {/* <h5 className="card-title">Success card title</h5> */}
                <p className="card-text">{observacion.observacion}</p>
                </div>
                

            </div>
    )
}
