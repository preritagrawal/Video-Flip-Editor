import { create } from 'zustand';
import { downloadJSON } from '../utils/helpers';
type Data = {
     timeStamp: number;
     coordinates: number[];
     volume: number;
     playbackRate: number;
};
interface Store {
     data: Data[];
     addData: (newData: Data) => void;
     downloadData: () => void;
}
const useTimeStampStore = create<Store>((set) => ({
     data: [
     ],
     addData: (newData) => set((state) => ({
          data: [...state.data, newData],
     })),
     downloadData: () => {
          downloadJSON('data.json', useTimeStampStore.getState().data);
     },
}));

export default useTimeStampStore;
