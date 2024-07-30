import { RecipeListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetTop3RecipeListResponseDto extends ResponseDto {
    recipetop3List: RecipeListItem[ ];
}