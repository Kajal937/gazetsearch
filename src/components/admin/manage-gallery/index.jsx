import React, { useState } from 'react';
import { Box, Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import UploadSingle from "../../../components/uploadSingle";
import AdminImageGallery from '../../gallery/adminImageGallery/index'
import { useCreateGalleryMutation, useDeleteGalleryMutation, useGallerylQuery, useUpdateGalleryMutation } from "../../../apis/gallery"
import FormMultiSelectInput from "../../input/FormMultiSelectInput/index"
import ChakraSpinner from '@/components/spinner';


const ManageGallery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formData, setFormData] = useState()
  const [editBtn, setEditBtn] = useState(true)
  const [url, setUrl] = useState(null);


  const { data: gallery, refetch: refetchGallery, isLoading: isLoading } = useGallerylQuery()
  const { mutate: createGallery, isLoading: isLoading0 } = useCreateGalleryMutation();
  const { mutate: updateGallery, isLoading: isLoading1 } = useUpdateGalleryMutation()
  const { mutate: deleteImageFromGallery, isLoading: isLoading2 } = useDeleteGalleryMutation()


  const handleChange = (values) => {
    const payload = {
      ...formData,
      ...values,
    };
    // Object.keys(payload).forEach((key) => {
    //   if (key === false && !payload[key]) delete payload[key];
    // });
    setFormData(payload);
  };

  const handleSave = () => {
    const payload = {
      image: url,
      ...formData,
    };

    if (editBtn) {
      createGallery(payload, {
        onSuccess: () => {
          refetchGallery()
          setFormData(gallery)
          setUrl(null)
        },
      });
    }
    if (!editBtn) {
      updateGallery(payload, {
        onSuccess: () => {
          refetchGallery()
          setFormData(null)
          setUrl(null)
          setEditBtn(true)
          onClose()
        }
      })
    }

  }
  const handleUpdate = (value) => {
    setEditBtn(false)
    setFormData(value)
  }

  const handleDelete = (id) => {
    deleteImageFromGallery(id, {
      onSuccess: () => {
        refetchGallery()
      }
    })
  }

  if (isLoading || isLoading0 || isLoading1 || isLoading2) {
    return <Box className="flex justify-center items-center scroll-list px-2 py-[3px] text-sm h-[80vh] overflow-auto flex-col gap-1">
      <ChakraSpinner />
    </Box>
  }


  return <>
    <Box className="flex justify-center my-4">
      <UploadSingle
        url={url}
        setUrl={setUrl}
        style={{
          width: "330px",
          height: "320px",
          borderRadius: "4px",
          objectFit: "cover",
        }}
        width={170}
        height={170}
        border={[10, 10]}
        selectInput={<FormMultiSelectInput
          isMulti
          label={"Tags"}
          values={formData?.tags || []}
          setValues={handleChange}
          onChange={(e) => {
            return handleChange({
              tags: e,
            });
          }}
        />}
      />
    </Box>
    {url ?
      <Button
        onClick={handleSave}
        isLoading={isLoading0}
        className="!bg-firstColorBg !text-[white] !flex mx-auto mb-5"
        // textColor={"white"}
        variant="none"
        height={"32px"}
        borderRadius={"4px"}
      >
        Save
      </Button> : null}

    {/* upload images collection */}
    <Box className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3'>
      {gallery?.data?.map((url, index) => {
        return <AdminImageGallery data={url} key={index} handleUpdate={handleUpdate} handleDelete={handleDelete} onOpen={onOpen} />
      })}
    </Box>

    {/* edit item modal */}
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="!w-full !h-auto !my-auto">
        <ModalCloseButton className='!bg-[#555353eb] !text-[white]' />
        <ModalBody className="!w-full !h-auto !py-7">
          <Image src={formData?.image} alt={formData?.image} className="!w-full !h-full !object-cover !rounded-[4px] mb-2" />
          <FormMultiSelectInput
            isMulti
            label={"Tags"}
            values={formData?.tags || []}
            setValues={handleChange}
            onChange={(e) => {
              return handleChange({
                tags: e,
              });
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className='!bg-secondColorBg !text-[white]'
            variant="none"
            height={"32px"}
            borderRadius={"4px"} mr={3}
            onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleSave}
            isLoading={isLoading0}
            className="!bg-firstColorBg !text-[white]"
            // textColor={"white"}
            variant="none"
            height={"32px"}
            borderRadius={"4px"}
          >Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
};

export default ManageGallery;
