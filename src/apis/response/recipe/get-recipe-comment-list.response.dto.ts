import { RecipeCommentListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetRecipeCommentListResponseDto extends ResponseDto {
    commentList: RecipeCommentListItem[];
}