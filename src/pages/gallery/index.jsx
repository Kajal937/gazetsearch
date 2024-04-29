import React from "react";
import { Box } from "@chakra-ui/react";
import ImageGallery from "../../components/gallery/imageGallery";
import Navbar from "../../components/navbarSection/navbar";
import { useGallerylQuery } from "../../apis/gallery"
import ChakraSpinner from "../../components/spinner";


const Gallery = () => {

  const { data: gallery, isLoading: isLoading } = useGallerylQuery()

  if (isLoading) {
    return <Box className="flex justify-center items-center scroll-list px-2 py-[3px] text-sm h-[80vh] overflow-auto flex-col gap-1">
      <ChakraSpinner />
    </Box>
  }

  return <Box className="mb-[60px]">
    <Navbar />
    <Box className="filter_image_container !mt-[100px] sm:!mt-[126px] !mb-[60px] !max-w-[1400px] !w-full !mx-auto mobile_screen_lr_p">
      {gallery?.data?.map((v, index) => {
        return <ImageGallery data={v} key={index} />
      })}
    </Box>
  </Box>
}

export default Gallery;