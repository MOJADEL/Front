import { TradeListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetLatestTradeListResponseDto extends ResponseDto{
    tradelatestList: TradeListItem[];
}