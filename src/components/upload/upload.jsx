import React, { useState, useRef, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { Edit, Minus, Plus } from "tabler-icons-react";
import { compressImageSize } from "../../utility/utility";
import { SliderRangeSecond } from "../slider/SliderRangeSecond";
import { IconRotate, IconRotateClockwise } from "@tabler/icons-react";
// import "./style.scss";
import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";

function urltoFile(url, filename, mimeType) {
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type: mimeType }));
}

const CropperEditor = ({
  isOpen,
  imgFile,
  handleCancel,
  fetchCroppedImage,
  width,
  height,
  border
}) => {
  const EditorRef = useRef(null);
  const [scaleValue, setScaleValue] = useState(1);
  const [rotateValue, setRotateValue] = useState(0);

  const showCroppedImage = async () => {
    if (EditorRef.current) {
      const img = EditorRef.current.getImage().toDataURL();
      return img;
    }
    return null;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScaleValue(1);
      setRotateValue(0);
    }
  }, [isOpen]);

  const onSaveHandler = (urlString) => {
    fetchCroppedImage(urlString);
  };
  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={4} m={0}>
            <div >
              <AvatarEditor
                ref={EditorRef}
                image={imgFile && URL.createObjectURL(imgFile)}
                width={width}
                height={height}
                border={border}
                color={[0, 0, 0, 0.6]} // RGBA
                scale={scaleValue}
                rotate={rotateValue}
              />
              <div className="mt-30 main-inputs">
                <div className="d-flex align-items-center input-range justify-center align-center">
                  <span className="label mb-[7px]">
                    {" "}
                    <Minus />
                  </span>
                  <SliderRangeSecond
                    min={0.1}
                    step={0.1}
                    max={5}
                    colorScheme="teal"
                    aria-label="slider-ex-6"
                    onChange={(val) => setScaleValue(val)}
                    value={scaleValue || null}
                  />
                  <span className="label mb-[7px]">
                    {" "}
                    <Plus />
                  </span>
                </div>

                <div className="d-flex align-items-center input-range justify-center align-center">
                  <span className="label mb-[7px]">
                    {" "}
                    <IconRotate />
                  </span>
                  <SliderRangeSecond
                    min={0}
                    max={360}
                    colorScheme="teal"
                    aria-label="slider-ex-6"
                    onChange={(val) => setRotateValue(val)}
                    value={rotateValue || null}
                  />
                  <span className="label mb-[7px]">
                    {" "}
                    <IconRotateClockwise />
                  </span>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter pt={0}>
            <Button mr={3} onClick={() => handleCancel()}>
              Cancel
            </Button>
            <Button
              bg={"#00693e"}
              textColor={"white"}
              width={"84px"}
              variant="none"
              onClick={async () => onSaveHandler(await showCroppedImage())}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ImageUpload = (props) => {
  const { onChange, file, style } = props;
  const [imgFile, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = async (event) => {
    const file = event.target.files[0];
    const targetSize = 300 * 1024;
    const quality = 0.7;
    const compressedImage = await compressImageSize(file, targetSize, quality);
    if (compressedImage) {
      setFile(compressedImage);
      setIsOpen(true);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  const fetchCroppedImage = (imgUrl) => {
    urltoFile(imgUrl, imgFile.name, imgFile.type).then((file) => {
      setFile(file);
      onChange(file);
      handleCancel();
    });
  };

  return (
    <>
      <Box>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          id="fileInput"
          style={{ display: "none" }}
        />
        {(imgFile?.name || file?.url) && (
          <Image
            style={style}
            src={file?.url || URL.createObjectURL(imgFile)}
            alt="fdfd"
          />
        )}
        {imgFile?.name || file?.url ? (
          <Edit
            cursor={"pointer"}
            onClick={() => document.getElementById("fileInput").click()}
          />
        ) : (
          <Button onClick={() => document.getElementById("fileInput").click()} className="!bg-[#eab320] !rounded-[4px]">
            {"Choose File..."}
          </Button>
        )}
      </Box>

      <CropperEditor
        isOpen={isOpen}
        imgFile={imgFile}
        handleCancel={handleCancel}
        fetchCroppedImage={fetchCroppedImage}
        width={props?.width}
        height={props?.height}
        border={props?.border}
      />
    </>
  );
};

export default ImageUpload;
