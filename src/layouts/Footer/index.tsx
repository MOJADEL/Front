import React from 'react'
import './style.css';

//          component: Footer Layout          //
export default function Footer() {

    //          event handler: 인스타 아이콘 버튼 클릭 이벤트 처리          //
    const onInstaIconButtonClickHandler = () => {
        window.open('https://www.instagram.com');
    }
    
    //          event handler: 네이버 아이콘 버튼 클릭 이벤트 처리          //
    const onNGitHubIconButtonClickHandler = () => {
        window.open('https://github.com/kgccm');
    }

    //          render: Footer Layout 렌더링          //
    return (
        <div id='footer'>
            <div className='footer-container'>
                <div className='footer-top'>
                    <div className='footer-logo-box'>
                        <div className='icon-box'>
                            <div className='icon logo-cap-icon'></div>
                        </div>
                        <div className='footer-logo-text'>{'(주) 모자들'}</div>
                    </div>
                    <div className='footer-link-box'>
                        <div className='footer-email-link'>{'990720wlgns@naver.com'}</div>
                        <div className='icon-button' onClick={onInstaIconButtonClickHandler}>
                            <div className='icon insta-icon'></div>
                        </div>
                        <div className='icon-button' onClick={onNGitHubIconButtonClickHandler}>
                            <div className='icon github-icon' ></div>
                        </div>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <div className='footer-copyright'>{'Copyright © 2024 kgccm. All Rights Reserved.'}</div>
                </div>
            </div>
        </div>
    )
}
