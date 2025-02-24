
import { create } from 'zustand'
export type session = 'Generate' | 'Preview';

type Store = {
     session: session,
     setSession: (session: session) => void,
     isPlaying: boolean,
     setIsPlaying: (isPlaying: boolean) => void,
     totalDuration: number,
     setTotalDuration: (totalDuration: number) => void,
     currentTimeStamp: number,
     setCurrentTimeStamp: (currentTimeStamp: number) => void,
     playbackRate: number,
     setPlaybackRate: (playbackRate: number) => void,
     volume: number,
     setVolume: (volume: number) => void,
     isCroppedStarted: boolean,
     setIsCroppedStarted: (isCroppedStarted: boolean) => void,
     videoRef: React.RefObject<HTMLVideoElement> | null,
     position: { x: number, y: number },
     setPosition: (props: { x: number, y: number }) => void,

     aspectRatio: string,
     aspectWidth: number,
     setAspectWidthRatio: (aspectWidth: number, aspectRatio: string) => void,
     isDragging: boolean,
     setIsDragging: (isDragging: boolean) => void,
     videoHeight: number,
     setVideoHeight: (videoHeight: number) => void,
}
const useAppStore = create<Store>((set) => ({
     session: 'Generate',
     setSession: (session: session) => set({ session }),
     isPlaying: false,
     setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),

     totalDuration: 0,
     setTotalDuration: (totalDuration: number) => set({ totalDuration }),

     currentTimeStamp: 0,
     setCurrentTimeStamp: (currentTimeStamp: number) => set({ currentTimeStamp }),

     playbackRate: 1,
     setPlaybackRate: (playbackRate: number) => set({ playbackRate }),

     volume: 50,
     setVolume: (volume: number) => set({ volume }),

     isCroppedStarted: false,
     setIsCroppedStarted: (isCroppedStarted: boolean) => set({ isCroppedStarted }),
     videoRef: null,
     position: { x: 0, y: 0 },
     setPosition: ({ x, y }: { x: number, y: number }) => set({ position: { x, y } }),
     aspectRatio: '3:4',
     aspectWidth: 75,
     setAspectWidthRatio: (aspectWidth: number, aspectRatio: string) => set({ aspectWidth, aspectRatio }),
     isDragging: false,
     setIsDragging: (isDragging: boolean) => set({ isDragging }),
     videoHeight: 0,
     setVideoHeight: (videoHeight: number) => set({ videoHeight }),
}))

export default useAppStore