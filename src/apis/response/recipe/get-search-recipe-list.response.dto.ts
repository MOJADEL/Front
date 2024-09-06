import { RecipeListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetSearchRecipeListResponseDto extends ResponseDto{
    searchList: RecipeListItem[];
}