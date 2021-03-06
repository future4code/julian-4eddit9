import React, {useState, useEffect} from 'react';
import api from '../../services/api'
import {useParams, useHistory} from 'react-router-dom'


import {
    PostDetailsContainer, ContentCard, ContentText,
    ContentTitle, ContentActionBar, IconButton, 
    ContentCounter, CommentInput, SendCommentButton,
    SendCommentCard, CommentsPanel, CommentCard
} from './styles'

import {
    TiArrowDownThick, TiArrowDownOutline,
    TiArrowUpOutline, TiArrowUpThick
} from 'react-icons/ti';

const PostDetailsPage=()=>{
    const {postId} = useParams();

    const history = useHistory();
    
    const userToken = JSON.parse(localStorage.getItem("userInfos")).token

    const [postDetails, setPostDetails] = useState(null);

    const [commentText, setCommentText] = useState('');
    
    const handleInputChange =(e)=>{
        setCommentText(e.target.value)
        
    };
    const handleSendComment=async(e)=>{
        e.preventDefault();
        try{
            await api.post(
                `posts/${postDetails.id}/comment`,
                {text: commentText},
                {headers:{Authorization:userToken}},
            );
            setPostDetails(null);
            setCommentText('');
        }catch(e){
            window.alert('Não foi possível registrar seu comentário...')
        }
    };
    const handleSendPostVote=async(userDirection)=>{
        try{
            await api.put(
                `posts/${postDetails.id}/vote`,
                {direction: userDirection},
                {headers:{Authorization:userToken}},
            );
            setPostDetails(null);
        }catch(e){
            window.alert('Não foi possível registrar seu voto no post...');
        }
    };
    const handleSendCommentVote=async(e)=>{
        const commentId = e.target.id;
        const votedComment = postDetails.comments.filter(
            comment=> (comment.id === e.target.id)
        );
        const voteDirection =()=>{
            if(e.target.name === 'vote-up'){
                const vote = votedComment[0].userVoteDirection === 1 ? 0 : 1
                return vote
            }
            if(e.target.name === 'vote-down'){
                const vote = votedComment[0].userVoteDirection === -1 ? 0 : -1
                return vote
            }
        };                   
        try{
            await api.put(
                `posts/${postDetails.id}/comment/${commentId}/vote`,
                {direction: voteDirection()},
                {headers:{Authorization:userToken}},
            );
            setPostDetails(null);
        }catch(e){
            window.alert('Não foi possível registrar seu voto no comentário...');
        };
    };
    useEffect(()=>{
        if(postDetails === null){
            api.get(`posts/${postId}`, {headers:{Authorization:userToken}},)
            .then(r=> setPostDetails(r.data.post))
            .catch(e=> window.alert('Não foi possível carregar informações deste post!'))
        }
    },[postDetails]);

    return(
        <PostDetailsContainer>
            <h1>Detalhes do post</h1>
            <button onClick={()=>{history.goBack()}}>Voltar para Feed</button>
            <ContentCard>
                <ContentTitle>
                    {postDetails !== null ? postDetails.username:''}
                </ContentTitle>
                <ContentText>
                    {postDetails !== null ?postDetails.title:''}
                    <br/><br/>
                    {postDetails !== null ?postDetails.text:''}
                </ContentText>
                <ContentActionBar>
                    <>
                        <IconButton 
                        onClick={
                            ()=>{
                                const userDirection = 
                                postDetails!== null && postDetails.userVoteDirection === 1 ?
                                0 : 1
                                handleSendPostVote(userDirection)
                            }
                        }
                        >
                            {
                                postDetails !== null &&
                                postDetails.userVoteDirection === 1 ?
                                <TiArrowUpThick/>:<TiArrowUpOutline/>
                            }
                        </IconButton>
                        <ContentCounter>
                            {postDetails !== null ? postDetails.votesCount:''}
                        </ContentCounter>
                        <IconButton 
                        onClick={
                            ()=>{
                                const userDirection = 
                                postDetails!== null && postDetails.userVoteDirection === -1 ?
                                0 : -1
                                handleSendPostVote(userDirection)
                            }
                        }
                        >
                            {
                                postDetails !== null &&
                                postDetails.userVoteDirection === -1 ?
                                <TiArrowDownThick/>:<TiArrowDownOutline/>
                            }
                        </IconButton>
                    </>
                    <>
                        <ContentCounter>
                            comentários {postDetails !== null ? postDetails.commentsCount:''}
                        </ContentCounter> 
                    </>
                </ContentActionBar>
            </ContentCard>

            <SendCommentCard onSubmit={handleSendComment}>
                <CommentInput
                required 
                placeholder='Escreva um comentário'
                title='Seu comentário deve ter no máximo 136 caractéres.'
                maxLength={136}
                type='text'
                value={commentText}
                onChange={handleInputChange}
                />
                <SendCommentButton>Enviar</SendCommentButton>
            </SendCommentCard>
            
            <h3>Comentários</h3>

            <CommentsPanel>
                {
                postDetails !== null && 
                    postDetails.comments.map(comment=>
                        (
                            <CommentCard key={comment.id}>
                                <ContentTitle>{comment.username}</ContentTitle>
                                <ContentText>
                                    {comment.text}
                                </ContentText>
                                <ContentActionBar>
                                    <>
                                        <IconButton
                                        name='vote-up'
                                        id={comment.id} 
                                        onClick={handleSendCommentVote}
                                        >
                                            {
                                            comment.userVoteDirection === 1 ?
                                            <TiArrowUpThick/>:<TiArrowUpOutline/>
                                            }
                                        </IconButton>
                                        <ContentCounter>{comment.votesCount}</ContentCounter>
                                        <IconButton
                                        name='vote-down'
                                        id={comment.id}
                                        onClick={handleSendCommentVote}
                                        >
                                            {
                                            comment.userVoteDirection === -1 ?
                                            <TiArrowDownThick/>:<TiArrowDownOutline/>
                                            }
                                        </IconButton>
                                    </>
                                    <>
                                    </>
                                </ContentActionBar>
                            </CommentCard>
                        )
                    )
                }
            </CommentsPanel>
        </PostDetailsContainer>
    )
};
export default PostDetailsPage  