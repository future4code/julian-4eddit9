import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import axios from 'axios';


import { FeedContainer, FormContainer } from './styles'


function FeedPage() {
    const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit' 
    const userToken = JSON.parse(localStorage.getItem("userInfos")).token

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
        .post(`${baseUrl}/posts`, createPost, {
            headers:{
                Authorization: userToken
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
    }

   
    const getListsPost = () => {
        axios
        .get(`${baseUrl}/posts`, {
            headers: {
                Authorization: userToken
            }})
        .then((response) => {setGetPost(response.data.posts)})
        
        .catch((error) => {window.alert("Não foi possível carregar o feed, tente novamente mais tarde.")})
    }    
    useEffect(() => {
        if(getPost === null) {
            getListsPost()
        } 
    }, [getPost])

    
    return (
        <FeedContainer>
            <h1>Página de feed</h1>
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
                {getPost !== null && getPost.map((post) => {
                    return (
                        <PostCard 
                            token = {userToken}
                            baseUrl = {baseUrl}
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
