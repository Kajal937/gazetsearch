import { Box, chakra, Text, Flex, useRangeSlider } from "@chakra-ui/react";

const Thumb = ({ value, bgColor, thumbIndex, thumbProps, onKeyDownStepBy }) => {
  return (
    <Box
      top="1%"
      boxSize={8}
      bgColor={bgColor}
      borderRadius="full"
      _focusVisible={{
        outline: "none",
      }}
      onKeyDown={(e) => {
        onKeyDownStepBy(e, thumbIndex);
      }}
      {...thumbProps}
    >
      <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
        <Text color="white">{value}</Text>
      </Flex>
    </Box>
  );
};

export default function FormRange({
  min,
  max,
  stepToNumber,
  stepToIndex,
  stepByNumber,
  defaultValue,
  ...rest
}) {
  const {
    state,
    actions,
    getInnerTrackProps,
    getInputProps,
    getMarkerProps,
    getRootProps,
    getThumbProps,
    getTrackProps,
  } = useRangeSlider({ min, max, defaultValue, ...rest });

  const { onKeyDown: onThumbKeyDownFirstIndex, ...thumbPropsFirstIndex } =
    getThumbProps({
      index: 0,
    });

  const { onKeyDown: onThumbKeyDownSecondIndex, ...thumbPropsSecondIndex } =
    getThumbProps({
      index: 1,
    });

  const markers = Array.from({ length: 3 }, (_, i) => i + 1).map((i) =>
    getMarkerProps({ value: i * 25 })
  );

  const onKeyDownStepBy = (e, thumbIndex) => {
    if (e.code === "ArrowRight") actions.stepUp(thumbIndex, stepByNumber);
    else if (e.code === "ArrowLeft") actions.stepDown(thumbIndex, stepByNumber);
    else if (thumbIndex === 0 && typeof onThumbKeyDownFirstIndex === "function")
      onThumbKeyDownFirstIndex(e);
    else if (
      thumbIndex === 1 &&
      typeof onThumbKeyDownSecondIndex === "function"
    )
      onThumbKeyDownSecondIndex(e);
  };

  return (
    <Box px={2}>
      <Flex flexDir="row" justifyContent="space-between"></Flex>
      <chakra.div
        mt={2}
        cursor="pointer"
        w={{ base: "96%", lg: "98%" }}
        ml={{ base: "2%", lg: "1%" }}
        {...getRootProps()}
      >
        <input {...getInputProps({ index: 0 })} hidden />
        <input {...getInputProps({ index: 1 })} hidden />
        {/* {markers.map((markerProps, index) => {
          const value = String((index + 1) * 25) + "%";
          return (
            <Badge
              key={index}
              ml="-18px"
              mt="25px"
              fontSize="sm"
              color="black"
              {...markerProps}
            >
              {value}
            </Badge>
          );
        })} */}
        <Box
          h="7px"
          bgColor="teal.100"
          borderRadius="full"
          {...getTrackProps()}
        >
          <Box
            h="7px"
            bgColor="teal.500"
            borderRadius="full"
            {...getInnerTrackProps()}
          />
        </Box>
        <Thumb
          value={state.value[0]}
          thumbIndex={0}
          thumbProps={thumbPropsFirstIndex}
          onKeyDownStepBy={onKeyDownStepBy}
          bgColor="teal.500"
        />
        <Thumb
          value={state.value[1]}
          thumbIndex={1}
          thumbProps={thumbPropsSecondIndex}
          onKeyDownStepBy={onKeyDownStepBy}
          bgColor="teal.500"
        />
      </chakra.div>
    </Box>
  );
}
