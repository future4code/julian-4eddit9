import React, { useState } from 'react';
import axios from 'axios';


import { PostContainer } from './styles'


function PostCard(props) {
    const onClickVote = (event) => {
        const currentVote = props.userVoteDirection

        const voteDirection = () => {
            if(currentVote === 0 && event.target.name === "voteUp") {
                return 1
            } if(currentVote === 0 && event.target.name === "voteDown") {
                return -1
            } else {
                return 0
            }
        }
        console.log(voteDirection())
        axios.put(`${props.baseUrl}/posts/${props.id}/vote`, {"direction": voteDirection()}, {
            headers: {
                Authorization: props.token
            }
        }).then().catch((error) => window.alert("Não foi possível registrar o seu voto."))
    }
    
    return (
        <PostContainer>
            <p>{props.username}</p>
            <p>{props.text}</p>
            <div>
                <button onClick={onClickVote} id={props.id} name="voteUp">Like</button>
                <p>{props.votesCount}</p>
                <button onClick={onClickVote} id={props.id} name="voteDown">Dislike</button>
                <p>comentários {props.commentsCount}</p>
            </div>
        </PostContainer>
    )}
  export default PostCard;
  