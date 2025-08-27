import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  Playerposition: [0, 0, 0],
  setPlayerPosition: (pos) => set({ Playerposition: pos }),

  TreasureFound: false,
  setTreasureFound: () => {set({ TreasureFound: true })}

}));
