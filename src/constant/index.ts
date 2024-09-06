// 온보딩 페이지
export const ONBOARD_PATH =() => '/';

// 메인(커뮤니티 페이지)
export const MAIN_PATH = () => '/community';
// 레시피 페이지
export const RECIPE_PATH = () => '/recipe';
// 중고거래 페이지
export const TRADE_PATH = () => `/trade`;
// 내주변 맛집 페이지
export const NEARBY_PATH = () => `/nearby`;
//인증 페이지
export const AUTH_PATH = () => '/auth';
//검색
export const SEARCH_PATH = (searchWord: string) => `/search/${searchWord}`;
//마이페이지
export const USER_PATH = (userEmail: string) => `/user/${userEmail}`;
//커뮤니티 게시글 관련
export const BOARD_PATH = () => '/community/board';
export const BOARD_DETAIL_PATH = (boardNumber: string | number) => `detail/${boardNumber}`;
export const BOARD_WRITE_PATH = () => 'write';
export const BOARD_UPDATE_PATH = (boardNumber: string | number ) => `update/${boardNumber}`;

// 라우팅 오류 관계로 레시피 path 변경 

// 레시피 게시글 관련 // BOARD_PATH 와 동일한 로직
export const RECIPE_BOARD_PATH = () => '/recipe/recipe-board/';
export const RECIPE_BOARD_DETAIL_PATH = (recipeBoardNumber: string | number) => `detail/${recipeBoardNumber}`;
export const RECIPE_UPDATE_PATH = (recipeBoardNumber: string | number) => `update/${recipeBoardNumber}`;
export const RECIPE_WRITE_PATH = () => 'write';

// 중고거래 게시글 관련 // BOARD_PATH 와 동일한 로직
export const TRADE_BOARD_PATH = () => '/trade/trade-board';
export const TRADE_BOARD_DETAIL_PATH =  (tradeBoardNumber: string | number) => `detail/${tradeBoardNumber}`;
export const TRADE_UPDATE_PATH = (tradeBoardNumber: string | number) => `update/${tradeBoardNumber}`;
export const TRADE_WRITE_PATH = () => 'write';

// 내주변 맛집 페이지 관련 //