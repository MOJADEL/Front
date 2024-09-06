import { TradeListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetSearchTradeListResponseDto extends ResponseDto{
    searchList: TradeListItem[];
}