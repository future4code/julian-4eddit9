import styled from 'styled-components';

export const PostDetailsContainer = styled.div`
    border: 1px solid black;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x:none;
`;
export const ContentCard = styled.main`
    border: 1px solid black;
    margin-bottom: 8px;
    width: 320px;
    height: 208px;
    display: grid;
    grid-template-rows: 0.5fr 3fr 0.5fr; 
`;
export const ContentTitle = styled.div`
    border: 1px solid black;
    text-align: center;
    width: 100%;
`;
export const ContentText = styled.p`
    border: 1px solid black;
    width: 100%;
    margin: 0;
    text-align: justify;
    letter-spacing: 1px;
    overflow: auto;
`;
export const ContentActionBar = styled.div`
    border: 1px solid black;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`; 
export const IconButton = styled.i`

`;
export const ContentCounter = styled.span`

`;
export const SendCommentCard = styled.main`
    border: 1px solid black;
    margin-top: 16px;
    width: 320px;
    height: 128px;
    display: grid;
    grid-template-rows: 3fr 0.5fr; 
`;
export const CommentInput = styled.textarea`
    text-align: justify;
    letter-spacing: 1px;
    overflow: auto;
`;
export const SendCommentButton = styled.button`

`;
export const CommentsPanel = styled.main`
    margin: 16px 0 0 18px;
    width: 340px;
    display: flex;
    flex-direction: column;
    overflow-x:none;
    overflow-y:auto;
`;