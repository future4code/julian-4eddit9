import React, {useState} from 'react';

import {
    PostDetailsContainer, ContentCard, ContentText,
    ContentTitle, ContentActionBar, IconButton, 
    ContentCounter, CommentInput, SendCommentButton,
    SendCommentCard, CommentsPanel
} from './styles'

import {
    TiArrowDownThick, TiArrowDownOutline,
    TiArrowUpOutline, TiArrowUpThick
} from 'react-icons/ti';

const PostDetailsPage=()=>{

    const [postDetails, setPostDetails] = useState({
        
        comments: [
        {
            userVoteDirection: 0,
            id: "PvA5iyq6xnHKT7LFyg73",
            username: "darvas",
            text: "Texto do comentario aqui!",
            createdAt: 1591622964376,
            votesCount: 0
        },{
            userVoteDirection: 0,
            id: "PvA5iyq6xnHKT7LFyg73",
            username: "darvas",
            text: "Texto do comentario aqui!",
            createdAt: 1591622964376,
            votesCount: 0
        },{
            userVoteDirection: 0,
            id: "PvA5iyq6xnHKT7LFyg73",
            username: "darvas",
            text: "Texto do comentario aqui!",
            createdAt: 1591622964376,
            votesCount: 0
        }
        ],
        userVoteDirection: -1,
        id: "WCmBIGyynC5ihJFUmHFf",
        text: "Texto do post aqui!",
        commentsCount: 1,
        title: "Titulo aqui!",
        username: "darvas",
        votesCount: -1,
        createdAt: 1591622901616
    });
    
    return(
        <PostDetailsContainer>
            <h1>Detalhes do post</h1>
            <ContentCard>
                <ContentTitle>{postDetails.username}</ContentTitle>
                <ContentText>
                    {postDetails.text}
                </ContentText>
                <ContentActionBar>
                    <>
                        <IconButton>
                            <TiArrowUpOutline/>
                        </IconButton>
                        <ContentCounter>{postDetails.votesCount}</ContentCounter>
                        <IconButton>
                            <TiArrowDownOutline/>
                        </IconButton>
                    </>
                    <>
                        <ContentCounter>comentarios {postDetails.commentsCount}</ContentCounter> 
                    </>
                </ContentActionBar>
            </ContentCard>
            <SendCommentCard>
                <CommentInput 
                placeholder='Escreva um comentário'
                />
                <SendCommentButton>Enviar</SendCommentButton>
            </SendCommentCard>

            <CommentsPanel>
                {postDetails.comments.map(comment=>
                    (
                        <ContentCard>
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
                        </ContentCard>
                    )
                )}

            </CommentsPanel>
        </PostDetailsContainer>
    )
};
export default PostDetailsPage  