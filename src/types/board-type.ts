import { BoardListItem, RecipeListItem,  TradeListItem } from "./interface";

export type BoardType = 'community' | 'recipe' | 'trade';
export type ListItem = BoardListItem | RecipeListItem | TradeListItem;