import React from 'react'
import './style.css';
import { RecipeCommentListItem } from 'types/interface';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import dayjs from 'dayjs';
interface Props {
    recipecommentListItem: RecipeCommentListItem;
}

//          component: Comment List Item 컴포넌트          //
export default function RecipeCommentItem({ recipecommentListItem }: Props) {

    //          state: properties         //
    const { nickname, profileImage, writeDatetime, content } = recipecommentListItem;

    //          function: 작성일 경과시간 함수          //
    const getElapsedTime = () => {
        const now = dayjs().add(9, 'hour');
        const writeTime = dayjs(writeDatetime);

        const gap = now.diff(writeTime, 's');
        if (gap < 60) return `${gap}초 전`;
        if (gap < 3600) return `${Math.floor(gap / 60)}분 전`;
        if (gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
        return `${Math.floor(gap / 86400)}일 전`;
    }

    //          render: Comment List Item 렌더링         //
    return (
        <div className='recipe-comment-list-item'>
            <div className='recipe-comment-list-item-top'>
                <div className='recipe-comment-list-item-profile-box'>
                    <div className='recipe-comment-list-item-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})` }}></div>
                </div>
                <div className='recipe-comment-list-item-nickname'>{nickname}</div>
                <div className='recipe-comment-list-item-divider'>{'\|'}</div>
                <div className='recipe-comment-list-item-time'>{getElapsedTime()}</div>
            </div>
            <div className='recipe-comment-list-item-main'>
                <div className='recipe-comment-list-item-content'>{content}</div>
            </div>
            <div></div>
        </div>
    )
}
