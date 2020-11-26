import React from 'react'
import {useForm} from 'react-hook-form'

export const AddTerapeutaForm = (props) => {

    const {register,errors,handleSubmit} = useForm();

    const onSubmit = (data,e) => {
        props.addTerapeuta(data);
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
                <label>Clave</label>
                <input type="text" name="clave" ref={
                    register({
                        required:{value:true, message: 'Campo requerido'}
                    })
                }  />
                <div>
                    {errors?.clave?.message}
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

                <label>Profesion</label>
                <input type="text" name="profesion" ref={
                    register({
                        required:{value:true, message: 'Campo requerido'}
                    })
                }  />
                <div>
                    {errors?.profesion?.message}
                </div>
                <button>Agregar Terapeuta</button>
            </form>
        </div>
    )
}
