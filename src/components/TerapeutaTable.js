import React from 'react'

export const TerapeutaTable = ({ terapeutas,deleteTerapeuta,editRow }) => {
    return (
        <div>
      <table>
        <thead>
          <tr>
            <th>Cedula</th>
            <th>Clave</th>
            <th>Direccion</th>
            <th>Email</th>
            <th>Nombre</th>
            <th>Profesion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            terapeutas.length > 0 ? (
                terapeutas.map(terapeuta => (

                <tr key={terapeuta.id}>
                  <td>{terapeuta.cedula}</td>
                  <td>{terapeuta.clave}</td>
                  <td>{terapeuta.direccion}</td>
                  <td>{terapeuta.email}</td>
                  <td>{terapeuta.nombre}</td>
                  <td>{terapeuta.profesion}</td>
                  <td>
                    <button 
                      className="button muted-button"
                      onClick={() =>{editRow(terapeuta)}}
                    >Editar</button>
                    <button 
                      className="button muted-button"
                      onClick={() => {deleteTerapeuta(terapeuta.id)}}
                    >
                      Eliminar</button>
                  </td>
                </tr>

              ))
            ) : (
                <tr>
                  <td colSpan={3}>No users</td>
                </tr>
              )
          }

        </tbody>
      </table>
    </div>
    )
}
