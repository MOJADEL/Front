import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import RecipeFavoriteItem from 'components/RecipeFavoriteItem';
import { RecipeCommentListItem, RecipeFavoriteListItem } from 'types/interface';
import RecipeCommentItem from 'components/RecipeCommentItem';
import Pagination from 'components/Pagination';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import { useBoardStore, useBoardTypeStore, useLoginUserStore } from 'stores';
import { useNavigate, useParams } from 'react-router-dom';
import { RECIPE_PATH, RECIPE_UPDATE_PATH, USER_PATH } from 'constant';
import Recipe from 'types/interface/recipe.interface';
import {
  deleteRecipeRequest, getRecipeRequest, getCommentRecipeListRequest, increaseViewCountRecipeRequest, postRecipeCommentRequest,
  putRecipeFavoriteRequest, getFavoriteRecipeListRequest
} from 'apis';
import GetRecipeResponseDto from 'apis/response/recipe/get-recipe.response.dto';
import { ResponseDto } from 'apis/response';
import { DeleteRecipeResponseDto, GetRecipeCommentListResponseDto, GetRecipeFavoriteListResponseDto, IncreaseViewCountRecipeResponseDto, PostRecipeCommentResponseDto, PutRecipeFavoriteResponseDto } from 'apis/response/recipe';
import dayjs from 'dayjs';
import { useCookies } from 'react-cookie';
import { PostRecipeCommentRequestDto } from 'apis/request/recipe';
import { usePagination } from 'hooks';
//          component: 게시물 상세 화면 컴포넌트          //
export default function RecipeDetail() {

  //          state: 게시물 번호 path variable 상태          //
  // const { recipeBoardNumber } = useParams<{ recipeBoardNumber: string }>();
  const { recipeBoardNumber } = useParams();
  //          state: 로그인 유저 상태          //
  const { loginUser } = useLoginUserStore();
  //          state: 쿠키 상태          //
  const [cookies, setCookies] = useCookies();
  const { boardType, setBoardType } = useBoardTypeStore();

  //          function: 네비게이트 함수          //
  const navigate = useNavigate();


  //          function: increase View Count Response 처리 함수          //
  const increaseViewCountRecipeResponse = (responseBody: IncreaseViewCountRecipeResponseDto | ResponseDto | null) => {
    if (!responseBody) return null;
    const { code } = responseBody;
    if (code === 'NB') alert('존재하지 않는 게시물입니다.');
    if (code === 'DBE') alert('데이터베이스 오류입니다.');
  }


  //          component: 게시물 상세 상단 컴포넌트          //
  const RecipeDetailTop = () => {

    //          state: 작성자 여부 상태          //
    const [isWriter, setWriter] = useState<Boolean>(false);
    //          state: more 버튼 상태          //
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    //          state: more 버튼 상태          //
    const [showMore, setShowMore] = useState<boolean>(false);

    //          function: 작성일 포멧 변경 함수          //
    const getWriteDateTimeFormat = () => {
      if (!recipe) return null;
      const date = dayjs(recipe.writeDatetime);
      return date.format('YYYY. MM. DD.');
    }
    //          function: get Recipe Response 처리 함수          //
    const getRecipeResponse = (responseBody: GetRecipeResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') {
        navigate(RECIPE_PATH());
        return;
      }
      const recipe: Recipe = { ...responseBody as GetRecipeResponseDto }
      setRecipe(recipe);

      if (!loginUser) {
        setWriter(false);
        return;
      }
      const isWriter = loginUser.email === recipe.writerEmail;
      setWriter(isWriter);
    }

    //          function: deleteRecipe Response 처리 함수          //
    const deleteRecipeResponse = (responseBody: DeleteRecipeResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'VF') alert('잘못된 접근입니다.');
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'AF') alert('인증에 실패했습니다.');
      if (code === 'NP') alert('권한이 없습니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      navigate(RECIPE_PATH());
    }


    //          event handler: 닉네임 클릭 이벤트 처리          //
    const onNicknameClickHandler = () => {
      if (!recipe) return;
      navigate(USER_PATH(recipe.writerEmail));
    }

    //          event handler: more 버튼 클릭 이벤트 처리          //
    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);
    }

    //          event handler: 수정 버튼 클릭 이벤트 처리          //
    const onUpdateButtonClickHandler = () => {
      if (!recipe || !loginUser) return;
      if (loginUser.email !== recipe.writerEmail) return;
      navigate(`/recipe/recipe-board/update/${recipe.boardNumber}`);
    }

    //          event handler: 삭제 버튼 클릭 이벤트 처리          //
    const onDeleteButtonClickHandler = () => {
      if (!recipeBoardNumber || !recipe || !loginUser || !cookies.accessToken) return;
      if (loginUser.email !== recipe.writerEmail) return;
      deleteRecipeRequest(recipeBoardNumber, cookies.accessToken).then(deleteRecipeResponse);
    }
    //          effect: 게시물 번호 path variable 바뀔때마다 게시물 불러오기          //
    useEffect(() => {
      if (!recipeBoardNumber) {
        navigate(RECIPE_PATH());
        return;
      }
      getRecipeRequest(recipeBoardNumber).then(getRecipeResponse);
    }, [recipeBoardNumber]);

    //          render: 게시물 상세 상단 컴포넌트 렌더링          //
    if (!recipe) return <></>
    return (
      <div id='board-detail-top'>
        <div className='board-detail-top-header'>
          <div className='board-detail-title'>{recipe.title}</div>
          <div className='board-detail-top-sub-box'>
            <div className='board-detail-write-info-box'>
              <div className='board-detail-writer-profile-image' style={{ backgroundImage: `url(${recipe.writerProfileImage ? recipe.writerProfileImage : defaultProfileImage})` }}></div>
              <div className='board-detail-writer-nickname' onClick={onNicknameClickHandler}>{recipe.writerNickname}</div>
              <div className='board-detail-info-divider'>{'\|'}</div>
              <div className='board-detail-write-date'>{getWriteDateTimeFormat()}</div>
            </div>
            {isWriter &&
              <div className='icon-button' onClick={onMoreButtonClickHandler}>
                <div className='icon more-icon'></div>
              </div>
            }
            {showMore &&
              <div className='board-detail-more-box'>
                <div className='board-detail-update-button' onClick={onUpdateButtonClickHandler}>{'수정'}</div>
                <div className='divider'></div>
                <div className='board-detail-delete-button' onClick={onDeleteButtonClickHandler}>{'삭제'}</div>
              </div>}
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-detail-top-main'>
          {recipe.boardImageList.length ?
            <>
              {recipe.boardImageList.map(image => <img className='board-detail-main-image' src={image} />)}
              <div className='board-detail-main-text'>{recipe.content}</div>
            </>
            :
            <>
              <div className='board-detail-top-main full-screen'>
                <div className='board-detail-cooking-time'>
                  <strong>총 조리 시간: </strong>{recipe.cookingTime}분
                </div>
                <div className='board-detail-main-text'>{recipe.content}</div>
              </div>
            </>
          }
          <div className='board-detail-top-main-step'>
            {[...Array(8)].map((_, index) => {
              const stepContent = recipe[`step${index + 1}_content` as keyof Recipe];
              const stepImage = recipe[`step${index + 1}_image` as keyof Recipe];

              if (stepContent || stepImage) {
                return (
                  <div key={index} className='recipe-detail-step'>
                    <div className='recipe-detail-step-number'>{'Step'}{index + 1}</div>
                    <div className='recipe-detail-step-content'>
                      {stepContent && <p>{stepContent}</p>}
                    </div>
                    {stepImage && <img src={stepImage as string} alt={`Step ${index + 1}`} className='recipe-detail-step-image' />}
                  </div>
                );
              }
              return null;
            })}

          </div>
        </div>
      </div>
    )
  }

  //          component: 게시물 상세 하단 컴포넌트          //
  const RecipeDetailBottom = () => {

    //          state: 댓글 TextArea 참조 상태          //
    const recipecommentRef = useRef<HTMLTextAreaElement | null>(null);

    //          state: 페이지네이션 관련 상태          //
    const { currentPage, setCurrentPage, currentSection,
      setCurrentSection, viewList, viewPageList,
      totalSection, setTotalList } = usePagination<RecipeCommentListItem>(5);

    //          state: 좋아요 리스트 상태          //
    const [favoriteList, setFavoriteList] = useState<RecipeFavoriteListItem[]>([]);

    //          state: 좋아요 상태          //
    const [isFavorite, setFavorite] = useState<Boolean>(false);
    //          state: 좋아요 박스 보기 상태          //
    const [showFavorite, setShowFavorite] = useState<Boolean>(false);
    //          state: 전체 댓글 개수 상태          //
    const [totalCommentCount, setTotalCommentCount] = useState<number>(0);
    //          state: 댓글 상태          //
    const [comment, setComment] = useState<string>('');
    //          state: 댓글 박스 보기 상태          //
    const [showComment, setShowComment] = useState<Boolean>(false);

    //          function: get Comment List Response 처리 함수          //
    const getRecipeCommentListResponse = (responseBody: GetRecipeCommentListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { commentList } = responseBody as GetRecipeCommentListResponseDto;
      setTotalList(commentList);
      setTotalCommentCount(commentList.length);
    }

    //          function: get Recipe Favorite List Response 처리 함수          //
    const getRecipeFavoriteListResponse = (responseBody: GetRecipeFavoriteListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { favoriteList } = responseBody as GetRecipeFavoriteListResponseDto;
      setFavoriteList(favoriteList);

      if (!loginUser) {
        setFavorite(false);
        return;
      }

      const isFavorite = favoriteList.findIndex(favorite => favorite.email === loginUser.email) !== -1;
      setFavorite(isFavorite);
    }

    //          function: put Favorite Response 처리 함수          //
    const putRecipeFavoriteResponse = (responseBody: PutRecipeFavoriteResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'VF') alert('잘못된 접근입니다.');
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'AF') alert('사용자 인증에 실패했습니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;
      if (!recipeBoardNumber) return;
      // setFavorite(prevState => !prevState);

      getFavoriteRecipeListRequest(recipeBoardNumber).then(getRecipeFavoriteListResponse);
    }

    //          function: post Comment Response 처리 함수          //
    const postRecipeCommentResponse = (responseBody: PostRecipeCommentResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'VF') alert('잘못된 접근입니다.');
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'AF') alert('사용자 인증에 실패했습니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      setComment('');

      if (!recipeBoardNumber) return;
      getCommentRecipeListRequest(recipeBoardNumber).then(getRecipeCommentListResponse);
    }

    //          event handler: 좋아요 클릭 이벤트 처리          //
    const onFavoriteClickHandler = () => {
      if (!loginUser || !recipeBoardNumber || !cookies.accessToken) return;
      putRecipeFavoriteRequest(recipeBoardNumber, cookies.accessToken).then(putRecipeFavoriteResponse);
    }
    //          event handler: 좋아요 박스 보기 이벤트 처리          //
    const onShowFavoriteBoxClickHandler = () => {
      setShowFavorite(!showFavorite);
    }
    //          event handler: 댓글 박스 보기 이벤트 처리          //
    const onShowCommentBoxClickHandler = () => {
      setShowComment(!showComment);
    }
    //          event handler: 댓글 작성 버튼 클릭 이벤트 처리          //
    const onCommentSubmitButtonClickHandler = () => {
      if (!comment || !recipeBoardNumber || !loginUser || !cookies.accessToken) return;
      const requestBody: PostRecipeCommentRequestDto = { content: comment };
      postRecipeCommentRequest(recipeBoardNumber, requestBody, cookies.accessToken).then(postRecipeCommentResponse);
    }
    //          event handler: 댓글 변경 이벤트 처리          //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setComment(value);
      if (!recipecommentRef.current) return;
      recipecommentRef.current.style.height = 'auto';
      recipecommentRef.current.style.height = `${recipecommentRef.current.scrollHeight}px`;
    }
    //          effect: 게시물 번호 path variable이 바뀔때마다 좋아요 및 댓글 리스트 불러오기          //
    useEffect(() => {
      if (!recipeBoardNumber) return;
      getFavoriteRecipeListRequest(recipeBoardNumber).then(getRecipeFavoriteListResponse);
      getCommentRecipeListRequest(recipeBoardNumber).then(getRecipeCommentListResponse);
    }, [recipeBoardNumber]);

    //          render: 게시물 상세 하단 컴포넌트 렌더링          //
    return (
      <div id='board-detail-bottom'>
        <div className='board-detail-bottom-button-box'>
          <div className='board-detail-bottom-button-group'>
            <div className='icon-button' onClick={onFavoriteClickHandler}>
              {isFavorite ?
                <div className='icon favorite-fill-icon'></div> :
                <div className='icon favorite-light-icon'></div>
              }
            </div>
            <div className='board-detail-bottom-button-text'>{`좋아요 ${favoriteList.length}`}</div>
            <div className='icon-button' onClick={onShowFavoriteBoxClickHandler}>
              {showFavorite ?
                <div className='icon up-light-icon'></div> :
                <div className='icon down-light-icon'></div>
              }
            </div>
          </div>
          <div className='board-detail-bottom-button-group'>
            <div className='icon-button'>
              <div className='icon comment-icon'></div>
            </div>
            <div className='board-detail-bottom-button-text'>{`댓글 ${totalCommentCount}`}</div>
            <div className='icon-button' onClick={onShowCommentBoxClickHandler}>
              {showComment ?
                <div className='icon up-light-icon'></div> :
                <div className='icon down-light-icon'></div>
              }
            </div>
          </div>
        </div>
        {showFavorite &&
          <div className='board-detail-bottom-favorite-box'>
            <div className='board-detail-bottom-favorite-container'>
              <div className='board-detail-bottom-favorite-title'>{'좋아요 '}<span className='emphasis'>{favoriteList.length}</span></div>
              <div className='board-detail-bottom-favorite-content'>
                {favoriteList.map(item => <RecipeFavoriteItem recipefavoriteListItem={item} />)}
              </div>
            </div>
          </div>
        }
        {showComment &&
          <div className='board-detail-bottom-comment-box'>
            <div className='board-detail-bottom-comment-container'>
              <div className='board-detail-bottom-comment-title'>{'댓글 '}<span className='emphasis'>{totalCommentCount}</span></div>
              <div className='board-detail-bottom-comment-list-container'>
                {viewList.map(item => <RecipeCommentItem recipecommentListItem={item} />)}
              </div>
            </div>
            <div className='divider'></div>
            <div className='board-detail-bottom-comment-pagination-box'>
              <Pagination currentPage={currentPage} currentSection={currentSection} setCurrentPage={setCurrentPage} setCurrentSection={setCurrentSection} viewPageList={viewPageList} totalSection={totalSection} />
            </div>
            {loginUser !== null &&
              <div className='board-detail-bottom-comment-input-box'>
                <div className='board-detail-bottom-comment-input-container'>
                  <textarea ref={recipecommentRef} className='board-detail-bottom-comment-textarea' placeholder='댓글을 작성해주세요.' value={comment} onChange={onCommentChangeHandler} />
                  <div className='board-detail-bottom-comment-button-box'>
                    <div className={comment === '' ? 'disable-button' : 'black-button'} onClick={onCommentSubmitButtonClickHandler}>{'댓글달기'}</div>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    )
  }

  //          effect: 게시물 번호 path variable이 바뀔때마다 게시물 조회수 증가          //
  let effectFlag = true;
  useEffect(() => {
    if (!recipeBoardNumber) return;

    if (effectFlag) {
      effectFlag = false;
      return;
    }
    increaseViewCountRecipeRequest(recipeBoardNumber).then(increaseViewCountRecipeResponse);
    console.log('RECIPE PATH', RECIPE_PATH())
  }, [recipeBoardNumber])

  //          render: 게시물 상세 화면 컴포넌트 렌더링          //
  return (
    <div id='board-detail-wrapper'>
      <div className='board-detail-container'>
        <RecipeDetailTop />
        <RecipeDetailBottom />
      </div>
    </div>
  )
}
