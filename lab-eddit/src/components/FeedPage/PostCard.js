import React, { useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


import { PostContainer } from './styles'

import {
    TiArrowDownThick, TiArrowDownOutline,
    TiArrowUpOutline, TiArrowUpThick
} from 'react-icons/ti';


function PostCard(props) {
    const history = useHistory();
    
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
            <div>
                <p>{props.username}</p>
                <button onClick={()=>{history.push(`/post-details/${props.id}`)}}>Ver detalhes</button>
            </div>
            
            <p>{props.text}</p>
            <div>
                <button onClick={onClickVote} id={props.id} name="voteUp"> Like
                    {/* { comment.userVoteDirection === 1 ? <TiArrowUpThick/> : <TiArrowUpOutline/> } */}
                </button>

                <p>{props.votesCount}</p>

                <button onClick={onClickVote} id={props.id} name="voteDown"> Dislike
                    {/* { comment.userVoteDirection === -1 ? <TiArrowDownThick/> : <TiArrowDownOutline/> } */}
                </button>

                <p>{props.commentsCount} comentários</p>
            </div>
        </PostContainer>


    )}
  export default PostCard;
  