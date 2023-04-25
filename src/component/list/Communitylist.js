import React from "react";
import styled from "styled-components";
import CommunityListItem from "./CommunityListItem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > * {
        :not(:last-child){
            margin-bottom: 16px;
        }
    }
`;

function Communitylist(props){
    const { posts, onClickItem } = props;

    return (
        
        <Wrapper>
        
        {posts.map((post, index) => {
            return (
                <CommunityListItem
                    key={post.id}
                    post={post}
                    onClick={() => {
                        onClickItem(post);
                    }}
                />
            );
        })}
        </Wrapper>
    );
    }

export default Communitylist;