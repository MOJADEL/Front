import { TradeFavoriteListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetTradeFavoriteListResponseDto extends ResponseDto {
    favoriteList : TradeFavoriteListItem[]
}