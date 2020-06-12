import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import PostCard from './PostCard';
import axios from 'axios';
import api from '../../services/api';

import LoginContext from '../../contexts/LoginContex';

import { FeedContainer, FormContainer } from './styles'


function FeedPage() { 
    const userToken = JSON.parse(localStorage.getItem("userInfos")).token;

    const history = useHistory();

    const loginContext = useContext(LoginContext);

    const [createPost, setCreatePost] = useState({
        text: "",
        title: "",
    }); 

    const [getPost, setGetPost] = useState(null) 

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setCreatePost({...createPost, [name]: value})
    }
   
    const onClickCreatePost = (event) => {
        event.preventDefault();
        axios
        .post('posts', createPost, {
            headers:{
                Authorization: loginContext.userInfos.token
            }})
        .then((response) => {
            window.alert("Post criado com sucesso!")
            setGetPost(null)
            setCreatePost( {
                text: "",
                title: "",
            })           
        })
        .catch((error) => window.alert("Erro ao criar o post, tente novamente."))
    };
    useEffect(() => {
        if(getPost === null) {
            api.get('posts', {headers: {Authorization: loginContext.userInfos.token}})
            .then(response => setGetPost(response.data.posts))
            .catch(erro=>window.alert('Não foi possível carregar o feed! :('))
        } 
    }, [getPost]);
    
    return (
        <FeedContainer>
            <h1>Página de feed</h1>
            <button onClick={()=> history.replace('/')}>Logoff</button>
            <FormContainer onSubmit={onClickCreatePost}>
                <input 
                    value={createPost.title} 
                    onChange={handleInputChange}
                    name="title"
                    type="text"
                    placeholder="Título"
                    required
                 />
                <textarea
                    value={createPost.text} 
                    onChange={handleInputChange}
                    name="text"
                    type="text"
                    placeholder="Escreva seu post"
                    required
                />
                <button>POSTAR</button> 
            </FormContainer>
            
            <div>
                {getPost !== null && getPost !== undefined && getPost.map((post) => {
                    return (
                        <PostCard 
                            token = {loginContext.userInfos.token}
                            key = {post.id}
                            commentsCount = {post.commentsCount}
                            createdAt = {post.createdAt}
                            id = {post.id}
                            text = {post.text}
                            title = {post.title}
                            userVoteDirection = {post.userVoteDirection}
                            username = {post.username}
                            votesCount = {post.votesCount}
                        />
                    )
                })}
            </div>  
        </FeedContainer>
    )}
  export default FeedPage;
