import { AUTH_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, ONBOARD_PATH, RECIPE_BOARD_DETAIL_PATH, RECIPE_BOARD_PATH, RECIPE_PATH, RECIPE_UPDATE_PATH } from 'constant';
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import Navbar from 'layouts/NavBar';
import path from 'path';
import { Outlet, useLocation } from 'react-router-dom'

//          component: 레이아웃          //
export default function Container() {

  //          state: 현재 페이지 path name 상태          //
  const { pathname } = useLocation();

  //          render: 레이아웃 렌더링          //
  return (
    <>
      {pathname !== ONBOARD_PATH() &&
        <Header />
      }
      {pathname !== AUTH_PATH() &&
      pathname !== ONBOARD_PATH() &&
        pathname !== (BOARD_PATH() + '/' + BOARD_WRITE_PATH()) &&
        !pathname.includes('update') && < Navbar />}
      {/* 인증 페이지와 글 작성 페이지, 글 수정 페이지가 아닌 경우에만 NavBar 렌더링 */}
      <Outlet />

      {/* <MapContainer/> */}
      {pathname !== AUTH_PATH() && pathname !== ONBOARD_PATH() && <Footer />}
    </>
  )
}
