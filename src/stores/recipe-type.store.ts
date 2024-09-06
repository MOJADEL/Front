import { create } from 'zustand';

interface RecipeTypeState {
  recipeType: number; // 0 for Normal Recipe, 1 for Convenience Store Recipe
  setRecipeType: (recipeType: number) => void;
}

const useRecipeTypeStore = create<RecipeTypeState>((set) => ({
  recipeType: 0, // Default to Normal Recipe
  setRecipeType: (recipeType) => set({ recipeType }),
}));

export default useRecipeTypeStore;
