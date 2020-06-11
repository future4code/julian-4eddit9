import styled from 'styled-components';

export const FeedContainer = styled.div`
    text-align: center;
`

export const FormContainer = styled.form`
    display: grid;
    gap: 8px;
    align-items: center;
    justify-content: space-around;
    border: 1px solid black;
    margin-bottom: 16px;
    padding: 10px;
`

export const PostContainer = styled.div`
    border: 1px solid black;
    margin-bottom: 16px;

    div{
        display: inline-flex;
        align-items: center;
    }
`