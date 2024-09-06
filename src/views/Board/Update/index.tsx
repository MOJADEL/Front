import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import { useBoardStore, useLoginUserStore } from 'stores';
import { useNavigate, useParams } from 'react-router-dom';
import { BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { getBoardRequest } from 'apis';
import { GetBoardResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { convertUrlsToFile } from 'utils';

//          component: 게시물 수정 화면 컴포넌트          //
export default function BoardUpdate() {

  //          state: 제목 영역 요소 참조 상태          //
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 본문 영역 요소 참조 상태          //
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 이미지 입력 요소 참조 상태          //
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  //          state: 게시물 번호 path variable 상태          //
  const { boardNumber } = useParams();

  //          state: 게시물 상태          //
  const { title, setTitle } = useBoardStore();
  const { content, setContent } = useBoardStore();
  const { boardImageFileList, setBoardImageFileList } = useBoardStore();

  //          state: 쿠키 상태          //
  const [cookies, setCookies] = useCookies();

  //          state: 로그인 유저 상태          //
  const { loginUser } = useLoginUserStore();

  //          state: 게시물 이미지 미리보기 URL 상태          //
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  //          function: 네비게이트 함수          //
  const navigate = useNavigate();

  //          function: get Board Response 처리 함수          //
  const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'NB') alert('존재하지 않는 게시물입니다.');
    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') {
      navigate(MAIN_PATH());
      return;
    }

    const { title, content, boardImageList, writerEmail } = responseBody as GetBoardResponseDto;
    setTitle(title);
    setContent(content);
    setImageUrls(boardImageList);
    convertUrlsToFile(boardImageList).then(boardImageFileList => setBoardImageFileList(boardImageFileList));

    if (!loginUser || loginUser.email !== writerEmail) {
      navigate(MAIN_PATH());
      return;
    }
  }

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

  //          effect: 마운트 시 실행할 함수          //
  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      navigate(MAIN_PATH());
      return;
    }
    if (!boardNumber) return;
    getBoardRequest(boardNumber).then(getBoardResponse);
    console.log('BOARD PATH',  `${BOARD_PATH()}/${BOARD_UPDATE_PATH(boardNumber)}`);
  }, [boardNumber])

  //          render: 게시물 작성 화면 컴포넌트 렌더링          //
  return (
    <div id='board-update-wrapper'>
      <div className='board-update-container'>
        <div className='board-update-box'>
          <div className='board-update-title-box'>
          <label htmlFor='board-update-title-textarea' className='board-update-title-label'>{'제목:'}</label>
            <textarea ref={titleRef} className='board-update-title-textarea' rows={1} placeholder='제목을 작성해주세요.' value={title} onChange={onTitleChangeHandler} onDragOver={(event) => event.preventDefault()} // 드래그 오버 이벤트 막기
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

          <div className='board-update-content-box'>
            <textarea ref={contentRef} className='board-update-content-textarea' placeholder='내 주변 자취러들과 꿀팁을 공유해요.&#13;&#10;게시글 내용을 작성해주세요'
              value={content} onChange={onContentChangeHandler}
              onDragOver={(event) => event.preventDefault()} // 드래그 오버 이벤트 막기
              onDrop={(event) => event.preventDefault()} />
            <div className='icon-button' onClick={onImageUploadButtonClickHandler}>
              <div className='icon image-box-light-icon'></div>
            </div>
            <input ref={imageInputRef} type='file' accept='image/*' style={{ display: 'none' }} multiple onChange={onImageChangeHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}
