import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginContainer = styled.div`
    text-align: center;
`

const FormContainer = styled.div`
    display: grid;
    grid-column: 1fr 1fr 1fr 1fr;
    gap: 16px;
    align-items: center;
    justify-content: space-around;
`


function LoginPage() {
    const history = useHistory()

    const [loginInfos, setLoginInfos] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setLoginInfos({...loginInfos, [name]:value})
    }
    
    const onClickLogin = () => {        
        axios.post('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/login', loginInfos)
        .then((response) => {
            const responseConverted = JSON.stringify(response.data)
            localStorage.setItem("userInfos", responseConverted)
            history.replace("/feed")
            
        }).catch((error) => {
            alert("E-mail ou senha incorretos. Digite novamente.")
        })
    };
     

    // console.log(JSON.parse(localStorage.getItem("userInfos")))

    return (
        <LoginContainer>
            <h1>Login</h1>
            <FormContainer>
                <input
                    value={loginInfos.email}
                    onChange={handleInputChange}
                    name="email"
                    type="text"
                    placeholder="E-mail"
                    required
                />
                <input
                    value={loginInfos.password}
                    onChange={handleInputChange}
                    name="password"
                    type="text"
                    placeholder="Senha"
                    required
                />
                <button onClick={onClickLogin}>LOGIN</button>
                <button onClick={() => {history.push("/signup")}}>FAZER CADASTRO</button>
            </FormContainer>
        </LoginContainer>
    );
}

export default LoginPage;

