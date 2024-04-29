import React, { useState, useRef, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { Edit, Minus, Plus } from "tabler-icons-react";
import { compressImageSize } from "../../utility/utility";
import { SliderRange } from "../slider/index";
import { IconRotate, IconRotateClockwise } from "@tabler/icons-react";
import "./style.scss";
import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { uploadMutation } from "../../apis/upload";

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
  border,
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
      <Modal isOpen={isOpen} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={4} m={0}>
            <Box>
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
              <Box className="mt-30 main-inputs">
                <Box className="d-flex align-items-center input-range justify-center align-center">
                  <Text as={"span"} className="label mb-[7px]">
                    {" "}
                    <Minus />
                  </Text>
                  <SliderRange
                    min={0.1}
                    step={0.1}
                    max={5}
                    colorScheme="teal"
                    aria-label="slider-ex-6"
                    onChange={(val) => setScaleValue(val)}
                    value={scaleValue || null}
                  />
                  <Text as={"span"} className="label mb-[7px]">
                    {" "}
                    <Plus />
                  </Text>
                </Box>

                <Box className="d-flex align-items-center input-range justify-center align-center">
                  <Text as={"span"} className="label mb-[7px]">
                    {" "}
                    <IconRotate />
                  </Text>
                  <SliderRange
                    min={0}
                    max={360}
                    colorScheme="teal"
                    aria-label="slider-ex-6"
                    onChange={(val) => setRotateValue(val)}
                    value={rotateValue || null}
                  />
                  <Text as={"span"} className="label mb-[7px]">
                    {" "}
                    <IconRotateClockwise />
                  </Text>
                </Box>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter pt={0}>
            <Button className='!bg-secondColorBg !text-[white]'
              variant="none"
              height={"32px"}
              borderRadius={"4px"} mr={3} onClick={() => handleCancel()}>
              Cancel
            </Button>
            <Button
              // bg={"#eab320"}
              className="!bg-firstColorBg !text-[white]"
              textColor={"black"}
              width={"84px"}
              height={"32px"}
              borderRadius={"4px"}
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

const UploadSingle = (props) => {
  const { style } = props;
  const [imgFile, setImgFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = async (event) => {
    const file = event.target.files[0];
    const targetSize = 300 * 1024;
    const quality = 0.7;
    const compressedImage = await compressImageSize(file, targetSize, quality);
    if (compressedImage) {
      setImgFile(compressedImage);
      setIsOpen(true);
    }
  };

  const onChangeUpload = async (event) => {
    setLoading(true);
    const file = event;
    const targetSize = 300 * 1024;
    const quality = 0.7;
    const compressedImage = await compressImageSize(file, targetSize, quality);
    let fd = new FormData();
    fd.append("file", compressedImage);
    await uploadMutation(fd)
      .then((url) => {
        props?.setUrl(url?.data);
        setLoading(false);
      })

      .catch((err) => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  const fetchCroppedImage = (imgUrl) => {
    urltoFile(imgUrl, imgFile.name, imgFile.type).then((file) => {
      setImgFile(file);
      onChangeUpload(file);
      handleCancel();
    });
  };

  return (
    <>
      <Box className="flex flex-col items-center mb-5">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          id="fileInput"
          style={{ display: "none" }}
        />
        {(imgFile?.name || props?.url) && (
          loading ? <Spinner color='#0277B5' /> :
            <> <Image
              style={style}
              src={props?.url || URL.createObjectURL(imgFile)}
              alt={props?.url || URL.createObjectURL(imgFile)}
            />
              {props?.selectInput}
            </>
        )}
        {imgFile?.name || props?.url ? (
          <Edit
            cursor={"pointer"}
            className="mt-4"
            onClick={() => document.getElementById("fileInput").click()}
          />
        ) : (
          <Button
            isLoading={loading}
            onClick={() => document.getElementById("fileInput").click()}
            className="flex items-center justify-center w-[132px] !h-[32px] cursor-pointer !bg-firstColorBg !text-[white] !rounded-[4px] font-[500]"
          >
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

export default UploadSingle;
