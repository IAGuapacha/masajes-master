import React from 'react'
import {useForm} from 'react-hook-form'

export const EditClienteForm = ({updateCliente,currentCliente}) => {

    const {register,errors,handleSubmit,setValue} = useForm({
        defaultValues: currentCliente
    });

    
    setValue('cedula', currentCliente.cedula);
    setValue('direccion',currentCliente.direccion);
    setValue('email', currentCliente.email);
    setValue('nombre',currentCliente.nombre);
    setValue('ocupacion', currentCliente.ocupacion);
    setValue('telefono',currentCliente.telefono);

    const onSubmit = (data,e) => {
        updateCliente(currentCliente.id,data);
        //limpiar campos
        e.target.reset();
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>

                <label>Cedula</label>
                <input type="text" name="cedula" ref={
                    register({
                        required:{value:true, message: 'Campo requerido'}
                    })
                } />
                <div>
                    {errors?.cedula?.message}
                </div>

                <label>Direccion</label>
                <input type="text" name="direccion" ref={
                    register({
                        required:{value:true, message: 'Campo requerido'}
                    })
                }  />
                <div>
                    {errors?.direccion?.message}
                </div>

                <label>Email</label>
                <input type="text" name="email" ref={
                    register({
                        required:{value:true, message: 'Campo requerido'}
                    })
                }  />
                <div>
                    {errors?.email?.message}
                </div>

                <label>Nombre</label>
                <input type="text" name="nombre" ref={
                    register({
                        required:{value:true, message: 'Campo requerido'}
                    })
                }  />
                <div>
                    {errors?.nombre?.message}
                </div>

                <label>Ocupacion</label>
                <input type="text" name="ocupacion" ref={
                    register({
                        required:{value:true, message: 'Campo requerido'}
                    })
                }  />
                <div>
                    {errors?.ocupacion?.message}
                </div>

                <label>Telefono</label>
                <input type="text" name="telefono" ref={
                    register({
                        required:{value:true, message: 'Campo requerido'}
                    })
                }  />
                <div>
                    {errors?.telefono?.message}
                </div>
                <button>Editar Cliente</button>
            </form>
        </div>
    )
}
