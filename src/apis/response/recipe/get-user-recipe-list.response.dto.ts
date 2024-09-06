import { RecipeListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetUserRecipeListResponseDto extends ResponseDto {
    userBoardList: RecipeListItem[];
}