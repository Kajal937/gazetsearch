import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React from "react";

export function SliderRange(props) {
  return (
    <>
    {/* <label className="text-[18px] font-[600] pl-[5px]">Range</label> */}
    <Box pt={6} pb={2} className="w-[94%] m-auto !pt-[16px]">
      <Slider {...props}>
        <SliderMark
          value={Number(props.value)}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          {props.value}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
    </>
  );
}
