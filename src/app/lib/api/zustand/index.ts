import { create } from "zustand";

type State = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state: State) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

export default useStore;
