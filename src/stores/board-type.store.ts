import { create } from 'zustand';

interface BoardTypeState {
  boardType: 'community' | 'recipe' | 'trade';
  setBoardType: (boardType: 'community' | 'recipe' | 'trade') => void;
}

const useBoardTypeStore = create<BoardTypeState>((set) => ({
  boardType: 'community',
  setBoardType: (boardType) => set({ boardType }),
}));

export default useBoardTypeStore;
