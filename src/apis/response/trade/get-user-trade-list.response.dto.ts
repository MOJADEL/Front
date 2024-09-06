import { TradeListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetUserTradeListResponseDto extends ResponseDto {
    userBoardList: TradeListItem[];
}