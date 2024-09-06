import React from 'react'
import { RecipeFavoriteListItem } from 'types/interface'
import defaultProfileImage from 'assets/image/default-profile-image.png'
import './style.css';

interface Props{
    recipefavoriteListItem : RecipeFavoriteListItem;
}


//          component: Recipe Favorite List Item 컴포넌트          //
export default function RecipeFavoriteItem({recipefavoriteListItem}: Props) {

    //          properties: Favorite List Item 렌더링          //
    const {profileImage, nickname} = recipefavoriteListItem;
    //          render: Favorite List Item 렌더링          //
  return (
    <div className='recipe-favorite-list-item'>
        <div className='recipe-favorite-list-item-profile-box'>
            <div className='recipe-favorite-list-item-profile-image' style={{backgroundImage:`url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
        </div>
        <div className='recipe-favorite-list-item-nickname'>{nickname}</div>
    </div>
  )
}
