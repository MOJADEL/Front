import React, { useEffect, useState } from 'react';
import './style.css';
import { RecipeListItem } from 'types/interface';
import RecipeItem from 'components/RecipeItem';
import Pagination from 'components/Pagination';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PATH } from 'constant';
import { getLatestRecipeListRequest, getTop3ConvenienceRecipeListRequest, getTop3GeneralRecipeListRequest } from 'apis';
import { GetLatestRecipeListResponseDto, GetTop3ConvenienceRecipeListResponseDto, GetTop3GeneralRecipeListResponseDto } from 'apis/response/recipe';
import { ResponseDto } from 'apis/response';
import { usePagination } from 'hooks';
import GeneralRecipeTop3Item from 'components/GeneralRecipeTop3Item';
import ConvenienceRecipeTop3Item from 'components/ConvenienceRecipeTop3Item';
//          component: 레시피 화면 컴포넌트          //
export default function Recipe() {

  //          function: 내비게이트 함수          //
  const navigate = useNavigate();
  //          component: 메인 화면 상단 컴포넌트          //
  const RecipeTop = () => {

    //          state: 주간 Top3 레시피 리스트 상태          //
    const [generalTop3recipeList, setGeneralTop3recipeList] = useState<RecipeListItem[]>([]);
    const [convenienceTop3recipeList, setConvenienceTop3recipeList] = useState<RecipeListItem[]>([]);
    //          function: get Top5 General recipe List Response 처리 함수          //
    const getTop3GeneralRecipeListResponse = (responseBody: GetTop3GeneralRecipeListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;

      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { generalrecipetop3List } = responseBody as GetTop3GeneralRecipeListResponseDto;
      console.log(generalrecipetop3List)
      setGeneralTop3recipeList(generalrecipetop3List);
    }

    //          function: get Top5 General recipe List Response 처리 함수          //
    const getTop3ConvenienceRecipeListResponse = (responseBody: GetTop3ConvenienceRecipeListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;

      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { conveniencerecipetop3List } = responseBody as GetTop3ConvenienceRecipeListResponseDto;
      console.log(conveniencerecipetop3List)
      setConvenienceTop3recipeList(conveniencerecipetop3List);
    }

    //          effect: 첫 마운트 시 실행될 함수          //
    useEffect(() => {
      getTop3GeneralRecipeListRequest(0).then(getTop3GeneralRecipeListResponse);
      getTop3ConvenienceRecipeListRequest(1).then(getTop3ConvenienceRecipeListResponse)
    }, []);



    //          render: 메인 화면 상단 컴포넌트 렌더링          //
    return (
      <div id='recipe-top-wrapper'>
        <div className='recipe-top-container'>
          <div className='recipe-top-title'>
            {'🍳 나만의 레시피를 \n How?Se에서!'}
          </div>
          <div className='recipe-section-general'>
            <div className='recipe-section-title'>{'주간 Top 3 일반 레시피📜'}</div>
            <div className='recipe-items'>
              {generalTop3recipeList.map(generalrecipetop3List => <GeneralRecipeTop3Item generalrecipetop3List={generalrecipetop3List} />)}
            </div>
          </div>
          <div className='recipe-section-conveinence'>
            <div className='recipe-section-title'>{'주간 Top 3 편의점 레시피📜'}</div>
            <div className='recipe-items'>
              {convenienceTop3recipeList.map(conveniencerecipetop3List => <ConvenienceRecipeTop3Item conveniencerecipetop3List={conveniencerecipetop3List} />)}
            </div>
          </div>

        </div>
      </div>
    );
  };

  //          component: 메인 화면 하단 컴포넌트          //
  const RecipeBottom = ({ recipeType }: { recipeType: 0 | 1 }) => {

    //          state: 페이지네이션 관련 상태          //
    const {
      currentPage, currentSection, viewList, viewPageList, totalSection,
      setCurrentSection, setCurrentPage, setTotalList
    } = usePagination<RecipeListItem>(9);

    //          function : get Latest Board List Response 처리 함수          //
    const getLatestRecipeListResponse = (responseBody: GetLatestRecipeListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { recipelatestList } = responseBody as GetLatestRecipeListResponseDto;
      setTotalList(recipelatestList);
      console.log(recipelatestList);
    }

    //          effect: 첫 마운트 시 실행될 함수          //
    useEffect(() => {
      getLatestRecipeListRequest(recipeType).then(getLatestRecipeListResponse);
    }, [recipeType]);

    const titleText = recipeType === 0 ? '최신 일반 레시피' : '최신 편의점 레시피';

    //          render: 메인 화면 하단 컴포넌트 렌더링          //
    return (
      <div id='recipe-bottom-wrapper'>
        <div className='recipe-bottom-container'>
          <div className='recipe-bottom-title'>{titleText}</div>
          <div className="recipe-bottom-selector">
            <button className={recipeType === 0 ? 'selected' : ''} onClick={() => setRecipeType(0)}>{'일반레시피'}</button>
            <button className={recipeType === 1 ? 'selected' : ''} onClick={() => setRecipeType(1)}>{'편의점레시피'}</button>
          </div>
          <div className='recipe-bottom-contents-box'>
            <div className='recipe-bottom-current-contents'>
              {viewList.map(recipeListItem => <RecipeItem recipeListItem={recipeListItem} />)}
            </div>
          </div>
          <div className='recipe-bottom-pagination-box'>
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
  const [recipeType, setRecipeType] = useState<0 | 1>(0);

  //          render: 메인 화면 컴포넌트 렌더링          //
  return (
    <>
      <RecipeTop />
      <RecipeBottom recipeType={recipeType} />
    </>
  );
}
