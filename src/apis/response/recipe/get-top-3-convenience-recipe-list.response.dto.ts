import { RecipeListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetTop3ConvenienceRecipeListResponseDto extends ResponseDto {
    conveniencerecipetop3List: RecipeListItem[ ];
}