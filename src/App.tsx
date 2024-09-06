import Footer from 'layouts/Footer';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import Search from 'views/Search';
import UserP from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import Recipe from 'views/Recipe';
import Container from 'layouts/Container';
import { MAIN_PATH, AUTH_PATH, SEARCH_PATH, USER_PATH, BOARD_PATH, BOARD_WRITE_PATH, BOARD_DETAIL_PATH, BOARD_UPDATE_PATH, RECIPE_PATH, RECIPE_BOARD_DETAIL_PATH, RECIPE_BOARD_PATH, TRADE_PATH, RECIPE_UPDATE_PATH, TRADE_BOARD_PATH, TRADE_BOARD_DETAIL_PATH, TRADE_UPDATE_PATH, ONBOARD_PATH, NEARBY_PATH } from 'constant';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';
import { getSignInUserRequest } from 'apis';
import { GetSignInUserResponseDto } from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { User } from 'types/interface';
import RecipeDetail from 'views/Recipes/Detail';
import Trade from 'views/Trade';
import TradeDetail from 'views/Trades/Detail';
import RecipeUpdate from 'views/Recipes/Update';
import TradeUpdate from 'views/Trades/Update';
import Onboard from 'views/Onboard';
import NEARBY from 'views/NEARBY';
declare global {
  interface Window {
    kakao: any;
  }
}
//           component: Application 컴포넌트           //
function App() {

  //          state: 로그인 유저 전역 상태          //
  const { setLoginUser, resetLoginUser } = useLoginUserStore();

  //          state: cookie 상태          //
  const [cookies, setCookie] = useCookies();

  //          function: get sign in user response 처리 함수          //
  const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'AF' || code === 'NU' || code === 'DBE') {
      resetLoginUser();
      return;
    }
    const loginUser: User = { ...responseBody as GetSignInUserResponseDto };
    setLoginUser(loginUser);
  }

  //          effect: accessToken cookie 값이 변경될 떄 마다 실행할 함수          //
  useEffect(() => {
    if (!cookies.accessToken) {
      resetLoginUser();
      return;
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  }, [cookies.accessToken]);

  //          render: Application 컴포넌트 렌더링          //
  //          description: 메인 화면 : '/community' - Main          //
  //          description: 로그인 + 회원가입 화면 : '/auth' - Authentication          //
  //          description: 검색 화면 : '/search/:searchword' - Search          //
  //          description: 유저 페이지 : '/user/:useremail' - User          //
  //          description: 게시물 상세보기 : '/board/detail/:boardNumber' - BoardDetail          //
  //          description: 게시물 작성하기 : '/board/write' - BoardWrite          //
  //          description: 게시물 수정하기 : '/board/update/:boardNumber' - BoardUpdate          //
  //          description: 레시피 게시판 화면 : '/recipe' - Recipe        //
  //          description: 레시피 게시물 상세보기 : '/recipe/recipe-board/detail/:boardNumber' - RecipeDetail          //
  return (
    <Routes>
      <Route element={<Container />}>

        <Route path={ONBOARD_PATH()} element={<Onboard />} />

        <Route path={MAIN_PATH()} element={<Main />} />

        <Route path={BOARD_PATH()}>
          <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
          <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />} />
          <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />} />
        </Route>


        <Route path={RECIPE_PATH()} element={<Recipe />} />
        <Route path={RECIPE_BOARD_PATH()}>
          <Route path={RECIPE_BOARD_DETAIL_PATH(':recipeBoardNumber')} element={<RecipeDetail />} />
          <Route path={RECIPE_UPDATE_PATH(':recipeBoardNumber')} element={<RecipeUpdate />} />
        </Route>

        <Route path={TRADE_PATH()} element={<Trade />} />
        <Route path={TRADE_BOARD_PATH()}>
          <Route path={TRADE_BOARD_DETAIL_PATH(':tradeBoardNumber')} element={<TradeDetail />} />
          <Route path={TRADE_UPDATE_PATH(':tradeBoardNumber')} element={<TradeUpdate />} />
        </Route>

        <Route path={AUTH_PATH()} element={<Authentication />} />
        <Route path={SEARCH_PATH(':searchWord')} element={<Search />} />
        <Route path={USER_PATH(':userEmail')} element={<UserP />} />
        <Route path={NEARBY_PATH()} element={<NEARBY />} />
      </Route>

    </Routes>
  );
}

export default App;