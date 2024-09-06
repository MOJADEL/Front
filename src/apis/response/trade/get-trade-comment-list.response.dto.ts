import { TradeCommentListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetTradeCommentListResponseDto extends ResponseDto {
    commentList: TradeCommentListItem[];
}