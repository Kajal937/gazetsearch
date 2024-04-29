import React from "react";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Input,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  UnorderedList,
  VStack,
  Button,
} from "@chakra-ui/react";
import { IconChevronDown } from '@tabler/icons-react';
import { removeValueInLocalStorage } from "@/utility/utility";
import {dropDownMenu} from "../data.json";
import Link from "next/link";
import { useRouter } from "next/router";


const NavUserProfile = () => {

  const router = useRouter()

  return <HStack spacing={{ base: "0", md: "6" }}>
    <Flex alignItems={"center"}>
      <Menu>
        <MenuButton
          py={2}
          transition="all 0.3s"
          _focus={{ boxShadow: "none" }}
        >
          <HStack className="!items-start">
            <Avatar
              size={"sm"}
              className="navbar-avtar-fontSze"
              src={"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"}
              name={"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"}
            />
            {/* <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm" className="!text-[white] capitalize"
              >
                khushvinder
              </Text>
              <Text
                fontSize="xs"
                color="gray.600"
                className="!text-[white] capitalize"
              >
                User
              </Text>
            </VStack> */}
            {/* <Box display={{ base: "none", md: "flex" }}>
              <IconChevronDown stroke={1.4} size={18} className="text-[white]" />
            </Box> */}
          </HStack>
        </MenuButton>
        <MenuList>
          {Array.from(dropDownMenu)?.map((v, index) => {
            return (
              <Link href={v?.path} className="!bg-[red]" key={index}>
                <MenuItem>{v?.name}</MenuItem>
              </Link>
            );
          })}
          <MenuDivider />
          <MenuItem
            style={{
              color: "red",
              textDecoration: "none",
              cursor: "pointer",
            }}
            fontSize={"14px"}
            fontWeight={"500"}
            onClick={()=> {
              removeValueInLocalStorage("accessToken"),
              removeValueInLocalStorage("user"),
              removeValueInLocalStorage("userId"),
              removeValueInLocalStorage("role"),
              router.push("/")
            }}
          // onClick={() => {
          //   signOut();
          //   removeValueInLocalStorage("accessToken");
          //   removeValueInLocalStorage("role");
          //   removeValueInLocalStorage("id");
          //   removeValueInLocalStorage("image");
          //   removeValueInLocalStorage("verification");
          //   removeValueInLocalStorage("name");
          //   // router.push("/");
          //   router.push("/").finally(() => {
          //     removeValueInLocalStorage("accessToken");
          //     removeValueInLocalStorage("role");
          //     removeValueInLocalStorage("id");
          //     removeValueInLocalStorage("verification");
          //     removeValueInLocalStorage("image");
          //     removeValueInLocalStorage("name");
          //   });
          // }}
          >
            SIGN OUT
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  </HStack>
}

export default NavUserProfile;