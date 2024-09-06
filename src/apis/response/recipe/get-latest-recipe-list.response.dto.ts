import { RecipeListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetLatestRecipeListResponseDto extends ResponseDto{
    recipelatestList: RecipeListItem[];
}