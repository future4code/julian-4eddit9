//Global-state: 10º- para usar o global state nos componentes filhos, importar o useContext
import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

//Global-state: 11º- importar o context que deseja usar o global state
import LoginContext from '../../contexts/LoginContex';

import { LoginContainer, FormContainer } from './styles';

function LoginPage() {
    const history = useHistory();

    //Global-state: 12º- instanciar o useContext com o context importado e ter acesso global state
    const loginContext = useContext(LoginContext);

    const [loginInfos, setLoginInfos] = useState({
        email: "",
        password: ""
    });
    const handleInputChange = (event) => {
        const {name, value} = event.target
        setLoginInfos({...loginInfos, [name]:value})
    };
    const onClickLogin = () => {
        api.post('login', loginInfos)
        .then((response) => {
            const responseConverted = JSON.stringify(response.data);
            localStorage.setItem("userInfos", responseConverted);

            //Global-state: 13º- utilizar alguma das actions setadas no switch do storeReducer
            loginContext.dispatch({type: 'SET_USER_INFOS', infos: response.data});

            history.replace("/feed");    
        }).catch((error) => {
            alert("E-mail ou senha incorretos. Digite novamente.")
        })
    };
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
                    type="password"
                    placeholder="Senha"
                    required
                />
                {/* <div>
                    <input name='remember' type='checkbox'/>
                    <label for='remeber'>Lembre-se de mim</label>
                </div> */}
                <button onClick={onClickLogin}>LOGIN</button>
                <button onClick={() => {history.push("/signup")}}>FAZER CADASTRO</button>
            </FormContainer>
        </LoginContainer>
    );
}
export default LoginPage;

