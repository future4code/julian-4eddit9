import React, { useState } from 'react';
import PostCard from './PostCard';
import axios from 'axios';


import { FeedContainer, FormContainer } from './styles'



function FeedPage() {
    const [createPost, setCreatePost] = useState({
        text: "",
        title: ""
    });
     
    const handleInputChange = (event) => {
        const {name, value} = event.target
        setCreatePost({...createPost, [name]: value})
    }
   
    const onClickCreatePost = () => {
        axios.post('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts', createPost, {
            headers:{
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5dEdONkVTcGlVdDgweFgwbzBWIiwidXNlcm5hbWUiOiJkYXJ2YXMiLCJlbWFpbCI6InBlZHJvLmRhcnZhc0BnbWFpbC5jb20iLCJpYXQiOjE1OTE2MjI0OTd9.4Bewo-Gklruzd8WpyiC6N9Vb7_95TMSPgyZ_3UzW3k'
            }
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }
  

    return (
        <FeedContainer>
            <h1>Página de feed</h1>
            <FormContainer>
                <textarea
                    value={createPost} //title ou text?
                    onChange={handleInputChange}
                    name="post"
                    type="text"
                    placeholder="Escreva seu post"
                    required
                />
                <button onClick={onClickCreatePost}>POSTAR</button> {/* está fazendo a requisição? */}
            </FormContainer>

            <PostCard />
            <PostCard />
            <PostCard />


        </FeedContainer>
    )}
  export default FeedPage;