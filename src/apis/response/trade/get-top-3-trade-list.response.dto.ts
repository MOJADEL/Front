import { TradeListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetTop3TradeListResponseDto extends ResponseDto {
    tradetop3List: TradeListItem[];
}