export default interface TradeListItem {
    boardNumber : number;
    title : string;
    content : string;
    boardTitleImage : string | null;
    favoriteCount : number;
    commentCount : number;
    viewCount : number;
    writeDatetime : string;
    tradeLocation : string | null;
    price : number;
    writerNickname : string;
    writerProfileImage : string | null;
}