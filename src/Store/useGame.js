import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  //Scene
    length:100,
    width:10,
    
  // Player
  Playerposition: [0, 3, -10],
  setPlayerPosition: (pos) => set({ Playerposition: pos }),

  // Treasure
  RockCount : 10,
  TreasureFound: false,
  ChosenRockId: null, 
  setTreasureFound: () => set({ TreasureFound: true }),
  setChosenRockId: (id) => set({ ChosenRockId: id }),

  // Reset counter for remounting rocks
  resetCounter: 0,

  // Reset store only
  resetStore: () =>
    set((state) => ({
      Playerposition: [0, 3, -10],
      TreasureFound: false,
      ChosenRockId: Math.floor(Math.random() * 10),
      resetCounter: state.resetCounter + 1,
    })),
}));
