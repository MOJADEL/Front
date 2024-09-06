import React from 'react'
import { TradeFavoriteListItem } from 'types/interface'
import defaultProfileImage from 'assets/image/default-profile-image.png'
import './style.css';

interface Props{
    tradefavoriteListItem : TradeFavoriteListItem;
}


//          component: trade Favorite List Item 컴포넌트          //
export default function TradeFavoriteItem({tradefavoriteListItem}: Props) {

    //          properties: Favorite List Item 렌더링          //
    const {profileImage, nickname} = tradefavoriteListItem;
    //          render: Favorite List Item 렌더링          //
  return (
    <div className='trade-favorite-list-item'>
        <div className='trade-favorite-list-item-profile-box'>
            <div className='trade-favorite-list-item-profile-image' style={{backgroundImage:`url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
        </div>
        <div className='trade-favorite-list-item-nickname'>{nickname}</div>
    </div>
  )
}
