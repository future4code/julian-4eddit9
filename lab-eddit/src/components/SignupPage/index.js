import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

import {
    SignupContainer, SignupForm, 
    SignupInput, SignupButton, SignupTitle,
    InputLabel,
    BackButton
} from './styles'

function SignupPage(){

    const history = useHistory()

    const [signupInfos, setSignupInfos] = useState({
        email:'',
        password:'',
        username:'',
    });
    const handleInputChange = (e)=>{
        const {name, value} = e.target;

        setSignupInfos({...signupInfos, [name]:value});
    };
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            window.alert('Solicitação realizada! Aguarde a confirmação...');

            const response = await axios .post(
                `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/signup`,
                signupInfos
                );
            console.log(response)
            window.alert(`Usuário(a) '${response.data.user.username}' cadastrado(a) com sucesso!`);
        }catch(e){
            window.alert('Não foi possível realizar o cadastro. Tente novamente mais tarde!')
        };
    };

    return(
        <SignupContainer onSubmit={handleSubmit}>
            <SignupTitle>Cadastro</SignupTitle>
            <SignupForm>
                <InputLabel>Nome de usuário</InputLabel>
                <SignupInput 
                name='username'
                required type='text' 
                placeholder='Seu nome'
                onChange={handleInputChange}
                pattern='[A-z ]{3,}'
                title='Nome deve começar com letra maiúscula e ter no mínimo 3 letras'
                />

                <InputLabel>E-mail</InputLabel>
                <SignupInput 
                name='email'
                required type='text' 
                title='Ex.: joao.maria@eu.com'
                placeholder='Ex.: joao.maria@eu.com'
                onChange={handleInputChange}
                />

                <InputLabel required type='text'>Senha</InputLabel>
                <SignupInput
                name='password'
                required type='text' 
                title='Mínimo de 6 caractéres' 
                placeholder='Mínimo de 6 caractéres' 
                minLength={6}
                onChange={handleInputChange}
                />

                <SignupButton>Cadastrar</SignupButton>
            </SignupForm>

            <BackButton onClick={()=>{history.push('/')}}>Voltar</BackButton>
        </SignupContainer>
    )
}
export default SignupPage