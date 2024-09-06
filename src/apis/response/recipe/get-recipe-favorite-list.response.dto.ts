import { RecipeFavoriteListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetRecipeFavoriteListResponseDto extends ResponseDto {
    favoriteList : RecipeFavoriteListItem[]
}