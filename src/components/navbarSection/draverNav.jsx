import React, { useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  VStack,
  StackDivider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
} from "@chakra-ui/react";
import { menu } from "./data.json";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchValuesJsonFromLocalStorage, removeValueInLocalStorage } from "@/utility/utility";

const DraverNav = ({ isOpen, onClose, brands }) => {
  const router = useRouter();
  const token = fetchValuesJsonFromLocalStorage("accessToken")
  // const btnRef = useRef < HTMLButtonElement > null;


  const renderSingInSignUpBtn = () => {
    // if (!token) {
    //   return <>
    //    <Box h="30px">
    //           <Link
    //             href={"/signup"}
    //             className="block md:px-4 font-medium transition hover:text-primary dark:hover:text-primaryLight"
    //           >
    //             <span> Sign Up</span>
    //           </Link>
    //         </Box>
    //         <Box h="30px">
    //           <Link
    //             href={"/login"}
    //             className="block md:px-4 font-medium transition hover:text-primary dark:hover:text-primaryLight"
    //           >
    //             <span>Sign In</span>
    //           </Link>
    //         </Box>
    //   </>
    // }
    if (token) {
      return <>
          <Button
            height={"32px"}
            borderRadius="4px"
            className="!text-firstColorBg hover:!bg-firstColorBg hover:!text-[white] border-[1px] hover:border-[white]"
            onClick={() => {
              removeValueInLocalStorage("accessToken"),
              removeValueInLocalStorage("user"),
              removeValueInLocalStorage("userId"),
              removeValueInLocalStorage("role"),
              router.push("/")
            }}
          >
            Sign Out
          </Button>
      </>
    }
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      // finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <DrawerCloseButton />
        </DrawerHeader>

        <DrawerBody>
          <VStack
            // divider={<StackDivider borderColor="gray.200" />}
            align="stretch"
          >
            {Array.from(menu).map((item, index) => {
              if (item?.children?.length) {
                return (
                  <Accordion key={index} allowToggle>
                    <AccordionItem border={"hidden"}>
                      <AccordionButton p={0} h="30px">
                        <span className="font-medium text-base lg:text-sm block md:px-4 transition hover:text-primary dark:hover:text-primaryLight">
                          {item.name}
                        </span>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={0}>
                        {item?.children?.map((child, idx) => (
                          <Box
                            h="30px"
                            key={idx}
                            className="font-medium text-base lg:text-sm block md:px-4 transition hover:text-primary dark:hover:text-primaryLight"
                            onClick={onClose}
                          >
                            <Link
                              href={child?.path}
                              className="block md:px-4 transition hover:text-primary dark:hover:text-primaryLight capitalize"
                            >
                              <span>{child.name}</span>
                            </Link>
                          </Box>
                        ))}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                );
              } else {
                return (
                  <Box h="30px" key={index}>
                    <Link
                      href={item.path}
                      className="block md:px-4 font-medium transition hover:text-primary dark:hover:text-primaryLight"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </Box>
                );
              }
            })}

           {renderSingInSignUpBtn()}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DraverNav;
