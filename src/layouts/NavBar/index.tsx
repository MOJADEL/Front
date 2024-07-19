import React from 'react';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { BOARD_DETAIL_PATH, BOARD_PATH, MAIN_PATH, RECIPE_PATH, TRADE_PATH } from 'constant';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로가 요모조모, 레시피 페이지인지 확인
  const isCommunityPage = location.pathname === MAIN_PATH();
  const isRecipePage = location.pathname === RECIPE_PATH();
  const isTradePage = location.pathname === TRADE_PATH();
  const isBoardDetailPage = location.pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(''));
  const isRecipeDetailPage = location.pathname.startsWith(RECIPE_PATH()) && location.pathname.includes('detail');
  const isTradeDetailPage = location.pathname.startsWith(TRADE_PATH()) && location.pathname.includes('detail');
  const handleCommunityClick = () => {
    navigate(MAIN_PATH());
  };
  const handleRecipeClick = () => {
    navigate(RECIPE_PATH());
  };
  const handleTradeClick = () => {
    navigate(TRADE_PATH());
  };
  //  const handleBoardDetailClick = () => {
  //   navigate(());
  // };
  return (
    <div className='navbar-wrapper'>
      <div className='navbar-container'>
        {/* 요모조모 페이지인 경우 클래스 추가 */}
        <div className={`community ${isCommunityPage || isBoardDetailPage ? 'active' : ''}`} onClick={handleCommunityClick}>
          {'요모조모'}
        </div>
        {/* 레시피 페이지인 경우 클래스 추가 */}
        <div className={`recipe ${isRecipePage || isRecipeDetailPage ? 'active' : ''}`} onClick={handleRecipeClick}>{'레시피'}</div>
        <div className={`recipe ${isTradePage || isTradeDetailPage ? 'active' : ''}`} onClick={handleTradeClick}>{'중고거래'}</div>
        <div className='group-buy'>{'공동구매'}</div>
      </div>
    </div>
  );
}
