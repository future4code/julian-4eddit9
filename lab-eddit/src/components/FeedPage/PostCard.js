import React from 'react';
import axios from 'axios';


import { PostContainer } from './styles'


function PostCard() {
    axios.get('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts', {
        headers: {
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5dEdONkVTcGlVdDgweFgwbzBWIiwidXNlcm5hbWUiOiJkYXJ2YXMiLCJlbWFpbCI6InBlZHJvLmRhcnZhc0BnbWFpbC5jb20iLCJpYXQiOjE1OTE2MjI0OTd9.4Bewo-Gklruzd8WpyiC6N9Vb7_95TSPgyZ_3UzWW3k'
        }
    }).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error) //não faz a requisição!!!!! e aparece o erro 3x AAAHHHHH
    })

    return (
        <PostContainer>
            <p>Nome do usuário</p>
            <p>Texto do Post</p>
            <div> 
                <button>Like</button>
                <p>Contador do like</p>
                <button>Dislike</button>
                <p>0 comentários</p>
            </div>
        </PostContainer>

    )}
  export default PostCard;