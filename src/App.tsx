import { useEffect, useRef, useCallback } from "react";
import "./App.css";
import Button from "./Button";
import Header from "./component/Header";
import NoPreview from "./component/NoPreview";
import VideoControls from "./component/VideoControls";
import useAppStore from "./store/videostore";
import Video from "./component/Video";
import useTimeStampStore from "./store/timeStamp";

function App() {
  const {
    isPlaying,
    volume,
    setTotalDuration,
    setCurrentTimeStamp,
    currentTimeStamp,
    playbackRate,
    isCroppedStarted,
    isDragging,
    setIsDragging,
    position,
    setPosition,
    aspectWidth,
    setVideoHeight,
    setAspectWidthRatio,
  } = useAppStore();


  const { addData } = useTimeStampStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const updatePreview = useCallback(() => {
    if (
      videoRef.current &&
      previewCanvasRef.current &&
      dragRef.current &&
      isCroppedStarted
    ) {
      const vHeight = videoRef.current.offsetHeight;
      previewCanvasRef.current.width = dragRef.current.offsetWidth;
      previewCanvasRef.current.height = vHeight;
      const ctx = previewCanvasRef.current.getContext("2d");
      if (ctx) {
        const sx = position.x;
        const sy = 0;
        const sWidth = aspectWidth;
        const sHeight = dragRef.current.offsetHeight;
        ctx.drawImage(
          videoRef.current,
          sx,
          sy,
          sWidth,
          sHeight,
          0,
          0,
          dragRef.current.offsetWidth + 40,
          dragRef.current.offsetHeight
        );
      }
    }
  }, [isCroppedStarted, aspectWidth, position.x]);

  const onMouseDown = useCallback(() => {
    setIsDragging(true);
    captureTimeStamp();
  }, [captureTimeStamp]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && dragRef.current && videoRef.current) {
        const videoRect = videoRef.current.getBoundingClientRect();
        const dragRect = dragRef.current.getBoundingClientRect();

        let newX = e.clientX - videoRect.left - dragRect.width / 2;
        let newY = e.clientY - videoRect.top - dragRect.height / 2;

        newX = Math.max(0, Math.min(newX, videoRect.width - dragRect.width));
        newY = Math.max(0, Math.min(newY, videoRect.height - dragRect.height));

        setPosition({ x: newX, y: newY });
        updatePreview();
      }
    },
    [isDragging, updatePreview]
  );
  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  //video start stop
  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying]);

  //handling the seekbar timestamp changes
  useEffect(() => {
    if (videoRef.current && !isPlaying)
      videoRef.current.currentTime = currentTimeStamp;
  }, [currentTimeStamp, isPlaying]);

  // Handling volume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Handling playback rate
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  //Initial default aspect width
  useEffect(() => {
    if (videoRef.current)
      setAspectWidthRatio(0.75 * videoRef.current.offsetHeight, "3:4");
  }, [setAspectWidthRatio]);

  function captureTimeStamp() {
    if (dragRef.current && videoRef.current) {
      addData({
        timeStamp: Math.floor(currentTimeStamp),
        coordinates: [
          position.x,
          position.y,
          aspectWidth,
          dragRef.current?.offsetHeight,
        ],
        volume: volume,
        playbackRate: playbackRate,
      });
    }
  }
  return (
    <div className="w-full min-h-screen bg-background">
      <Header />
      <section className="h-[600px] flex w-full">
        <section className="w-1/2 px-10 py-7 ">
          <div
            className="relative"
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {isCroppedStarted && (
              <div
                ref={dragRef}
                className="absolute top-0 z-40 grid h-full grid-cols-3 bg-white cursor-move bg-opacity-20"
                style={{
                  width: `${aspectWidth}px`,
                  left: `${position.x}px`,
                }}
                onMouseDown={onMouseDown}
              >
                {[...Array(9)].map((_, index) => (
                  <div
                    key={index}
                    className="border border-white border-opacity-40"
                  ></div>
                ))}
              </div>
            )}
            <Video
              ref={videoRef}
              className=""
              loadedFunc={() => {
                setVideoHeight(videoRef.current?.offsetHeight || 0);
                setTotalDuration(Math.floor(videoRef.current?.duration || 0));
              }}
              timeUpdateFunc={() => {
                updatePreview();
                setCurrentTimeStamp(videoRef.current?.currentTime || 0);
              }}
            />
          </div>
          <VideoControls />
        </section>
        <section className="w-1/2 px-10 py-7 ">
          <h5 className="text-center text-tertiary">Preview</h5>
          {isCroppedStarted && isPlaying ? (
            <canvas ref={previewCanvasRef} className="mt-4 mx-auto" />
          ) : (
            <NoPreview />
          )}
        </section>
      </section>
      <CropperControls />
    </div>
  );
}

function CropperControls() {
  const { setIsCroppedStarted, isCroppedStarted } = useAppStore();
  const { downloadData } = useTimeStampStore();
  return (
    <div className="flex flex-wrap items-center justify-start gap-2 px-4 py-4 rounded-lg border-t-2 border-secondary mt-10">
      <Button
        onClick={() => {
          setIsCroppedStarted(!isCroppedStarted);
        }}
        disabled={isCroppedStarted}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Start Cropper
      </Button>
      <Button
        onClick={() => {
          setIsCroppedStarted(!isCroppedStarted);
        }}
        disabled={!isCroppedStarted}
        className="disabled:opacity-70 disabled:cursor-not-allowed"
      >
        Remove Cropper
      </Button>
      <Button
        disabled={!isCroppedStarted}
        className="disabled:opacity-70 disabled:cursor-not-allowed"
        onClick={downloadData}
      >
        Generate Preview
      </Button>
      <div className="flex-grow"></div>
      <button className="px-4 py-2 text-sm font-medium text-gray-300 rounded-md bg-secondary hover:text-white focus:outline-none">
        Cancel
      </button>
    </div>
  );
}

export default App;
