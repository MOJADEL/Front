import axios from 'axios';
import { ResponseDto } from "./response";
import { SignInRequestDto, SignUpRequestDto } from './request/auth';
import { SignInResponseDto, SignUpResponseDto } from './response/auth';
import { GetSignInUserResponseDto, GetUserResponseDto, PatchNicknameResponseDto, PatchProfileImageResponseDto } from './response/user';
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from './request/board';
import { PostBoardResponseDto, GetBoardResponseDto, IncreaseViewCountResponseDto, GetFavoriteListResponseDto, GetCommentListResponseDto, PutFavoriteResponseDto, PostCommentResponseDto, DeleteBoardResponseDto, PatchBoardResponseDto, GetLatestBoardListResponseDto, GetTop3BoardListResponseDto, GetSearchBoardListResponseDto, GetUserBoardListResponseDto } from './response/board';
import { GetPopularListResponseDto, GetRelationListResponseDto } from './response/search';
import { PatchNicknameRequestDto, PatchProfileImageRequestDto } from './request/user';
import { DeleteRecipeResponseDto, GetLatestRecipeListResponseDto, GetRecipeCommentListResponseDto, GetRecipeFavoriteListResponseDto, GetRecipeResponseDto, GetSearchRecipeListResponseDto, GetTop3GeneralRecipeListResponseDto, GetTop3ConvenienceRecipeListResponseDto, GetUserRecipeListResponseDto, IncreaseViewCountRecipeResponseDto, PatchRecipeResponseDto, PostRecipeCommentResponseDto, PostRecipeResponseDto, PutRecipeFavoriteResponseDto } from './response/recipe';
import { DeleteTradeResponseDto, GetLatestTradeListResponseDto, GetSearchTradeListResponseDto, GetTop3TradeListResponseDto, GetTradeCommentListResponseDto, GetTradeFavoriteListResponseDto, GetTradeResponseDto, GetUserTradeListResponseDto, IncreaseViewCountTradeResponseDto, PatchTradeResponseDto, PostTradeCommentResponseDto, PostTradeResponseDto, PutTradeFavoriteResponseDto } from './response/trade';
import { PatchRecipeRequestDto, PostRecipeCommentRequestDto, PostRecipeRequestDto } from './request/recipe';
import { PatchTradeRequestDto } from './request/trade';

const DOMAIN = 'http://localhost:4000';

const API_DOMAIN = `${DOMAIN}/api/v1`;

const authorization = (accessToken: string) => {
    return { headers: { Authorization: `Bearer ${accessToken}` } }
};

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(response => {
            const responseBody: SignInResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then(response => {
            const responseBody: SignUpResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

const GET_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/community/board/${boardNumber}`;

const GET_LATEST_BOARD_LIST_URL = () => `${API_DOMAIN}/community/board/latest-list`;
const GET_TOP_3_BOARD_LIST_URL = () => `${API_DOMAIN}/community/board/top-3`;
const GET_SEARCH_BOARD_LIST_URL = (searchWord: string, preSearchWord: string | null) => `${API_DOMAIN}/community/board/search-list/${searchWord}${preSearchWord ? '/' + preSearchWord : ''}`;
const GET_USER_BOARD_LIST_URL = (email: string) => `${API_DOMAIN}/community/board/user-board-list/${email}`;
const POST_BOARD_URL = () => `${API_DOMAIN}/community/board`;
const INCREASE_VIEW_COUNT_URL = (boardNumber: number | string) => `${API_DOMAIN}/community/board/${boardNumber}/increase-view-count`;
const GET_FAVORITE_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/community/board/${boardNumber}/favorite-list`;
const GET_COMMENT_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/community/board/${boardNumber}/comment-list`;
const POST_COMMENT_URL = (boardNumber: number | string) => `${API_DOMAIN}/community/board/${boardNumber}/comment`;
const PATCH_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/community/board/${boardNumber}`;
const PUT_FAVORITE_URL = (boardNumber: number | string) => `${API_DOMAIN}/community/board/${boardNumber}/favorite`;
const DELETE_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/community/board/${boardNumber}`;

export const getBoardRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_BOARD_URL(boardNumber))
        .then(response => {
            const responseBody: GetBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const getLatestBoardListRequest = async () => {
    const result = await axios.get(GET_LATEST_BOARD_LIST_URL())
        .then(response => {
            const responseBody: GetLatestBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const getTop3BoardListRequest = async () => {
    const result = await axios.get(GET_TOP_3_BOARD_LIST_URL())
        .then(response => {
            const responseBody: GetTop3BoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const getSearchBoardListRequest = async (searchWord: string, preSearchWord: string | null) => {
    const result = await axios.get(GET_SEARCH_BOARD_LIST_URL(searchWord, preSearchWord))
        .then(response => {
            const responseBody: GetSearchBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const getUserBoardListRequest = async (email: string) => {
    const result = await axios.get(GET_USER_BOARD_LIST_URL(email))
        .then(response => {
            const responseBody: GetUserBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}


export const increaseViewCountRequest = async (boardNumber: number | string) => {
    const result = await axios.get(INCREASE_VIEW_COUNT_URL(boardNumber))
        .then(response => {
            const responseBody: IncreaseViewCountResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const getFavoriteListRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_FAVORITE_LIST_URL(boardNumber))
        .then(response => {
            const responseBody: GetFavoriteListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody
        });
    return result;
}


export const getCommentListRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_COMMENT_LIST_URL(boardNumber))
        .then(response => {
            const responseBody: GetCommentListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody
        });
    return result;
}

export const postBoardRequest = async (requestBody: PostBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_BOARD_URL(), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PostBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const postCommentRequest = async (boardNumber: number | string, requestBody: PostCommentRequestDto, accessToken: string) => {
    const result = await axios.post(POST_COMMENT_URL(boardNumber), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PostCommentResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const patchBoardRequest = async (boardNumber: number | string, requestBody: PatchBoardRequestDto, accessToken: string) => {
    console.log('request');
    const result = await axios.patch(PATCH_BOARD_URL(boardNumber), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PatchBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}


export const putFavoriteRequest = async (boardNumber: number | string, accessToken: string) => {
    const result = await axios.put(PUT_FAVORITE_URL(boardNumber), {}, authorization(accessToken))
        .then(response => {
            const responseBody: PutFavoriteResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const deleteBoardRequest = async (boardNumber: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_BOARD_URL(boardNumber), authorization(accessToken))
        .then(response => {
            const responseBody: DeleteBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

//          state: recipe end point          //
const GET_RECIPE_URL = (recipeBoardNumber: number | string) => `${API_DOMAIN}/recipe/recipe-board/${recipeBoardNumber}`;
const GET_SEARCH_RECIPE_BOARD_LIST_URL = (searchWord: string, preSearchWord: string | null) => `${API_DOMAIN}/recipe/recipe-board/search-list/${searchWord}${preSearchWord ? '/' + preSearchWord : ''}`;
const GET_LATEST_RECIPE_LIST_URL = (type: number) => `${API_DOMAIN}/recipe/recipe-board/latest-list/${type}`;

const GET_TOP_3_GENERAL_RECIPE_LIST_URL = (type: number) => `${API_DOMAIN}/recipe/recipe-board/${type}/top-3`;
const GET_TOP_3_CONVENIENCE_RECIPE_LIST_URL = (type: number) => `${API_DOMAIN}/recipe/recipe-board/${type}/top-3`

const GET_USER_RECIPE_LIST_URL = (email: string) => `${API_DOMAIN}/recipe/recipe-board/user-board-list/${email}`;
const POST_RECIPE_URL = () => `${API_DOMAIN}/recipe/recipe-board`;
const INCREASE_VIEW_COUNT_RECIPE_URL = (recipeBoardNumber: number | string) => `${API_DOMAIN}/recipe/recipe-board/${recipeBoardNumber}/increase-view-count`;
const GET_FAVORITE_LIST_RECIPE_URL = (recipeBoardNumber: number | string) => `${API_DOMAIN}/recipe/recipe-board/${recipeBoardNumber}/favorite-list`;
const GET_COMMENT_LIST_RECIPE_URL = (recipeBoardNumber: number | string) => `${API_DOMAIN}/recipe/recipe-board/${recipeBoardNumber}/comment-list`;
const POST_COMMENT_RECIPE_URL = (recipeBoardNumber: number | string) => `${API_DOMAIN}/recipe/recipe-board/${recipeBoardNumber}/comment`;
const PATCH_RECIPE_URL = (recipeBoardNumber: number | string) => `${API_DOMAIN}/recipe/recipe-board/${recipeBoardNumber}`;
const PUT_FAVORITE_RECIPE_URL = (recipeBoardNumber: number | string) => `${API_DOMAIN}/recipe/recipe-board/${recipeBoardNumber}/favorite`;
const DELETE_RECIPE_URL = (recipeBoardNumber: number | string) => `${API_DOMAIN}/recipe/recipe-board/${recipeBoardNumber}`;

export const getSearchRecipeListRequest = async (searchWord: string, preSearchWord: string | null) => {
    const result = await axios.get(GET_SEARCH_RECIPE_BOARD_LIST_URL(searchWord, preSearchWord))
        .then(response => {
            const responseBody: GetSearchRecipeListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const getRecipeRequest = async (recipeBoardNumber: number | string) => {
    const result = await axios.get(GET_RECIPE_URL(recipeBoardNumber))
        .then(response => {
            const responseBody: GetRecipeResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

// 최신 레시피 목록을 요청하는 함수, type 파라미터 추가
export const getLatestRecipeListRequest = async (type: number) => {
    const result = await axios.get(GET_LATEST_RECIPE_LIST_URL(type))
        .then(response => {
            const responseBody: GetLatestRecipeListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}


export const getTop3GeneralRecipeListRequest = async (type: number) => {
    const result = await axios.get(GET_TOP_3_GENERAL_RECIPE_LIST_URL(0))
        .then(response => {
            const responseBody: GetTop3GeneralRecipeListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const getTop3ConvenienceRecipeListRequest = async (type: number) => {
    const result = await axios.get(GET_TOP_3_CONVENIENCE_RECIPE_LIST_URL(1))
        .then(response => {
            const responseBody: GetTop3ConvenienceRecipeListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}
export const getUserRecipeListRequest = async (email: string) => {
    const result = await axios.get(GET_USER_RECIPE_LIST_URL(email))
        .then(response => {
            const responseBody: GetUserRecipeListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}


export const increaseViewCountRecipeRequest = async (recipeBoardNumber: number | string) => {
    const result = await axios.get(INCREASE_VIEW_COUNT_RECIPE_URL(recipeBoardNumber))
        .then(response => {
            const responseBody: IncreaseViewCountRecipeResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const getFavoriteRecipeListRequest = async (recipeBoardNumber: number | string) => {
    const result = await axios.get(GET_FAVORITE_LIST_RECIPE_URL(recipeBoardNumber))
        .then(response => {
            const responseBody: GetRecipeFavoriteListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody
        });
    return result;
}


export const getCommentRecipeListRequest = async (recipeBoardNumber: number | string) => {
    const result = await axios.get(GET_COMMENT_LIST_RECIPE_URL(recipeBoardNumber))
        .then(response => {
            const responseBody: GetRecipeCommentListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody
        });
    return result;
}


export const postRecipeRequest = async (requestBody: PostRecipeRequestDto, accessToken: string) => {
    console.log('Sending request body:', requestBody);  // 추가된 디버그 로그
    const result = await axios.post(POST_RECIPE_URL(), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PostRecipeResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const postRecipeCommentRequest = async (recipeBoardNumber: number | string, requestBody: PostRecipeCommentRequestDto, accessToken: string) => {
    const result = await axios.post(POST_COMMENT_RECIPE_URL(recipeBoardNumber), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PostRecipeCommentResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const patchRecipeRequest = async (recipeBoardNumber: number | string, requestBody: PatchRecipeRequestDto, accessToken: string) => {
    console.log('recipe update request');
    const result = await axios.patch(PATCH_RECIPE_URL(recipeBoardNumber), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PatchRecipeResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}


export const putRecipeFavoriteRequest = async (recipeBoardNumber: number | string, accessToken: string) => {
    const result = await axios.put(PUT_FAVORITE_RECIPE_URL(recipeBoardNumber), {}, authorization(accessToken))
        .then(response => {
            const responseBody: PutRecipeFavoriteResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const deleteRecipeRequest = async (recipeBoardNumber: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_RECIPE_URL(recipeBoardNumber), authorization(accessToken))
        .then(response => {
            const responseBody: DeleteRecipeResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

const GET_TRADE_URL = (tradeBoardNumber: number | string) => `${API_DOMAIN}/trade/trade-board/${tradeBoardNumber}`;
const GET_SEARCH_TRADE_BOARD_LIST_URL = (searchWord: string, preSearchWord: string | null) => `${API_DOMAIN}/trade/trade-board/search-list/${searchWord}${preSearchWord ? '/' + preSearchWord : ''}`;
const GET_LATEST_TRADE_LIST_URL = () => `${API_DOMAIN}/trade/trade-board/latest-list`;
const GET_TOP_3_TRADE_LIST_URL = () => `${API_DOMAIN}/trade/trade-board/top-3`;
const GET_USER_TRADE_LIST_URL = (email: string) => `${API_DOMAIN}/trade/trade-board/user-board-list/${email}`;
const POST_TRADE_URL = () => `${API_DOMAIN}/trade/trade-board`;
const INCREASE_VIEW_COUNT_TRADE_URL = (tradeBoardNumber: number | string) => `${API_DOMAIN}/trade/trade-board/${tradeBoardNumber}/increase-view-count`;
const GET_FAVORITE_LIST_TRADE_URL = (tradeBoardNumber: number | string) => `${API_DOMAIN}/trade/trade-board/${tradeBoardNumber}/favorite-list`;
const GET_COMMENT_LIST_TRADE_URL = (tradeBoardNumber: number | string) => `${API_DOMAIN}/trade/trade-board/${tradeBoardNumber}/comment-list`;
const POST_COMMENT_TRADE_URL = (tradeBoardNumber: number | string) => `${API_DOMAIN}/trade/trade-board/${tradeBoardNumber}/comment`;
const PATCH_TRADE_URL = (tradeBoardNumber: number | string) => `${API_DOMAIN}/trade/trade-board/${tradeBoardNumber}`;
const PUT_FAVORITE_TRADE_URL = (tradeBoardNumber: number | string) => `${API_DOMAIN}/trade/trade-board/${tradeBoardNumber}/favorite`;
const DELETE_TRADE_URL = (tradeBoardNumber: number | string) => `${API_DOMAIN}/trade/trade-board/${tradeBoardNumber}`;

export const getSearchTradeListRequest = async (searchWord: string, preSearchWord: string | null) => {
    const result = await axios.get(GET_SEARCH_TRADE_BOARD_LIST_URL(searchWord, preSearchWord))
        .then(response => {
            const responseBody: GetSearchTradeListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}


export const getTradeRequest = async (tradeBoardNumber: number | string) => {
    const result = await axios.get(GET_TRADE_URL(tradeBoardNumber))
        .then(response => {
            const responseBody: GetTradeResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const getLatestTradeListRequest = async () => {
    const result = await axios.get(GET_LATEST_TRADE_LIST_URL())
        .then(response => {
            const responseBody: GetLatestTradeListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const getTop3TradeListRequest = async () => {
    const result = await axios.get(GET_TOP_3_TRADE_LIST_URL())
        .then(response => {
            const responseBody: GetTop3TradeListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const getUserTradeListRequest = async (email: string) => {
    const result = await axios.get(GET_USER_TRADE_LIST_URL(email))
        .then(response => {
            const responseBody: GetUserTradeListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}


export const increaseViewCountTradeRequest = async (tradeBoardNumber: number | string) => {
    const result = await axios.get(INCREASE_VIEW_COUNT_TRADE_URL(tradeBoardNumber))
        .then(response => {
            const responseBody: IncreaseViewCountTradeResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const getFavoriteTradeListRequest = async (tradeBoardNumber: number | string) => {
    const result = await axios.get(GET_FAVORITE_LIST_TRADE_URL(tradeBoardNumber))
        .then(response => {
            const responseBody: GetTradeFavoriteListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody
        });
    return result;
}


export const getCommentTradeListRequest = async (tradeBoardNumber: number | string) => {
    const result = await axios.get(GET_COMMENT_LIST_TRADE_URL(tradeBoardNumber))
        .then(response => {
            const responseBody: GetTradeCommentListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody
        });
    return result;
}


export const postTradeRequest = async (requestBody: PostBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_TRADE_URL(), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PostTradeResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const postTradeCommentRequest = async (tradeBoardNumber: number | string, requestBody: PostCommentRequestDto, accessToken: string) => {
    const result = await axios.post(POST_COMMENT_TRADE_URL(tradeBoardNumber), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PostTradeCommentResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const patchTradeRequest = async (tradeBoardNumber: number | string, requestBody: PatchTradeRequestDto, accessToken: string) => {
    const result = await axios.patch(PATCH_TRADE_URL(tradeBoardNumber), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PatchTradeResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}


export const putTradeFavoriteRequest = async (tradeBoardNumber: number | string, accessToken: string) => {
    const result = await axios.put(PUT_FAVORITE_TRADE_URL(tradeBoardNumber), {}, authorization(accessToken))
        .then(response => {
            const responseBody: PutTradeFavoriteResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const deleteTradeRequest = async (tradeBoardNumber: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_TRADE_URL(tradeBoardNumber), authorization(accessToken))
        .then(response => {
            const responseBody: DeleteTradeResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}


const GET_POPULAR_LIST_URL = () => `${API_DOMAIN}/search/popular-list`;
const GET_RELATION_LIST_URL = (searchWord: string) => `${API_DOMAIN}/search/${searchWord}/relation-list`;

export const getPopularListRequest = async () => {
    const result = await axios.get(GET_POPULAR_LIST_URL())
        .then(response => {
            const responseBody: GetPopularListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const getRelationListRequest = async (searchWord: string) => {
    const result = await axios.get(GET_RELATION_LIST_URL(searchWord))
        .then(response => {
            const responseBody: GetRelationListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

const GET_USER_URL = (email: string) => `${API_DOMAIN}/user/${email}`;
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;
const PATCH_NICKNAME_URL = () => `${API_DOMAIN}/user/nickname`;
const PATCH_PROFILE_IMAGE_URL = () => `${API_DOMAIN}/user/profile-image`;


export const getUserRequest = async (email: string) => {
    const result = await axios.get(GET_USER_URL(email))
        .then(response => {
            const responseBody: GetUserResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
        .then(response => {
            const responseBody: GetSignInUserResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const patchNicknameRequest = async (requestBody: PatchNicknameRequestDto, accessToken: string) => {
    const result = await axios.patch(PATCH_NICKNAME_URL(), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PatchNicknameResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}
export const patchProfileImageRequest = async (requestBody: PatchProfileImageRequestDto, accessToken: string) => {
    const result = await axios.patch(PATCH_PROFILE_IMAGE_URL(), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PatchProfileImageResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}



const FILE_DOMAIN = `${DOMAIN}/file`;

const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

const multipartFormData = { headers: { 'Content-Type': 'multipart/form-data' } };

export const fileUploadRequest = async (data: FormData) => {
    const result = await axios.post(FILE_UPLOAD_URL(), data, multipartFormData)
        .then(response => {
            const responseBody: string = response.data;
            return responseBody;
        })
        .catch(error => {
            return null;
        })
    return result;
}

