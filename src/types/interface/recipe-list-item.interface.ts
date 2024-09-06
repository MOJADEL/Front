export default interface RecipeListItem {
    boardNumber : number;
    title : string;
    content : string;
    boardTitleImage : string | null;
    favoriteCount : number;
    commentCount : number;
    viewCount : number;
    writeDatetime : string;
    writerNickname : string;
    writerProfileImage : string | null;
    type : number;
    cookingTime: number;
}