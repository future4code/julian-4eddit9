import styled from 'styled-components';

export const SignupContainer = styled.div`
    border: 1px solid black;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`;
export const SignupTitle = styled.h1`

`;
export const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const InputLabel = styled.label`

`;
export const SignupInput = styled.input`

`;
export const SignupButton = styled.button`
    font-size: small;
    background: none;
    border: 1px solid #bbbbbb;
    border-radius: 4px;
    color: solid black;
    padding: 10px 32px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    display: inline-block;
    margin: 4px 0px;
    cursor: pointer;
    &:hover{
        background: #eeeeee;
    };
    &:active{
        background: #cccccc;
    }
`;
export const BackButton = styled.span`
    font-size: small;   
    border-radius: 4px;
    color: solid black;
    padding: 10px 32px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    display: inline-block;
    margin: 4px 0px;
    cursor: pointer;
    &:hover{
        background: #eeeeee;
    };
    &:active{
        background: #cccccc;
    }
`;