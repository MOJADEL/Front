import React from 'react'
import './style.css';
import { TradeListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import { TRADE_BOARD_DETAIL_PATH, TRADE_BOARD_PATH, TRADE_PATH } from 'constant';

interface Props {
    tradeListItem: TradeListItem
}
//          component : trade List Item 컴포넌트          //
export default function TradeItem({ tradeListItem }: Props) {

    //          properties          // 
    const { boardNumber, title, content, boardTitleImage } = tradeListItem;
    const { price, tradeLocation } = tradeListItem;
    const { favoriteCount, commentCount, viewCount } = tradeListItem;
    const { writeDatetime, writerNickname, writerProfileImage } = tradeListItem;

    //          function: 네비게이트 함수          // 
    const navigate = useNavigate();

    //          event handler: 게시물 아이템 클릭 이벤트 처리 함수          // 
    const onClickHandler = () => {
        navigate(`/trade/trade-board/detail/${boardNumber}`);
    };

    //          function: 가격을 한국식으로 포맷팅하는 함수          //
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ko-KR').format(price) + '원';
    }
    //          render : trade List Item 컴포넌트 렌더링         //
    return (
        <div className='trade-list-item' onClick={onClickHandler}>
            <div className='trade-list-item-main-box'>
                <div className='trade-list-item-top'>
                    <div className='trade-list-item-profile-box'>
                        <div className='trade-list-item-profile-image' style={{ backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})` }}></div>
                    </div>
                    <div className='trade-list-item-write-box'>
                        <div className='trade-list-item-nickname'>{writerNickname}</div>
                        <div className='trade-list-item-write-date'>{writeDatetime}</div>
                    </div>
                </div>
                <div className='trade-list-item-location-box'>
                    <div className='trade-item-location'>{'거래장소 : '}{tradeLocation}</div>
                </div>
                <div className='trade-list-item-price'>
                    {'가격 :'}{formatPrice(price)}
                </div>
                <div className='trade-list-item-middle'>
                    <div className='trade-list-item-title'>{title}</div>
                    <div className='trade-list-item-content'>
                        {content}
                    </div>
                </div>

                <div className='trade-list-item-bottom'>
                    <div className='trade-list-item-counts'>
                        {`댓글 ${commentCount} ∙ 좋아요 ${favoriteCount} ∙ 조회수 ${viewCount}`}
                    </div>
                </div>
            </div>
            {boardTitleImage !== null && (
                <div className='trade-list-item-image-box'>
                    <div className='trade-list-item-image' style={{ backgroundImage: `url(${boardTitleImage})` }}></div>
                </div>
            )}
        </div>
    )
}
