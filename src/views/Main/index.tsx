import React, { useEffect, useState } from 'react';
import './style.css';
import Top3Item from 'components/Top3Item';
import { BoardListItem } from 'types/interface';
import BoardItem from 'components/BoardItem';
import Pagination from 'components/Pagination';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PATH } from 'constant';
import { getLatestBoardListRequest, getPopularListRequest, getTop3BoardListRequest } from 'apis';
import { GetLatestBoardListResponseDto, GetTop3BoardListResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { usePagination } from 'hooks';
import { GetPopularListResponseDto } from 'apis/response/search';

//          component: 메인 화면 컴포넌트          //
export default function Main() {

  //          function: 내비게이트 함수          //
  const navigate = useNavigate();

  //          component: 메인 화면 상단 컴포넌트          //
  const MainTop = () => {

    //          state: 주간 Top3 게시물 리스트 상태          //
    const [top3BoardList, setTop3BoardList] = useState<BoardListItem[]>([]);

    //          function: get Top3 Board List Response 처리 함수          //
    const getTop3BoardListResponse = (responseBody: GetTop3BoardListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;

      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { top3List } = responseBody as GetTop3BoardListResponseDto;
      setTop3BoardList(top3List);
    }


    //          effect: 첫 마운트 시 실행될 함수          //
    useEffect(() => {
      getTop3BoardListRequest().then(getTop3BoardListResponse);
    }, []);



    //          render: 메인 화면 상단 컴포넌트 렌더링          //
    return (
      <div id='main-top-wrapper'>
        <div className='main-top-container'>
          <div className='main-top-title'>
            {'👥 자취러들의 노하우를 \n How?Se에서!'}
          </div>
          <div className='main-top-content-box'>
            <div className='main-top-contents-title'>{'주간 Top 3 게시물💬'}</div>
            <div className='main-top-contents'>
              {top3BoardList.map(top3ListItem => <Top3Item top3ListItem={top3ListItem} />)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  //          component: 메인 화면 하단 컴포넌트          //
  const MainBottom = () => {

    //          state: 페이지네이션 관련 상태          //
    const {
      currentPage, currentSection, viewList, viewPageList, totalSection,
      setCurrentSection, setCurrentPage, setTotalList
    } = usePagination<BoardListItem>(5);
    //          state: 인기 검색어 리스트 상태          //
    const [popularWordList, setPopularWordList] = useState<string[]>([]);

    //          event handler: 인기 검색어 클릭 이벤트 처리          //
    const onPopularWordClickHandler = (word: string) => {
      navigate(SEARCH_PATH(word));
    }

    //          function : get Latest Board List Response 처리 함수          //
    const getLatestBoardListResponse = (responseBody: GetLatestBoardListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { latestList } = responseBody as GetLatestBoardListResponseDto;
      setTotalList(latestList);
    }

    //          function: get Popular List Response 처리 함수          //
    const getPopularListResponse = (responseBody: GetPopularListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { popularWordList } = responseBody as GetPopularListResponseDto;
      setPopularWordList(popularWordList);
    };


    //          effect: 첫 마운트 시 실행될 함수          //
    useEffect(() => {
      getLatestBoardListRequest().then(getLatestBoardListResponse);
      getPopularListRequest().then(getPopularListResponse);
    }, []);

    //          render: 메인 화면 하단 컴포넌트 렌더링          //
    return (
      <div id='main-bottom-wrapper'>
        <div className='main-bottom-container'>
          <div className='main-bottom-title'>{'최신 게시물'}</div>
          <div className='main-bottom-contents-box'>
            <div className='main-bottom-current-contents'>
              {viewList.map(boardListItem => <BoardItem boardListItem={boardListItem} />)}

            </div>
            <div className='main-bottom-popular-box'>
              <div className='main-bottom-popular-card'>
                <div className='main-bottom-popular-card-container'>
                  <div className='main-bottom-popular-card-title'>{'인기 검색어'}</div>
                  <div className='main-bottom-popular-card-contents'>
                    {popularWordList.map(word => <div className='word-badge' onClick={() => onPopularWordClickHandler(word)}>{word}</div>)}

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='main-bottom-pagination-box'>
            <Pagination
              currentPage={currentPage}
              currentSection={currentSection}
              setCurrentPage={setCurrentPage}
              setCurrentSection={setCurrentSection}
              viewPageList={viewPageList}
              totalSection={totalSection} />
          </div>
        </div>
      </div>
    )
  };

  //          render: 메인 화면 컴포넌트 렌더링          //
  return (
    <>
      <MainTop />
      <MainBottom />
    </>
  );
}
