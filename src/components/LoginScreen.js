import React,{ useState } from 'react'
import '../css/login.css'
import axios from 'axios';
import {SERVER} from '../server/Server'

export const LoginScreen = ({history}) => {

    const [inputValue, setInputValue] = useState({
        cedula: "",
        contrasena: ""
    })


    const handleInputChange = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        });
    }
    
    const handleLogin = (e) => {

        e.preventDefault();
        console.log(inputValue.cedula,inputValue.contrasena);
        axios.get(`${SERVER}login`, {
            params:{
               clave: inputValue.cedula,
               email: inputValue.contrasena

            }
        })
        .then(res => {

            if(res.data.identificador != -1){

                localStorage.setItem("usuario",JSON.stringify(res.data));
                if(res.data.identificador == 1){
                    history.replace('/terapeuta');
                }else{
                    history.replace('/gestionsesiones');
                }
                
            
            }else{
                alert("Cedula o contraseña incorrectas");
            }
            
            
        })

    } 
    return (
        <>
            <div className="login-page">
                <div className="form">
                    <form  className="login-form">
                        <input type="text" placeholder="correo" name="contrasena" onChange={handleInputChange} />
                        <input type="password" placeholder="clave" name="cedula" onChange={handleInputChange} />
                        <button onClick={handleLogin}>Iniciar Sesion</button>
                    </form>
                </div>
            </div>
        </>
    )
}
