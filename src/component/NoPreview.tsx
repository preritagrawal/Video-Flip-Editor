import { PiVideoFill } from "react-icons/pi";
const NoPreview = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[400px]  rounded-lg">
      <PiVideoFill className="text-white" size={40} />
      <p className="text-sm text-gray-300">Preview not available</p>
      <p className="text-sm text-tertiary">
        Please click on “Start Cropper” and then play video
      </p>
    </div>
  );
};

export default NoPreview;
