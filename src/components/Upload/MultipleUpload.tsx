import React, { useEffect, useState } from "react";
import { type ImagePreviewerProps } from "../../interfaces/Global";
import { ImagePlus, Trash2 } from "@icons";

const MultipleUpload: React.FC<ImagePreviewerProps> = ({
  images,
  setImages,
}) => {
  const removeImage = (index: string) => {
    setImages(images.filter((image: string) => image !== index));
  };

  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImages((prevImages: string) => [...prevImages, base64String]);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    setSelectedImage(images?.slice(-1)[0] as string);
  }, [images]);

  return (
    <div className="mt-2">
      {images?.length >= 1 && (
        <div className="justify-end flex">
          <button
            type="button"
            className="z-10 mb-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100"
            onClick={() => removeImage(selectedImage)}
          >
            <Trash2 size={16}/>
          </button>
        </div>
      )}

      <label
        htmlFor="file-upload"
        className="relative mt-2 flex min-h-56 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[1.25rem] border border-dashed border-[#6F8294]/50 bg-[#EEF1F3]/70 transition hover:border-[#151A22]/35 hover:bg-[#EEF1F3]"
      >
        <div className="w-[44px] h-[44px] flex justify-center items-center rounded-full">
          <ImagePlus className="text-[#6F8294]" />
        </div>
        <span className="mt-3 text-gray-500">
          {images?.length >= 1 ? (
            <div className="">
              <img
                src={
                  images?.length === 1 ? (images[0] as string) : selectedImage
                }
                alt="Selected product preview" className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col">
              <p className="text-sm font-semibold text-[#151A22]">Choose product imagery</p>
              <p className="mt-1 text-xs text-[#6F8294]">JPEG or PNG · up to 10MB</p>
            </div>
          )}
        </span>
        <input
          id="file-upload"
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <p className="mt-3 text-xs leading-5 text-[#6F8294]">Recommended: portrait-oriented, high-resolution product photography. Supported formats: JPEG and PNG.</p>
      {images?.length > 0 && (
        <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1">
          {images?.map((data: string, index: number) => (
            <div
              key={index}
              className="relative flex shrink-0 cursor-pointer gap-4"
              onClick={() => setSelectedImage(data)}
            >
              {" "}
              <img
                src={data}
                alt={`Product preview ${index + 1}`} className={`h-16 w-16 rounded-xl object-cover ${
                  selectedImage === data && "ring-2 ring-[#151A22] ring-offset-2"
                } `}
              />
            </div>
          ))}
          <label
            className="flex h-16 shrink-0 cursor-pointer items-center rounded-xl border border-dashed border-[#6F8294]/50 bg-[#EEF1F3] px-4 text-xs font-semibold text-[#242B35]"
          >
            + Add New Image
            <input
              id="file-upload"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default MultipleUpload;
