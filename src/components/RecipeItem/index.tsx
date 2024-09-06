import React from 'react'
import './style.css';
import { RecipeListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import { RECIPE_BOARD_DETAIL_PATH, RECIPE_BOARD_PATH, RECIPE_PATH } from 'constant';

interface Props {
    recipeListItem: RecipeListItem
}
//          component : Recipe List Item 컴포넌트          //
export default function RecipeItem({ recipeListItem }: Props) {

    //          properties          // 
    const { boardNumber, title, content, boardTitleImage } = recipeListItem;
    const { favoriteCount, commentCount, viewCount } = recipeListItem;
    const { writeDatetime, writerNickname, writerProfileImage } = recipeListItem;
    const { cookingTime } = recipeListItem

    //          function: 네비게이트 함수          // 
    const navigate = useNavigate();

    //          event handler: 게시물 아이템 클릭 이벤트 처리 함수          // 
    const onClickHandler = () => {
        navigate(`/recipe/recipe-board/detail/${boardNumber}`);
    };


    //          render : recipe List Item 컴포넌트 렌더링         //
    return (
        <div className='recipe-list-item' onClick={onClickHandler}>
            <div className='recipe-list-item-main-box'>
                <div className='recipe-list-item-top'>
                    <div className='recipe-list-item-profile-box'>
                        <div className='recipe-list-item-profile-image' style={{ backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})` }}></div>
                    </div>
                    <div className='recipe-list-item-write-box'>
                        <div className='recipe-list-item-nickname'>{writerNickname}</div>
                        <div className='recipe-list-item-write-date'>{writeDatetime}</div>
                    </div>
                </div>
                <div className='recipe-list-item-middle'>
                    <div className='recipe-list-item-title'>{'제목: '}{title}</div>
                    <div className='recipe-list-item-content'>
                        {'요리 설명: '}{content}
                    </div>
                    <div className='recipe-list-item-cooking-time'>{'소요시간: '}{cookingTime}{'분'}</div>
                </div>
                <div className='recipe-list-item-bottom'>
                    <div className='recipe-list-item-counts'>
                        {`댓글 ${commentCount} ∙ 좋아요 ${favoriteCount} ∙ 조회수 ${viewCount}`}
                    </div>
                </div>
            </div>
            {boardTitleImage !== null && (
                <div className='recipe-list-item-image-box'>
                    <div className='recipe-list-item-image' style={{ backgroundImage: `url(${boardTitleImage})` }}></div>
                </div>
            )}
        </div>
    )
}
