export default interface PatchTradeRequestDto {
    title: string;
    content: string;
    boardImageList: string[];
    tradeLocation : string | null;
    price : number;
    // boardType: string; 
}