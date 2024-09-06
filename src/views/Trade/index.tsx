import React, { useEffect, useState } from 'react';
import './style.css';
import TradeTop3Item from 'components/TradeTop3Item';
import { TradeListItem } from 'types/interface';
import TradeItem from 'components/TradeItem';
import Pagination from 'components/Pagination';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PATH } from 'constant';
import { getLatestTradeListRequest, getTop3TradeListRequest, } from 'apis';
import { GetLatestTradeListResponseDto, GetTop3TradeListResponseDto } from 'apis/response/trade';
import { ResponseDto } from 'apis/response';
import { usePagination } from 'hooks';
//          component: 레시피 화면 컴포넌트          //
export default function Trade() {

  //          function: 내비게이트 함수          //
  const navigate = useNavigate();

  //          component: 메인 화면 상단 컴포넌트          //
  const TradeTop = () => {

    //          state: 주간 Top3 레시피 리스트 상태          //
    const [top3tradeList, setTop3tradeList] = useState<TradeListItem[]>([]);

    //          function: get Top3 trade List Response 처리 함수          //
    const getTop3TradeListResponse = (responseBody: GetTop3TradeListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;

      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { tradetop3List } = responseBody as GetTop3TradeListResponseDto;
      setTop3tradeList(tradetop3List);
    }


    //          effect: 첫 마운트 시 실행될 함수          //
    useEffect(() => {
      getTop3TradeListRequest().then(getTop3TradeListResponse);
    }, []);



    //          render: 메인 화면 상단 컴포넌트 렌더링          //
    return (
      <div id='trade-top-wrapper'>
        <div className='trade-top-container'>
          <div className='trade-top-title'>
            {'💰 이웃간의 중고거래는 \n How?Se에서!'}
          </div>
          <div className='trade-top-content-box'>
            <div className='trade-top-contents-title'>{'주간 Top 3 물품📦'}</div>
            <div className='trade-top-contents'>
              {top3tradeList.map(tradetop3ListItem => <TradeTop3Item tradeTop3ListItem={tradetop3ListItem} />)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  //          component: 메인 화면 하단 컴포넌트          //
  const TradeBottom = () => {

    //          state: 페이지네이션 관련 상태          //
    const {
      currentPage, currentSection, viewList, viewPageList, totalSection,
      setCurrentSection, setCurrentPage, setTotalList
    } = usePagination<TradeListItem>(9);

    //          function : get Latest Board List Response 처리 함수          //
    const getLatestTradeListResponse = (responseBody: GetLatestTradeListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { tradelatestList } = responseBody as GetLatestTradeListResponseDto;
      setTotalList(tradelatestList);
    }

    //          effect: 첫 마운트 시 실행될 함수          //
    useEffect(() => {
      getLatestTradeListRequest().then(getLatestTradeListResponse);
    }, []);

    //          render: 메인 화면 하단 컴포넌트 렌더링          //
    return (
      <div id='trade-bottom-wrapper'>
        <div className='trade-bottom-container'>
          <div className='trade-bottom-title'>{'최신 등록 물품'}</div>
          <div className='trade-bottom-contents-box'>
            <div className='trade-bottom-current-contents'>
              {viewList.map(tradeListItem => <TradeItem tradeListItem={tradeListItem} />)}
            </div>
          </div>
          <div className='trade-bottom-pagination-box'>
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
      <TradeTop />
      <TradeBottom />
    </>
  );
}
