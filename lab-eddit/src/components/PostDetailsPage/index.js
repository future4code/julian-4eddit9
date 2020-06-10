import React, {useState, useEffect} from 'react';
import axios from 'axios';

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

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit';

const PostDetailsPage=()=>{

    const postId = "QUEEf0KWjsVmS6w7xD7Y"
    const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNoUEVCeWZEOXBaOHpTYWpkR3lCIiwidXNlcm5hbWUiOiJIZW5kcml4IiwiZW1haWwiOiJoZW5kcml4QGppbW15LmNvbSIsImlhdCI6MTU5MTgyMzM4NH0.ctoXygEyO83nM00mePdwt_q8E7_C1yqHcdrXuGvXT6Y"

    const [postDetails, setPostDetails] = useState(null);

    const [commentText, setCommentText] = useState('');
    
    const handleInputChange =(e)=>{
        setCommentText(e.target.value)
    };
    const handleSendComment=(e)=>{
        e.preventDefault();
        console.log(commentText)
    };
    const handleSendVote=async(userDirection)=>{
        try{
            const response = await axios
            .put(
                `${baseUrl}/posts/${postDetails.id}/vote`,
                {direction: userDirection},
                {headers:{Authorization:userToken}},
            )
            setPostDetails(null)
            console.log(response)
        }catch(e){
            window.alert('Não foi possível registrar seu voto...')
        }
    };
    useEffect(()=>{
        if(postDetails === null){
            axios
            .get(`${baseUrl}/posts/${postId}`, {headers:{Authorization:userToken}},)
            .then(r=> setPostDetails(r.data.post))
            .catch(e=> window.alert('Não foi possível carregar informações deste post!'))
        }
    },[postDetails]);

    //console.log(postDetails)
    return(
        <PostDetailsContainer>
            <h1>Detalhes do post</h1>
            <ContentCard>
                <ContentTitle>
                    {postDetails !== null ? postDetails.username:''}
                </ContentTitle>
                <ContentText>
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
                                handleSendVote(userDirection)
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
                        <IconButton onClick={
                            ()=>{
                                const userDirection = 
                                postDetails!== null && postDetails.userVoteDirection === -1 ?
                                0 : -1
                                handleSendVote(userDirection)
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

            <CommentsPanel>
                {
                postDetails !== null && 
                    postDetails.comments.map(comment=>
                        (
                            <CommentCard>
                                <ContentTitle>{comment.username}</ContentTitle>
                                <ContentText>
                                    {comment.text}
                                </ContentText>
                                <ContentActionBar>
                                    <>
                                        <IconButton>
                                            <TiArrowUpOutline/>
                                        </IconButton>
                                        <ContentCounter>{comment.votesCount}</ContentCounter>
                                        <IconButton>
                                            <TiArrowDownOutline/>
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