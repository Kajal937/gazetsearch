import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Box,
  Text,
  useDisclosure,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import FormInput from "../input/textInput";
import FormTextarea from "../input/textAreaInput";
import { useCreateContactMutation } from "@/apis/contact";
import theme from "../../utility/theme/theme.json";
import { validateEmail, validatePhoneNumber, validateRequiredField } from "@/utility/utility";
import { toast } from "react-toastify";
import "./style.scss"
import { IconArrowBackUp, IconArrowNarrowLeft, IconChevronRight, IconMessage } from "@tabler/icons-react";
import TooltiPage from "../tooltip/index"


const HelpChatBox = () => {
  const [isChecked, setIsChecked] = useState(true);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [formData, setFormData] = useState({});

  const { mutate: createMutate, isLoading: isLoading } =
    useCreateContactMutation();

  const handleSave = () => {

    if (formData?.email && validateEmail(formData?.email)) {
      return toast.warning(validateEmail(formData?.email), { position: "top-center", autoClose: 600 })
    }

    if (
      validateRequiredField(formData?.name) ||
      validatePhoneNumber(formData?.mobileNumber)
      // validateRequiredField(formData?.description)
    ) {
      return toast.warning(
        validateRequiredField(formData?.name) ||
        // validateEmail(formData?.email) ||
        validatePhoneNumber(formData?.mobileNumber)
        // ||
        // validateRequiredField(formData?.description)
        , { position: "top-center", autoClose: 600 }
      );
    }



    createMutate(formData, {
      onSuccess: () => {
        setFormData({ name: "", email: "", mobileNumber: "", description: "", contactType: "" });
        onClose();
        toast.success("Successfully Sand Message", { position: "top-center", autoClose: 600 }
        );

      },
    });
  };

  const helpData = [
    "Nonfunctional Or Damaged Phone", "TV Repair", "Laptop Or Table", "Accessories", "Software Support", "Phone Protection", "Other"
  ]

  useEffect(() => {
    if (isChecked === false) {
      setFormData({ ...formData, contactType: "Call" })
    }
  }, [isChecked])

  return (
    <Box className="fixed bottom-[-30px] left-[16px] popupBoxHelp z-50">
      <Popover
        className="!w-[342px] !mr-5"
        placement="top"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        closeOnBlur={false}
      >
        <PopoverTrigger>

          {/* <Box className="relative w-[88%] flex flex-col items-center group" onClick={() =>
            setFormData({ name: "", email: "", mobileNumber: "", description: "", contactType: "" })

          }> */}
          <Box className="container" onClick={() => {
            return setFormData({ name: "", email: "", mobileNumber: "", description: "", contactType: "" }), setIsChecked(!isChecked)
          }
          }>
            <TooltiPage label="Contact Us" open={isChecked} bgColor="#0277B5">
              <Box className="svg-box"  >

                <Button _hover={{ bg: "transprant" }} bg={"#000000"} textColor={"#E8B320"} boxShadow="0 3px 12px rgba(0,0,0,.15)" className="!w-[52px] z-auto !h-[50px] !rounded-full scaling-animation relative top-[4px] left-[4px]" ><IconMessage /></Button>

              </Box>
            </TooltiPage>
            <Box className="circle delay1"></Box>
            <Box className="circle delay2"></Box>
            <Box className="circle delay3"></Box>
            <Box className="circle delay4"></Box>
          </Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton className="!text-light_mode_text dark:!text-dark_mode_text" onClick={() => {
            return onClose(), setIsChecked(!isChecked)
          }} />
          {/* {isChecked ? <IconArrowBackUp onClick={() => setIsChecked()} className="absolute right-8 top-[3px] !w-[18px] cursor-pointer" /> : null} */}
          <PopoverHeader className="!bg-light_mode dark:!bg-dark_mode !text-light_mode_text dark:!text-dark_mode_text" bg={theme.headerColor}>
            Give us a message
          </PopoverHeader>

          <PopoverBody className={`${isChecked ? null : "!px-[6px]"} flex flex-col gap-5 !py-3 max-[600px]:!w-[100%] help-chet-modal-body`}>
            {/* {!isChecked ?
              <Box className="flex flex-col gap-2">
                {helpData?.map((v, index) => {
                  return <>
                    <Box className="flex justify-between items-center cursor-pointer hover:bg-[#0000001a] px-[9px] rounded-md">
                      <Text key={index} onClick={() => setIsChecked(v)} className="py-[2px] text-[14px]">
                        {v}
                      </Text>
                      <IconChevronRight className="!w-4" />
                    </Box>
                  </>
                })}

              </Box> : null}
            {isChecked ?
              <> */}

            <Box>
              <FormInput
                required
                type={"text"}
                label={"Name"}
                placeholder="Name"
                value={formData?.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
              <FormInput
                type={"email"}
                label={"Email"}
                value={formData?.email}
                placeholder="Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <FormInput
                required
                type={"number"}
                label={"Phone Number"}
                value={formData?.mobileNumber}
                placeholder="Phone Number"
                onChange={(e) =>
                  setFormData({ ...formData, mobileNumber: e.target.value })
                }
              />
              <FormTextarea
                label={"Description"}
                placeholder="Description"
                value={formData?.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                }}
              />
              <Text className="!text-[14px] text-gray-600 !font-[500] mb-1 capitalize mt-[5px]">
                How do you want us to get back to you?
              </Text>
              <RadioGroup colorScheme={"yellow"} onChange={(e) => setFormData({ ...formData, contactType: e })} value={formData?.contactType || "Call"} ml={"1"}>
                <Stack direction='row'>
                  <Radio value='Call'>Call</Radio>
                  <Radio value='Email'>Email</Radio>
                  <Radio value='Text'>Text</Radio>
                </Stack>
              </RadioGroup>
              <Button
                textColor={theme?.textPrimaryColor}
                className="!w-[132px] !ml-auto mt-3 !bg-[#e8b320]"
                isLoading={isLoading}
                onClick={() => handleSave()}
                height={"32px"}
                borderRadius={"4px"}
              >
                Send message
              </Button>
            </Box>
            {/* </> : null} */}

          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default HelpChatBox;
