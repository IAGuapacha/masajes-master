import React from 'react'

export const ClienteTable = ({ clientes,deleteCliente,editRow }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Cedula</th>
            <th>Direccion</th>
            <th>Email</th>
            <th>Nombre</th>
            <th>Ocupacion</th>
            <th>Telefono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            clientes.length > 0 ? (
              clientes.map(cliente => (

                  <tr key={cliente.id}>
                  <td>{cliente.cedula}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.ocupacion}</td>
                  <td>{cliente.telefono}</td>
                  <td>
                    <button 
                      className="button muted-button"
                      onClick={() =>{editRow(cliente)}}
                    >Editar</button>
                    <button 
                      className="button muted-button"
                      onClick={() => {deleteCliente(cliente.id)}}
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
