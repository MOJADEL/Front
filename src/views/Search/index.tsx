import React, { useEffect, useState } from 'react'
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardListItem, RecipeListItem, TradeListItem } from 'types/interface';
import { latestBoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import { SEARCH_PATH } from 'constant';
import Pagination from 'components/Pagination';
import { getRelationListRequest, getSearchBoardListRequest, getSearchRecipeListRequest, getSearchTradeListRequest } from 'apis';
import { GetSearchBoardListResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { usePagination } from 'hooks';
import { GetRelationListResponseDto } from 'apis/response/search';
import { GetSearchRecipeListResponseDto } from 'apis/response/recipe';
import RecipeItem from 'components/RecipeItem';
import TradeItem from 'components/TradeItem';
import { GetSearchTradeListResponseDto } from 'apis/response/trade';

//          component: 검색 화면 컴포넌트          //
export default function Search() {
  const [selectedItem, setSelectedItem] = useState<'board' | 'recipe' | 'trade'>('board');
  //          state: searchWord path variable 상태          //
  const { searchWord } = useParams();
  //          state: 페이지네이션 관련 상태          //
  const {
    currentPage, currentSection, viewList, viewPageList, totalSection,
    setCurrentSection, setCurrentPage, setTotalList
  } = usePagination<BoardListItem | RecipeListItem | TradeListItem>(5);
  //          state: 이전 검색어 상태          //
  const [preSearchWord, setPreSearchWord] = useState<string | null>(null);
  //          state: 검색 게시물 개수 상태          //
  const [count, setCount] = useState<number>(0);
  //          state: 관련 검색어 리스트 상태          //
  const [relationWordList, setRelationWordList] = useState<string[]>([]);
  //          function: 네비게이트 함수          //
  const navigate = useNavigate();

  //          function: get Search Board List Response 처리 함수          //
  const getSearchBoardListResponse = (responseBody: GetSearchBoardListResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;

    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') return;

    if (!searchWord) return;
    const { searchList } = responseBody as GetSearchBoardListResponseDto;
    setTotalList(searchList);
    setCount(searchList.length);
    setPreSearchWord(searchWord);
  }

  //          function: get Search Recipe Board List Response 처리 함수          //
  const getSearchRecipeListResponse = (responseBody: GetSearchRecipeListResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;

    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') return;

    if (!searchWord) return;
    const { searchList } = responseBody as GetSearchRecipeListResponseDto;
    setTotalList(searchList);
    setCount(searchList.length);
    setPreSearchWord(searchWord);
  }

  const getSearchTradeListResponse = (responseBody: GetSearchTradeListResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;

    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') return;

    if (!searchWord) return;
    const { searchList } = responseBody as GetSearchTradeListResponseDto;
    setTotalList(searchList);
    setCount(searchList.length);
    setPreSearchWord(searchWord);
  }


  //          function: get Relation List Response처리 함수          //
  const getRelationListResponse = (responseBody: GetRelationListResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;

    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') return;

    if (!searchWord) return;
    const { relativeWordList } = responseBody as GetRelationListResponseDto;
    setRelationWordList(relativeWordList);
  }


  //          event handler: 연관 검색어 클릭 이벤트 처리          //
  const onRelationWordClickHandler = (word: string) => {
    navigate(SEARCH_PATH(word));
  }

  //          effect: search word 상태 변경 시 실행될 함수//
  useEffect(() => {
    if (!searchWord) return;
    if (selectedItem === 'board') {
      getSearchBoardListRequest(searchWord, preSearchWord).then(getSearchBoardListResponse);
    } else if (selectedItem === 'recipe') {
      getSearchRecipeListRequest(searchWord, preSearchWord).then(getSearchRecipeListResponse);
    } else if (selectedItem === 'trade') {
      getSearchTradeListRequest(searchWord, preSearchWord).then(getSearchTradeListResponse);
    }

    // Fetch relation list
    getRelationListRequest(searchWord).then(getRelationListResponse);
  }, [searchWord, selectedItem]);

  //          render: 검색 화면 컴포넌트 렌더링          //
  if (!searchWord) return (<></>)
  return (
    <div id='search-wrapper'>
      <div className='search-container'>
        <div className="user-bottom-selector">
          <button className={selectedItem === 'board' ? 'selected' : ''} onClick={() => setSelectedItem('board')}>{'요모조모'}</button>
          <button className={selectedItem === 'recipe' ? 'selected' : ''} onClick={() => setSelectedItem('recipe')}>{'레시피'}</button>
          <button className={selectedItem === 'trade' ? 'selected' : ''} onClick={() => setSelectedItem('trade')}>{'중고거래'}</button>
        </div>
        <div className='search-title-box'>
          <div className='search-title'><span className='search-title-emphasis'>{searchWord}</span>
            {' 에 대한 '}
            <span className='search-title-emphasis'>{selectedItem === 'board' ? '요모조모 ' : '레시피 '}</span>
            {'검색 결과입니다.'}
          </div>
          <div className='search-count'>{count}</div>
        </div>
        <div className='search-contents-box'>
          {count === 0 ?
            <div className='search-contents-nothing'>{'검색 결과가 없습니다.'}</div> :
            <div className='search-contents'>
            {selectedItem === 'board' && viewList.map((item) => {
              const boardListItem = item as BoardListItem;
              return <BoardItem key={boardListItem.boardNumber} boardListItem={boardListItem} />
            })}
            {selectedItem === 'recipe' && viewList.map((item) => {
              const recipeListItem = item as RecipeListItem;
              return <RecipeItem key={recipeListItem.boardNumber} recipeListItem={recipeListItem} />
            })}
            {selectedItem === 'trade' && viewList.map((item) => {
              const tradeListItem = item as TradeListItem;
              return <TradeItem key={tradeListItem.boardNumber} tradeListItem={tradeListItem} />
            })}
          </div>
          }
          <div className='search-relation-box'>
            <div className='search-relation-card'>
              <div className='search-relation-card-container'>
                <div className='search-relation-card-title'>{'관련 검색어'}</div>
                {relationWordList.length === 0 ?
                  <div className='search-relation-card-contents-nothing'>{'관련 검색어가 없습니다.'}</div> :
                  <div className='search-relation-card-contents'>
                    {relationWordList.map(word => <div className='word-badge' onClick={() => onRelationWordClickHandler(word)}>{word}</div>)}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className='search-pagination-box'>
          {count !== 0 &&
            <Pagination
              currentPage={currentPage}
              currentSection={currentSection}
              setCurrentPage={setCurrentPage}
              setCurrentSection={setCurrentSection}
              viewPageList={viewPageList}
              totalSection={totalSection}
            />}

        </div>
      </div>
    </div>
  )
}
