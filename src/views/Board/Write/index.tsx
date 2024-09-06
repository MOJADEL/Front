import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import { useBoardStore, useLoginUserStore, useBoardTypeStore, useRecipeTypeStore } from 'stores';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { fileUploadRequest } from 'apis';

//          component: 게시물 작성 화면 컴포넌트          //
export default function BoardWrite() {

  //          state: 제목 영역 요소 참조 상태          //
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 본문 영역 요소 참조 상태          //
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 이미지 입력 요소 참조 상태          //
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const tradeLocationRef = useRef<HTMLTextAreaElement | null>(null);
  const cookingTimeRef = useRef<HTMLInputElement | null>(null);

  //          state: 게시물 상태          //
  const { title, setTitle } = useBoardStore();
  const { content, setContent } = useBoardStore();
  const { boardImageFileList, setBoardImageFileList } = useBoardStore();
  const { resetBoard } = useBoardStore();
  //          state: 중고거래 가격 상태          //
  const { price, setPrice } = useBoardStore();
  const { tradeLocation, setTradeLocation } = useBoardStore();
  //          state: board type 상태          //
  const { boardType, setBoardType } = useBoardTypeStore();

  //          state: 쿠키 상태          //
  const [cookies, setCookies] = useCookies();

  //          state: 로그인 유저 상태          //
  const { loginUser } = useLoginUserStore();

  const { recipeType, setRecipeType } = useRecipeTypeStore();

  //          state: 게시물 이미지 미리보기 URL 상태          //
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  //          state: 레시피 요리 시간 상태          //
  const { cookingTime, setCookingTime } = useBoardStore();

  //          state: 레시피 Step 카운트 상태          //
  const [stepCount, setStepCount] = useState<number>(1);

  //          state: 레시피 Step 상태          //
  const {
    step1_content, setStep1Content,
    step1_image, setStep1Image,
    step2_content, setStep2Content,
    step2_image, setStep2Image,
    step3_content, setStep3Content,
    step3_image, setStep3Image,
    step4_content, setStep4Content,
    step4_image, setStep4Image,
    step5_content, setStep5Content,
    step5_image, setStep5Image,
    step6_content, setStep6Content,
    step6_image, setStep6Image,
    step7_content, setStep7Content,
    step7_image, setStep7Image,
    step8_content, setStep8Content,
    step8_image, setStep8Image
  } = useBoardStore();

  const stepContentList = [
    { content: step1_content, setContent: setStep1Content, image: step1_image, setImage: setStep1Image },
    { content: step2_content, setContent: setStep2Content, image: step2_image, setImage: setStep2Image },
    { content: step3_content, setContent: setStep3Content, image: step3_image, setImage: setStep3Image },
    { content: step4_content, setContent: setStep4Content, image: step4_image, setImage: setStep4Image },
    { content: step5_content, setContent: setStep5Content, image: step5_image, setImage: setStep5Image },
    { content: step6_content, setContent: setStep6Content, image: step6_image, setImage: setStep6Image },
    { content: step7_content, setContent: setStep7Content, image: step7_image, setImage: setStep7Image },
    { content: step8_content, setContent: setStep8Content, image: step8_image, setImage: setStep8Image },
  ];

  //          function: 네비게이트 함수          //
  const navigate = useNavigate();

  //          event handler: 레시피 타입 변경 이벤트 처리          //
  const handleRecipeTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedType = Number(event.target.value); // Convert the value to a number
    console.log("Selected Recipe Type: ", selectedType); // Debugging log for the selected type
    setRecipeType(selectedType); // Set the state with the new type
  };

  //          event handler: 제목 변경 이벤트 처리          //
  const onTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTitle(value);

    if (!titleRef.current) return;
    titleRef.current.style.height = 'auto';
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`
  }

  //          event handler: 내용 변경 이벤트 처리          //
  const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setContent(value);

    if (!contentRef.current) return;
    contentRef.current.style.height = 'auto';
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  }
  //          event handler: 요리 시간 변경 이벤트 처리          //
  const onCookingTimeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numericValue = value === '' ? 0 : Number(value);
    if (!isNaN(numericValue)) {
      console.log('Cooking time:', numericValue); // 디버깅용 로그 추가
      setCookingTime(numericValue);
    }
  };

  //          event handler: 가격 변경 이벤트 처리          //
  const onPriceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numericValue = value === '' ? 0 : Number(value);
    if (!isNaN(numericValue)) {
      setPrice(numericValue);
    }

    if (!priceRef.current) return;
    priceRef.current.style.height = 'auto';
    priceRef.current.style.height = `${priceRef.current.scrollHeight}px`;
  };
  //          event handler: 거래 장소 변경 이벤트 처리          //
  const onTradeLocationChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTradeLocation(value);

    if (!tradeLocationRef.current) return;
    tradeLocationRef.current.style.height = 'auto';
    tradeLocationRef.current.style.height = `${tradeLocationRef.current.scrollHeight}px`;
  }


  //          event handler: 이미지 변경 이벤트 처리          //

  const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;
    const files = Array.from(event.target.files); // Convert FileList to array

    const newImageUrls = [...imageUrls];
    const newBoardImageFileList = [...boardImageFileList];

    files.forEach((file) => {
      const imageUrl = URL.createObjectURL(file);
      newImageUrls.push(imageUrl);
      newBoardImageFileList.push(file);
    });

    setImageUrls(newImageUrls);
    setBoardImageFileList(newBoardImageFileList);
  };

  //          event handler: 이미지 업로드 버튼 클릭 이벤트 처리          //
  const onImageUploadButtonClickHandler = () => {
    if (!imageInputRef.current) return;
    imageInputRef.current.click();
  }

  //          event handler: 이미지 닫기 버튼 클릭 이벤트 처리          //
  const onImageCloseButtonClickHandler = (deleteindex: number) => {
    if (!imageInputRef.current) return;
    imageInputRef.current.value = '';

    const newImageUrls = imageUrls.filter((url, index) => index !== deleteindex);
    setImageUrls(newImageUrls);

    const newBoardImageFileList = boardImageFileList.filter((url, index) => index !== deleteindex);
    setBoardImageFileList(newBoardImageFileList);

    if (!imageInputRef.current) return;
    imageInputRef.current.value = '';
  }
  //          event handler: board type 클릭 이벤트 처리          //
  const onBoardTypeChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as 'community' | 'recipe' | 'trade';
    if (value === 'community' || value === 'recipe' || value === 'trade') {
      setBoardType(value);
      setPrice(0); // board type 변경 시 가격을 초기화
    }
  };

  // Event handler: 스텝 내용 변경 이벤트 처리
  const onStepContentChange = (index: number, event: ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value;
    stepContentList[index].setContent(content);
  };

  // Event handler: 스텝 이미지 변경 이벤트 처리
  // const onStepImageChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
  //   if (!event.target.files || !event.target.files.length) return;
  //   const file = event.target.files[0];
  //   const imageUrl = URL.createObjectURL(file);

  //   stepContentList[index].setImage(imageUrl);
  // };

  const onStepImageChange = async (index: number, event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;
    const file = event.target.files[0];

    // 파일을 서버로 업로드
    const formData = new FormData();
    formData.append('file', file);

    const uploadedImageUrl = await fileUploadRequest(formData);

    if (uploadedImageUrl) {
      // 서버에서 받은 URL로 스텝 이미지 상태를 업데이트
      stepContentList[index].setImage(uploadedImageUrl);
    }
  };

  // Event handler: 스텝 추가 버튼 클릭 이벤트 처리
  const onAddStepHandler = () => {
    setStepCount((prevCount) => Math.min(prevCount + 1, 8));
  };

  // Event handler: 스텝 삭제 버튼 클릭 이벤트 처리
  const onRemoveStepHandler = (index: number) => {
    if (stepCount > 1) {
      stepContentList[index].setContent('');
      stepContentList[index].setImage('');
      setStepCount((prevCount) => prevCount - 1);
    }
  };

  //          effect: 마운트 시 실행할 함수          //
  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      navigate(MAIN_PATH());
      return;
    }
    resetBoard();

  }, [])

  //          render: 게시물 작성 화면 컴포넌트 렌더링          //
  return (
    <div id='board-write-wrapper'>
      <div className='board-write-container'>
        <div className='board-select-box'>
          <div className="category-label">{'카테고리'}</div>
          <select className='board-select' value={boardType} onChange={onBoardTypeChangeHandler}>
            <option value="community">{'요모조모'}</option>
            <option value="recipe">{'레시피'}</option>
            <option value="trade">{'중고거래'}</option>
          </select>
        </div>
        {boardType === 'recipe' && (
          <div className="recipe-type-select-box">
            <label htmlFor="recipeType" className="recipe-type-label">
              {recipeType === 0 ? "일반레시피" : "편의점 레시피"}
            </label>
            <select
              id="recipeType"
              value={recipeType}
              onChange={handleRecipeTypeChange}
              className="recipe-type-select"
            >
              <option value={0}>일반레시피</option>
              <option value={1}>편의점 레시피</option>
            </select>
          </div>
        )}

        <div className='board-write-box'>
          <div className='board-write-title-box'>
            <textarea ref={titleRef} className='board-write-title-textarea' rows={1} placeholder='제목을 작성해주세요.' value={title} onChange={onTitleChangeHandler}
              onDragOver={(event) => event.preventDefault()} // 드래그 오버 이벤트 막기
              onDrop={(event) => event.preventDefault()} />
          </div>
          <div className='divider'></div>
          <div className='board-write-images-container'>
            {imageUrls.map((imageUrl, index) => (
              <div key={index} className='board-write-image-box'>
                <img className='board-write-image' src={imageUrl} />
                <div className='icon-button image-close' onClick={() => onImageCloseButtonClickHandler(index)}>
                  <div className='icon close-icon'></div>
                </div>
              </div>
            ))}
          </div>

          <div className='trade-price-and-location-container'>
            {boardType === 'trade' && (
              <div className='price-trade-location-wrapper'>
                <div className='price-box'>
                  <input
                    ref={priceRef}
                    type='number'
                    placeholder='₩ 거래 가격'
                    value={price === 0 ? '' : price}
                    onChange={onPriceChangeHandler}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/[^0-9]/g, '');
                    }}
                    onDragOver={(event) => event.preventDefault()} // 드래그 오버 이벤트 막기
                    onDrop={(event) => event.preventDefault()} // 드롭 이벤트 막기
                  />

                </div>
                <div className='trade-location-box'>
                  <textarea ref={tradeLocationRef} placeholder='장소를 입력하세요' value={tradeLocation} onChange={onTradeLocationChangeHandler} onDragOver={(event) => event.preventDefault()} // 드래그 오버 이벤트 막기
                    onDrop={(event) => event.preventDefault()} // 드롭 이벤트 막기
                  />
                </div>
              </div>
            )}
          </div>
          {/* <div className='board-write-content-box'>
            <textarea
              ref={contentRef}
              className='board-write-content-textarea'
              placeholder={
                boardType === 'trade'
                  ? '- 상품명(브랜드)\n- 구매 시기\n- 사용 기간\n- 하자 여부\n\n* 실제 촬영한 사진과 함께 상세 정보를 입력해주세요\n\n* 카카오톡 아이디 첨부 시 게시물 삭제 및 이용제재 처리될 수 있어요.\n안전하고 건전한 거래환경을 위해 과학기술정보통신부, 한국인터넷진흥원, HowSe가 함께합니다.'
                  : boardType === 'community'
                    ? '내 주변 자취러들과 꿀팁을 공유해요.\n\n게시글 내용을 작성해주세요\n'
                    : '레시피 게시글 내용을 작성해주세요.'
              }
              value={content}
              onChange={onContentChangeHandler}
              onDragOver={(event) => event.preventDefault()} // 드래그 오버 이벤트 막기
              onDrop={(event) => event.preventDefault()} // 드롭 이벤트 막기
            />

            <div className='icon-button' onClick={onImageUploadButtonClickHandler}>
              <div className='icon image-box-light-icon'></div>
            </div>
            <input ref={imageInputRef} type='file' accept='image/*' style={{ display: 'none' }} multiple onChange={onImageChangeHandler} />
          </div> */}
          <div className={`board-write-content-box ${boardType === 'recipe' ? 'recipe-layout' : ''}`}>
            {boardType === 'recipe' ? (
              <>
                <div className='recipe-content-container'>
                  <div className="cooking-time-container">
                    <input
                      ref={cookingTimeRef}
                      type="number"
                      className="cooking-time-input"
                      placeholder="요리 시간을 입력하세요"
                      value={cookingTime}
                      onChange={onCookingTimeChangeHandler}
                      min={0}  // 0 이상의 값만 입력 가능
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) => event.preventDefault()}
                    />
                    <span className="cooking-time-unit">분</span>
                  </div>
                  <textarea
                    ref={contentRef}
                    className='recipe-content-textarea'
                    placeholder='요리 설명을 작성해주세요'
                    value={content}
                    onChange={onContentChangeHandler}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => event.preventDefault()}
                  />
                  <div className='icon-button' onClick={onImageUploadButtonClickHandler}>
                    <div className='icon image-box-light-icon'></div>
                  </div>
                  <input ref={imageInputRef} type='file' accept='image/*' style={{ display: 'none' }} multiple onChange={onImageChangeHandler} />
                </div>
                <div className='recipe-steps-container'>
                  {[...Array(stepCount)].map((_, index) => (
                    <div key={index} className='recipe-step'>
                      <textarea
                        placeholder={`Step ${index + 1} 내용을 입력하세요`}
                        value={stepContentList[index].content || ''}
                        onChange={(e) => onStepContentChange(index, e)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={(event) => event.preventDefault()}
                      />
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(e) => onStepImageChange(index, e)}
                      />
                      {stepContentList[index].image && (
                        <div className='recipe-step-image-preview'>
                          <img src={stepContentList[index].image || ''} alt={`Step ${index + 1}`} />
                        </div>
                      )}
                      <button
                        className='remove-step-button'
                        onClick={() => onRemoveStepHandler(index)}
                        disabled={stepCount <= 1}
                      >
                        스텝 삭제
                      </button>
                    </div>
                  ))}
                  {stepCount < 8 && (
                    <button className='add-step-button' onClick={onAddStepHandler}>
                      스텝 추가
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className='board-write-content-box'>
                <textarea
                  ref={contentRef}
                  className='board-write-content-textarea'
                  placeholder={
                    boardType === 'trade'
                      ? '- 상품명(브랜드)\n- 구매 시기\n- 사용 기간\n- 하자 여부\n\n* 실제 촬영한 사진과 함께 상세 정보를 입력해주세요\n\n* 카카오톡 아이디 첨부 시 게시물 삭제 및 이용제재 처리될 수 있어요.\n안전하고 건전한 거래환경을 위해 과학기술정보통신부, 한국인터넷진흥원, HowSe가 함께합니다.'
                      : '게시글 내용을 작성해주세요.'
                  }
                  value={content}
                  onChange={onContentChangeHandler}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => event.preventDefault()}
                />
                <div className='icon-button' onClick={onImageUploadButtonClickHandler}>
                  <div className='icon image-box-light-icon'></div>
                </div>
                <input
                  ref={imageInputRef}
                  type='file'
                  accept='image/*'
                  style={{ display: 'none' }}
                  multiple
                  onChange={onImageChangeHandler}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
