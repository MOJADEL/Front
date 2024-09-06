import { RecipeListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetTop3GeneralRecipeListResponseDto extends ResponseDto {
    generalrecipetop3List: RecipeListItem[ ];
}