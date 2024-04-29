import React from "react";
import { Box, Image, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import TooltiPage from '../../tooltip/index'

const AdminImageGallery = (props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return <>
    <Box
      className="w-full cursor-pointer"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      _hover={{
        '.overlay': { opacity: 1 },
        '.preview-btn': { opacity: 1 },
        '.delete-btn': { opacity: 1 },
      }}
      onClick={handleModalToggle}
    >
      <Image key={props?.index} src={props?.data?.image} alt={props?.data?.image} className="!w-full object-cover h-[250px]" />

      <Box
        className="overlay"
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 0, 0, 0.5)"
        opacity={0}
        transition="opacity 0.3s"
      />

      {/* <TooltiPage label="Delete" bgColor="#FE5655"> */}
      <IconButton
        className="delete-btn cursor-pointer"
        position="absolute"
        top="2"
        right="2"
        icon={<DeleteIcon />}
        colorScheme="red"
        aria-label="Delete"
        size="sm"
        opacity={0}
        transition="opacity 0.3s"
        onClick={(e) => { e.stopPropagation(), props?.handleDelete(props?.data?._id) }}
      />
      {/* </TooltiPage> */}

      {/* <TooltiPage label="Edit" bgColor="#1F65E7" > */}
      <IconButton
        className="preview-btn !bg-firstColorBg !text-[white] cursor-pointer"
        position="absolute"
        top="2"
        left="7px"
        icon={<EditIcon />}
        aria-label="Edit"
        size="sm"
        opacity={0}
        transition="opacity 0.3s"
        onClick={(e) => {
          e.stopPropagation();
          props?.onOpen();
          props?.handleUpdate(props?.data);
        }}
      />
      {/* </TooltiPage> */}

      <IconButton
        className="preview-btn cursor-pointer !absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
        icon={<ViewIcon />}
        colorScheme="none"
        aria-label="Preview"
        size="sm"
        opacity={0}
        transition="opacity 0.3s"
      />
    </Box>

    {/* modal */}
    <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
      <ModalOverlay />
      <ModalContent className="!w-full !h-auto !my-auto">
        <ModalCloseButton className='!bg-[#555353eb] !text-[white]' />
        <ModalBody className="!p-0 !w-full !h-auto">
          <Image src={props?.data?.image} alt={props?.data?.image} className="!w-full !h-full !object-cover !rounded-[4px]" />
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
}
export default AdminImageGallery;