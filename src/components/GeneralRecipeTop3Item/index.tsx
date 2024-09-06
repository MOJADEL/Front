import React from 'react'
import './style.css';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import { RecipeListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
import grayimage from 'assets/image/gray-image.png';

interface Props {
    generalrecipetop3List: RecipeListItem
}

//          Component: Recipe Top 3 List Item 컴포넌트          //
export default function GeneralRecipeTop3Item({ generalrecipetop3List }: Props) {

    //          properties          //
    const { boardNumber, title, content, boardTitleImage } = generalrecipetop3List;
    const { favoriteCount, commentCount, viewCount } = generalrecipetop3List;
    const { writeDatetime, writerNickname, writerProfileImage } = generalrecipetop3List;
    const { cookingTime } = generalrecipetop3List;

    //          function : navigate 함수          //
    const navigate = useNavigate();

    //          event Handler: 게시물 아이템 클릭 이벤트 처리 함수          //
    const onClickHandler = () => {
        // navigate(RECIPE_PATH() + RECIPE_BOARD_PATH() + '/' + RECIPE_BOARD_DETAIL_PATH(boardNumber));
        // navigate(`/recipe/recipe-board/detail/${recipetop3ListItem.boardNumber}`);
        navigate(`/recipe/recipe-board/detail/${boardNumber}`);
    }

    //          render: Top 3 List Item 컴포넌트 렌더링          //
    return (
        <div>
            <div className='general-recipe-top-3-list-item' onClick={onClickHandler}>
                <div className='general-recipe-top-3-list-item-image-box'>
                    {boardTitleImage ? (
                        <img className='general-recipe-top-3-list-item-image' src={`${boardTitleImage}`} alt={'none-image'} />
                    ) :
                        (
                            <div className='general-recipe-top-3-list-item-none-image' style={{ backgroundImage: `url(${grayimage})` }}>
                                <div className='general-recipe-top-3-list-item-none-image-description'>{'이미지가 등록되지 않은 게시물입니다.'}</div>
                            </div>
                        )}
                </div>
                <div className='general-recipe-top-3-list-item-main-box'>
                    <div className='general-recipe-top-3-list-item-top'>
                        <div className='general-recipe-top-3-list-item-profile-box'>
                            <div className='general-recipe-top-3-list-item-profile-image' style={{ backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})` }}></div>
                        </div>
                        <div className='general-recipe-top-3-list-item-write-box'>
                            <div className='general-recipe-top-3-list-item-nickname'>{writerNickname}</div>
                            <div className='general-recipe-top-3-list-item-write-date'>{writeDatetime}</div>
                        </div>
                    </div>
                    <div className='general-recipe-top-3-list-item-info'>
                        <div className='general-recipe-top-3-list-item-title'>{'제목: '}{title}</div>
                        <div className='general-recipe-top-3-list-item-content'>{'요리설명: '}{content}</div>
                        <div className='general-recipe-top-3-list-item-cooking-time'>{'소요시간: '}{cookingTime}{'분'}</div>
                    </div>
                    <div className='general-recipe-top-3-list-item-bottom'>
                        <div className='general-recipe-top-3-list-item-counts'>
                            {`댓글 ${commentCount} ∙ 좋아요 ${favoriteCount} ∙ 조회수 ${viewCount}`}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
