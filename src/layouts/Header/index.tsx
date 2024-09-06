import { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react';
import './style.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH,
  USER_PATH, RECIPE_PATH, RECIPE_BOARD_DETAIL_PATH, RECIPE_BOARD_PATH,
  TRADE_PATH, TRADE_BOARD_PATH, TRADE_BOARD_DETAIL_PATH, RECIPE_UPDATE_PATH,
  TRADE_UPDATE_PATH,
  ONBOARD_PATH,
  NEARBY_PATH
} from 'constant';
import { useCookies } from 'react-cookie';
import { useBoardStore, useLoginUserStore, useBoardTypeStore } from 'stores';
import { fileUploadRequest, patchBoardRequest, patchRecipeRequest, patchTradeRequest, postBoardRequest, postRecipeRequest, postTradeRequest } from 'apis';
import { PatchBoardRequestDto, PostBoardRequestDto } from 'apis/request/board';
import { PatchBoardResponseDto, PostBoardResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { PatchRecipeResponseDto, PostRecipeResponseDto } from 'apis/response/recipe';
import { PatchTradeResponseDto, PostTradeResponseDto } from 'apis/response/trade';
import { PatchTradeRequestDto, PostTradeRequestDto } from 'apis/request/trade';
import { Recipe } from 'types/interface';
import { PatchRecipeRequestDto, PostRecipeRequestDto } from 'apis/request/recipe';
import path from 'path';
import useRecipeTypeStore from 'stores/recipe-type.store';

//          component: 헤더 레이아웃          //
export default function Header() {

  const { boardNumber, recipeBoardNumber, tradeBoardNumber } = useParams();
  //          state: 로그인 유저 상태          //
  const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();
  //          state: path 상태          //
  const { pathname } = useLocation();
  //          state: cookie 상태          //
  const [cookies, setCookie, removeCookie] = useCookies();
  //          state: 로그인 상태          //
  const [isLogin, setLogin] = useState<boolean>(false);
  //          state: 인증 페이지 상태          //
  const [isAuthPage, setAuthPage] = useState<boolean>(false);
  //          state: 메인 페이지 상태          //
  const [isMainPage, setMainPage] = useState<boolean>(false);
  //          state: 게시물 상세 페이지 상태          //
  const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
  //          state: 게시물 작성 페이지 상태          //
  const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
  //          state: 게시물 수정 페이지 상태          //
  const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);
  //          state: 레시피 페이지 상태          //
  const [isRecipePage, setRecipePage] = useState<boolean>(false);
  //          state: 레시피 상세 페이지 상태          //
  const [isRecipeDetailPage, setRecipeDetailPage] = useState<boolean>(false);
  //          state: 레시피 수정 페이지 상태          //
  const [isRecipeUpdatePage, setRecipeUpdatePage] = useState<boolean>(false);
  //          state: 중고거래 페이지 상태          //
  const [isTradePage, setTradepage] = useState<boolean>(false);
  //          state: 중고거래 상세 페이지 상태          //
  const [isTradeDetailPage, setTradeDetailPage] = useState<boolean>(false);
  //          state: 중고거래 수정 페이지 상태          //
  const [isTradeUpdatePage, setTradeUpdatePage] = useState<boolean>(false);
  //          state: 검색 페이지 상태          //
  const [isSearchPage, setSearchPage] = useState<boolean>(false);
  //          state: 유저 페이지 상태          //
  const [isUserPage, setUserPage] = useState<boolean>(false);
  //          state: 온보딩 페이지 상태          //
  const [isOnboardPage, setOnBoardPage] = useState<boolean>(false);
  //          state: 내주변 페이지 상태          //
  const [isNearbypage, setIsNearByPage] = useState<boolean>(false);

  //          function: 네비게이트 함수          //
  const navigate = useNavigate();

  //          event Handler: 로고 클릭 이벤트 처리 함수          //
  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  }

  //          component: 검색 버튼 컴포넌트          //
  const SearchButton = () => {

    //          state: 검색 버튼 요소 참조 상태          //
    const searchButtonRef = useRef<HTMLDivElement | null>(null);
    //          state: 검색 버튼 상태          //
    const [status, setStatus] = useState<boolean>(false);
    //          state: 검색어 상태          //
    const [word, setWord] = useState<string>('');
    //          state: 검색어 path variable 상태          //
    const { searchWord } = useParams();
    //          state: 검색창 경고 메시지 상태          //
    const [warning, setWarning] = useState<boolean>(false);
    //          event handler: 검색어 변경 이벤트 처리 함수          //
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setWord(value);
    };
    //          event handler: 검색어 키 이벤트 처리 함수          //
    const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!searchButtonRef.current) return;
      searchButtonRef.current.click();
    };
    //          event handler: 검색 버튼 클림 이벤트 처리 함수          //
    const onSearchbuttonClickHandler = () => {
      if (!status) {
        setStatus(!status);
        return;
      }
      if (!word.trim()) {
        setWarning(true);
        return;
      }
      navigate(SEARCH_PATH(word));
    };

    //          effect: 검색어 path variable 변경 될 때마다 실행될 함수          //
    useEffect(() => {
      if (!searchWord) return;
      if (searchWord) {
        setWord(searchWord);
        setStatus(true);
      }
    }, [searchWord])

    if (!status)
      //          render: 검색 버튼 컴포넌트 렌더링 (클릭 false 상태)          //
      return (
        <div className='search-icon-button' onClick={onSearchbuttonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>);
    //          render: 검색 버튼 컴포넌트 렌더링 (클릭 true 상태)          //
    return (
      <div className='header-search-input-box'>
        <input className={`header-search-input ${warning ? 'error' : ''}`}
          type='text'
          placeholder={warning ? '검색어는 필수입니다.' : '검색어를 입력해주세요.'}
          value={word}
          onChange={onSearchWordChangeHandler}
          onKeyDown={onSearchWordKeyDownHandler}
        />
        <div ref={searchButtonRef} className='icon-button' onClick={onSearchbuttonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>
        {warning && <div className='warning-message'>{warning}</div>} {/* 경고 메시지 표시 */}
      </div>
    )
  };

  //          component: 마이페이지 버튼 컴포넌트          //
  const MyPageButton = () => {

    //     state: userEmail path variable 상태          //
    const { userEmail } = useParams();

    //          event handler: 마이페이지 버튼 클릭 이벤트 처리 함수          //
    const onMyPageButtonClickHandler = () => {
      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    };
    //          event handler: 로그아웃 버튼 클릭 이벤트 처리 함수          //
    const onSignOutbuttonClickHandler = () => {
      resetLoginUser();
      removeCookie('accessToken', { path: '/' });
      navigate(MAIN_PATH());
    };
    //          event handler: 로그인 버튼 클릭 이벤트 처리 함수          //
    const onSignInButtonClickHandler = () => {
      navigate(AUTH_PATH());
    };

    //          render: 로그아웃 버튼 컴포넌트 렌더링          //
    if (isLogin && userEmail === loginUser?.email)
      return <div className='white-button' onClick={onSignOutbuttonClickHandler}>{'로그아웃'}</div>;
    if (isLogin)
      //          render: 마이페이지 버튼 컴포넌트 렌더링          //
      return <div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>;
    //          render: 로그인 버튼 컴포넌트 렌더링          //
    return <div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>;
  };
  //          component: 업로드 버튼 컴포넌트          //
  const UploadButton = () => {

    //          state: 게시물 번호 path variable 상태          //
    // const { boardNumber } = useParams();
    // const {recipeBoardNumber} = useParams();
    // const {tradeBoardNumber} = useParams();
    //          state: 게시물 상태          //
    const { title, content, boardImageFileList, price, tradeLocation, resetBoard } = useBoardStore();
    const { boardType, setBoardType } = useBoardTypeStore();
    const { recipeType, setRecipeType } = useRecipeTypeStore();

    const {cookingTime, setCookingTime} = useBoardStore();
    const {
      step1_content, step1_image,
      step2_content, step2_image,
      step3_content, step3_image,
      step4_content, step4_image,
      step5_content, step5_image,
      step6_content, step6_image,
      step7_content, step7_image,
      step8_content, step8_image,
    } = useBoardStore();
    //          function: post board response 처리 함수          //
    const postBoardResponse = (responseBody: PostBoardResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터 베이스 오류입니다.');
      if (code === 'AF' || code === 'NU') navigate(AUTH_PATH());
      if (code === 'VF') alert('제목과 내용은 필수입니다.');
      if (code !== 'SU') return;

      resetBoard();
      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    }

    //          function: patch Board Response 처리 함수          //
    const patchBoardResponse = (responseBody: PatchBoardResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터 베이스 오류입니다.');
      if (code === 'AF' || code === 'NU' || code === 'NB' || code === 'NP') navigate(AUTH_PATH());
      if (code === 'VF') alert('제목과 내용은 필수입니다.');
      if (code !== 'SU') return;
      if (boardNumber) {
        navigate(`${BOARD_PATH()}/${BOARD_DETAIL_PATH(boardNumber)}`);
      }
    };
    //          function: post Recipe Board Response 처리 함수          //
    const postRecipeBoardResponse = (responseBody: PostRecipeResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터 베이스 오류입니다.');
      if (code === 'AF' || code === 'NU') navigate(AUTH_PATH());
      if (code === 'VF') alert('제목과 내용은 필수입니다.');
      if (code !== 'SU') return;

      resetBoard();
      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    }

    //          function: patch Recipe Board Response 처리 함수          //
    const patchRecipeBoardResponse = (responseBody: PatchRecipeResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터 베이스 오류입니다.');
      if (code === 'AF' || code === 'NU' || code === 'NB' || code === 'NP') navigate(AUTH_PATH());
      if (code === 'VF') alert('제목과 내용은 필수입니다.');
      if (code !== 'SU') return;
      if (recipeBoardNumber) {
        navigate(`${RECIPE_BOARD_PATH()}/${RECIPE_BOARD_DETAIL_PATH(recipeBoardNumber)}`);
      }
    };

    //          function: post Trade Board Response 처리 함수          //
    const postTradeBoardResponse = (responseBody: PostTradeResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터 베이스 오류입니다.');
      if (code === 'AF' || code === 'NU') navigate(AUTH_PATH());
      if (code === 'VF') alert('제목과 내용은 필수입니다.');
      if (code !== 'SU') return;

      resetBoard();
      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    }

    //          function: patch Trade Board Response 처리 함수          //
    const patchTradeBoardResponse = (responseBody: PatchTradeResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터 베이스 오류입니다.');
      if (code === 'AF' || code === 'NU' || code === 'NB' || code === 'NP') navigate(AUTH_PATH());
      if (code === 'VF') alert('제목과 내용은 필수입니다.');
      if (code !== 'SU') return;
      if (tradeBoardNumber) {
        navigate(`${TRADE_BOARD_PATH}/${TRADE_BOARD_DETAIL_PATH(tradeBoardNumber)}`);
      }
    };


    //          event handler: 업로드 버튼 클릭 이벤트 처리 함수          //
    const onUploadButtonClickHandler = async () => {
      const accessToken = cookies.accessToken;
      if (!accessToken) return;
      const boardImageList: string[] = [];

      // Upload files and get URLs
      for (const file of boardImageFileList) {
        const data = new FormData();
        data.append('file', file);

        const url = await fileUploadRequest(data);
        if (url) boardImageList.push(url);
      }

      // Determine if this is a creation or update operation
      const isWriterPage = pathname === BOARD_PATH() + '/' + BOARD_WRITE_PATH();
      const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(''));
      const isRecipeUpdatePage = pathname.startsWith(RECIPE_BOARD_PATH() + '/' + RECIPE_UPDATE_PATH(''))
      const isTradeUpdatePage = pathname.startsWith(TRADE_BOARD_PATH() + '/' + TRADE_UPDATE_PATH(''))

      // Handle create operations
      if (isWriterPage) {
        if (boardType === 'community') {
          console.log(boardType)
          const requestBody: PostBoardRequestDto = {
            title, content, boardImageList, boardType
          };
          postBoardRequest(requestBody, accessToken).then(postBoardResponse);
        }

        else if (boardType === 'recipe') {
          const requestBody: PostRecipeRequestDto = {
            title,
            content,
            boardImageList,
            boardType,
            type: recipeType,
            cookingTime,
            step1_content,
            step1_image,
            step2_content,
            step2_image,
            step3_content,
            step3_image,
            step4_content,
            step4_image,
            step5_content,
            step5_image,
            step6_content,
            step6_image,
            step7_content,
            step7_image,
            step8_content,
            step8_image
          };
          console.log("Final Request Body with Steps:", requestBody);
          postRecipeRequest(requestBody, accessToken).then(postRecipeBoardResponse);
        }

        else if (boardType === 'trade') {
          console.log(boardType)
          const requestBody: PostTradeRequestDto = {
            title, content, boardImageList, boardType, price, tradeLocation
          };
          postTradeRequest(requestBody, accessToken).then(postTradeBoardResponse);
        }
      }
      else if (isBoardUpdatePage) {
        if (!boardNumber) return;
        const requestBody: PatchBoardRequestDto = { title, content, boardImageList };
        patchBoardRequest(boardNumber, requestBody, accessToken).then(patchBoardResponse);
        console.log(boardNumber)
      }
      else if (isRecipeUpdatePage) {
        if (!recipeBoardNumber) return;
        const requestBody: PatchRecipeRequestDto = { title, content, boardImageList };
        patchRecipeRequest(recipeBoardNumber, requestBody, accessToken).then(patchRecipeBoardResponse);
        console.log(recipeBoardNumber)
      }
      else if (isTradeUpdatePage) {
        if (!tradeBoardNumber) return;
        const requestBody: PatchTradeRequestDto = { title, content, boardImageList, tradeLocation, price };
        console.log(tradeBoardNumber);
        patchTradeRequest(tradeBoardNumber, requestBody, accessToken).then(patchTradeBoardResponse);
      }
    }


    //          render: 업로드 버튼 컴포넌트 렌더링          //
    if (boardType === 'trade') {

      if (title && content && boardImageFileList.length > 0)
        return <div className='black-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>;
      else
        return <div className='disable-button'>{'업로드'}</div>;
    }
    if (title && content)
      return <div className='black-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>;
    //          render: 업로드 불가 버튼 컴포넌트 렌더링          //
    return <div className='disable-button'>{'업로드'}</div>;

  }


  //          effect: path가 변경될 때 마다 실행될 함수          //
  useEffect(() => {
    const isAuthPage = pathname.startsWith(AUTH_PATH());
    setAuthPage(isAuthPage);

    const isOnboardPage = pathname === ONBOARD_PATH();
    setOnBoardPage(isOnboardPage);

    const isMainPage = pathname === MAIN_PATH();
    setMainPage(isMainPage);

    const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(''));
    setBoardDetailPage(isBoardDetailPage);

    const isBoardWritePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
    setBoardWritePage(isBoardWritePage);

    const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(''));
    setBoardUpdatePage(isBoardUpdatePage);

    const isRecipePage = pathname.startsWith(RECIPE_PATH());
    setRecipePage(isRecipePage);

    const isRecipeDetailPage = pathname.startsWith(RECIPE_BOARD_PATH() + '/' + RECIPE_BOARD_DETAIL_PATH(''))
    setRecipeDetailPage(isRecipeDetailPage);

    const isRecipeUpdatePage = pathname.startsWith(RECIPE_BOARD_PATH() + '/' + RECIPE_UPDATE_PATH(''));
    setRecipeUpdatePage(isRecipeUpdatePage);

    const isTradePage = pathname.startsWith(TRADE_PATH());
    setTradepage(isTradePage);

    const isTradeDetailPage = pathname.startsWith(TRADE_BOARD_PATH() + '/' + TRADE_BOARD_DETAIL_PATH(''));
    setTradeDetailPage(isTradeDetailPage);

    const isTradeUpdatePage = pathname.startsWith(TRADE_BOARD_PATH() + '/' + TRADE_UPDATE_PATH(''))
    setTradeUpdatePage(isTradeUpdatePage);

    const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
    setSearchPage(isSearchPage);

    const isNearbypage = pathname.startsWith(NEARBY_PATH());
    setIsNearByPage(isNearbypage);

    const isUserPage = pathname.startsWith(USER_PATH(''));
    setUserPage(isUserPage);

  }, [pathname]);

  //          effect: login user가 변경될 때 마다 실행될 함수          //
  useEffect(() => {
    setLogin(loginUser !== null);

  }, [loginUser])

  //          render: 헤더 레이아웃 렌더링          //
  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-house-icon'></div>
          </div>
          <div className='header-logo'>{'How?Se'}</div>
        </div>
        <div className='header-right-box'>
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage || isUserPage || isRecipePage || isTradePage || isNearbypage) && !isOnboardPage && !isRecipeUpdatePage && !isTradeUpdatePage && <SearchButton />}
          {(isMainPage || isRecipePage || isSearchPage || isTradePage || isBoardDetailPage || isUserPage || isRecipeDetailPage || isTradeDetailPage || isNearbypage) && !isOnboardPage && !isTradeUpdatePage && !isRecipeUpdatePage && <MyPageButton />}
          {(isBoardWritePage || isBoardUpdatePage || isRecipeUpdatePage || isTradeUpdatePage) && !isOnboardPage && <UploadButton />}

        </div>
      </div>
    </div>
  )
}
