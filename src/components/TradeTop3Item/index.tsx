import React from 'react'
import './style.css';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import { TradeListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
// import { TRADE_BOARD_DETAIL_PATH, TRADE_BOARD_PATH, TRADE_PATH } from 'constant';

interface Props {
    tradeTop3ListItem: TradeListItem
}

//          Component: trade Top 3 List Item 컴포넌트          //
export default function TradeTop3Item({ tradeTop3ListItem }: Props) {

    //          properties          //
    const { boardNumber, title, content, boardTitleImage } = tradeTop3ListItem;
    const { price, tradeLocation } = tradeTop3ListItem;
    const { favoriteCount, commentCount, viewCount } = tradeTop3ListItem;
    const { writeDatetime, writerNickname, writerProfileImage } = tradeTop3ListItem;

    //          function : navigate 함수          //
    const navigate = useNavigate();

    //          event Handler: 게시물 아이템 클릭 이벤트 처리 함수          //
    const onClickHandler = () => {
        navigate(`/trade/trade-board/detail/${boardNumber}`);
    }

    //          function: 가격을 한국식으로 포맷팅하는 함수          //
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ko-KR').format(price) + '원';
    }

    //          render: Top 3 List Item 컴포넌트 렌더링          //
    return (
        <div className='trade-top-3-list-item' onClick={onClickHandler}>
            <div className='trade-top-3-list-item-image-box'>
                <img className='trade-top-3-list-item-image' src={`${boardTitleImage}`} alt={title} />
            </div>

            <div className='trade-top-3-list-item-main-box'>
                <div className='trade-top-3-list-item-top'>
                    <div className='trade-top-3-list-item-profile-box'>
                        <div className='trade-top-3-list-item-profile-image' style={{ backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})` }}></div>
                    </div>
                    <div className='trade-top-3-list-item-write-box'>
                        <div className='trade-top-3-list-item-nickname'>{writerNickname}</div>
                        <div className='trade-top-3-list-item-write-date'>{writeDatetime}</div>
                    </div>
                </div>
                <div className='trade-list-item-price-and-location-box'>
                    <div className='trade-list-item-price'>
                        {'가격 :'}{formatPrice(price)}
                    </div>
                    <div className='trade-item-location'>
                        {'거래장소 : '}{tradeLocation}
                    </div>
                </div>
            </div>
            <div className='trade-top-3-list-item-info'>
                <div className='trade-top-3-list-item-title'>{title}</div>
                <div className='trade-top-3-list-item-content'>{content}</div>
            </div>
            <div className='trade-top-3-list-item-bottom'>
                <div className='trade-top-3-list-item-counts'>
                    {`댓글 ${commentCount} ∙ 좋아요 ${favoriteCount} ∙ 조회수 ${viewCount}`}
                </div>
            </div>
        </div>

    )
}
