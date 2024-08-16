import React, { useEffect, useState } from 'react';
import './style.css';
import { usePagination } from 'hooks';
interface Place {
    id: string;
    place_name: string;
    x: string;
    y: string;
    address_name: string;
    road_address_name?: string;
    [key: string]: any; // 다른 필드도 있을 수 있으므로
}

export default function NEARBY() {
    const [map, setMap] = useState<any>(null);
    const [places, setPlaces] = useState<any[]>([]);
    const [activeInfowindow, setActiveInfowindow] = useState<any>(null);
    const [currentLatLng, setCurrentLatLng] = useState<{ lat: number, lng: number } | null>(null);
    const [keyword, setKeyword] = useState<string>(''); // 검색 키워드
    const [categoryCode, setCategoryCode] = useState<string>(''); // 현재 선택된 카테고리 코드

    const {
        currentPage,
        setCurrentPage,
        currentSection,
        setCurrentSection,
        viewList,
        viewPageList,
        totalSection,
        setTotalList,
    } = usePagination<any>(8); // 페이지당 8개의 아이템

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setCurrentLatLng({ lat, lng });
                    initializeMap(lat, lng);
                    searchCategoryPlaces(lat, lng, 'CE7'); // 기본적으로 카페 카테고리 검색
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    initializeMap(37.5665, 126.9780); // 기본 위치
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            initializeMap(37.5665, 126.9780); // 기본 위치
        }
    }, []);

    const initializeMap = (lat: number, lng: number) => {
        const container = document.getElementById('map');
        const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 5,
        };

        const mapInstance = new window.kakao.maps.Map(container, options);
        setMap(mapInstance);

        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: mapInstance,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
            content: createInfoWindowContent('📍 현재 위치', '지금 이곳에 계세요!'),
            removable: true, // 닫기 버튼 추가
        });

        infowindow.open(mapInstance, marker);
        setActiveInfowindow(infowindow);
    };

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchKeywordPlaces();
        }
    };

    const searchKeywordPlaces = () => {
        if (!map || !currentLatLng) return;

        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(keyword, (data: any[], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
                setPlaces(data);
                setTotalList(data);
                displayMarkers(data.slice(0, 8)); // 처음 8개의 장소만 표시
            }
        }, {
            location: new window.kakao.maps.LatLng(currentLatLng.lat, currentLatLng.lng),
            radius: 500, // 500m 반경 내 검색
        });
    };

    const searchCategoryPlaces = (lat: number, lng: number, categoryGroupCode: string) => {
        if (!map) return;

        setCategoryCode(categoryGroupCode); // 현재 선택된 카테고리 코드 업데이트

        const ps = new window.kakao.maps.services.Places();

        const callback = (data: any[], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
                setPlaces(data);
                setTotalList(data);
                displayMarkers(data.slice(0, 8)); // 처음 8개의 장소만 표시
            }
        };

        ps.categorySearch(categoryGroupCode, callback, {
            location: new window.kakao.maps.LatLng(lat, lng),
            radius: 500, //500m 반경 내 검색
        });
    };

    const displayMarkers = (places: any[]) => {
        // 기존 마커 및 인포윈도우 제거
        if (map.markers) {
            map.markers.forEach((marker: any) => marker.setMap(null));
        }
        if (activeInfowindow) {
            activeInfowindow.close();
        }

        const bounds = new window.kakao.maps.LatLngBounds();

        places.forEach((place: any) => {
            const position = new window.kakao.maps.LatLng(place.y, place.x);
            const marker = new window.kakao.maps.Marker({
                position: position,
                map: map,
            });

            const infowindow = new window.kakao.maps.InfoWindow({
                content: createInfoWindowContent(place.place_name, place.road_address_name || place.address_name),
                removable: true,
            });

            window.kakao.maps.event.addListener(marker, 'click', () => {
                if (activeInfowindow) {
                    activeInfowindow.close();
                }
                infowindow.open(map, marker);
                setActiveInfowindow(infowindow);
            });

            bounds.extend(position);
        });

        map.setBounds(bounds);
    };

    const createInfoWindowContent = (title: string, subtitle: string) => {
        return `
            <div class="infowindow-content">
                <div class="infowindow-title">${title}</div>
                <div class="infowindow-subtitle">${subtitle}</div>
            </div>
        `;
    };

    const handleGoToCurrentLocation = () => {
        if (currentLatLng) {
            const { lat, lng } = currentLatLng;
            initializeMap(lat, lng);
            if (categoryCode) {
                searchCategoryPlaces(lat, lng, categoryCode);
            } else {
                searchKeywordPlaces();
            }
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            displayMarkers(viewList);
        }
    };

    const goToNextPage = () => {
        const lastPage = Math.ceil(places.length / 8);
        if (currentPage < lastPage) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            displayMarkers(viewList);
        }
    };

    return (
        <div id='nearby-wrapper'>
            <div className='nearby-container'>
                <div className="map-container">
                    <button onClick={handleGoToCurrentLocation} className="go-to-current-location">내 위치</button>
                    <div id="map" />
                </div>
                <div className="search-container">
                    <div className='nearby-title'>
                        {'🛒내주변 맛집을 \n How?Se에서!'}
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            value={keyword}
                            onChange={handleKeywordChange}
                            onKeyDown={handleKeyPress}
                            placeholder="장소를 입력하세요"
                        />
                        <button onClick={searchKeywordPlaces}>검색</button>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <button onClick={() => searchCategoryPlaces(map.getCenter().getLat(), map.getCenter().getLng(), 'CE7')}>
                            카페 검색
                        </button>
                        <button onClick={() => searchCategoryPlaces(map.getCenter().getLat(), map.getCenter().getLng(), 'FD6')}>
                            음식점 검색
                        </button>
                    </div>
                    <div id="result-list" className="result-list">
                        <ul>
                            {viewList.map((place) => (
                                <li key={place.id} onClick={() => displayMarkers([place])}>
                                    {place.place_name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="pagination">
                        <button onClick={goToPrevPage} disabled={currentPage === 1}>이전</button>
                        <button onClick={goToNextPage} disabled={currentPage === viewPageList.length}>다음</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
