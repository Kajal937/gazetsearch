import { Box, Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { IconEdit, IconEye } from "@tabler/icons-react";
import React from "react";
// import ConfirmationPopup from "../../confirmationPopup";
import "./style.scss";

const ImageGallery = (props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Box key={props?.key} className="relative overflow-hidden mb-4 group">
      <Image
        className="gallery_image"
        src={props?.data?.image}
        alt={props?.data?.image}
        data-image-type="['Architecture']"
      />

      <Box className="transition-all duration-700 absolute h-[100%] top-[0px] left-[0px] bottom-[0px] w-[100%] text-center py-1 text-[18px] rounded-[4px] px-[6px] text-[white] group-hover:bg-[#0a0a0a48] cursor-pointer" onClick={handleModalToggle}>
        <IconEye
          className={`group-hover:block hidden w-[20px] mt-[3px] absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2`}
        />
        {/* make dp section */}
        {/* {props?.looks ? null : <>
          <Box className="absolute bottom-2 left-2">
            {props?.alreadyDP ? (
              <Button
                padding={"2px 10px"}
                className="!bg-[#3ec910] !text-[white] !border-none !rounded-[4px] !h-[30px] !pointer-events-autotext-[14px] !font-[500] !text-[14px] !opacity-70"
                isDisabled
              >
                Already DP
              </Button>
            ) : (
              <Button
                padding={"2px 10px"}
                className="!bg-[white] !text-[black] !border-none !rounded-[4px] !h-[30px] !pointer-events-autotext-[14px] !font-[500] !text-[14px] shadow-md"
                isLoading={props?.isLoading}
                onClick={(e) => {
                  return e.stopPropagation(), props?.makeDpHandleFun(props?.data);
                }}
              >
                Make DP
              </Button>
            )}
          </Box>
          del and edit section
          <Box className="flex gap-3 justify-center absolute bottom-2 right-2">
            <IconEdit
              className="!stroke-[#000] cursor-pointer bg-light-m-bg w-[36px] h-[30px] p-[7px] rounded-[5px] shadow-md"
              onClick={(e) => {
                return e.stopPropagation(), props?.handleEditFun(props?.data);
              }}
            />
            <Box className="bg-light-m-bg w-[36px] h-[30px] rounded-[5px] grid place-items-center shadow-md">
              <ConfirmationPopup
                loading={props?.isLoadingDel}
                handleDelete={() => props?.deleteYourLooksFun(props?.data?._id)}
              />
            </Box>
          </Box> </>} */}
      </Box>
      {/* image modal section... */}
      <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
        <ModalOverlay />
        <ModalContent className="!w-full !h-auto !my-auto">
          <ModalCloseButton className='!bg-[#555353eb] !text-[white]' />
          <ModalBody className="!p-0 !w-full !h-auto">
            <Image src={props?.data?.image} alt={props?.data?.image} className="!w-full !h-full !object-cover !rounded-[4px]" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ImageGallery;