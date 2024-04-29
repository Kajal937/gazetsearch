// 'use client'
import { useRouter } from "next/router";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
  Image,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import logo from "../../images/logothree.png";
import ManageBlog from "../../components/admin/manage-blog";
import ManageGallery from '../../components/admin/manage-gallery/index'
import Link from "next/link";
import { removeValueInLocalStorage } from "@/utility/utility";

const LinkItems = [
  {
    name: "Manage Blog",
    path: "manage-blog",
  },
  {
    name: "Manage Gallery",
    path: "manage-gallery",
  },
];

const SidebarContent = ({ onClose, ...rest }) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Box
      className="max-md:!w-[100%] !border-r-[#aca2a244] max-md:pl-0 max-[1280px]:pl-4"
      // transition="3s ease"
      // bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      // borderRightColor={useColorModeValue("red", "gray.700")}
      w={{ base: 0, md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        justifyContent="space-between"
        className="border-b-[1px]"
      >
        <Box className="text-[1.25rem] font-[600] uppercase tracking-[1px] max-[766px]:px-4">
          <Link href="/">
            <Image
              src={logo.src}
              alt={logo.src}
              height="56px"
              className="max-sm:!h-[44px] cursor-pointer"
              onClick={()=> router.push("/")}
            />
          </Link>
        </Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems?.map((link) => {
        return (
          <NavItem
            onClick={onClose}
            key={link?.name}
            className={`${slug == link?.path && "!bg-[#d0cfcf]"
              } max-md:!text-center border-b-[1px] !p-0 border-[#e8e2e2] !m-0 !rounded-[0px] hover:!bg-[#d0cfcf] hover:!text-[black] cursor-pointer`}
          >
            <Link
              href={link?.path}
              className="!pt-[6px] !pb-[8px] !px-[7px] w-[100%]"
            >
              {link?.name}
            </Link>
          </NavItem>
        );
      })}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const menu = [{ menu: "Home", path: "/" }];
  const router = useRouter();

  const handleSignOut = () => {
    removeValueInLocalStorage("accessToken"),
              removeValueInLocalStorage("user"),
              removeValueInLocalStorage("userId"),
              removeValueInLocalStorage("role"),
              router.push("/")
  };
  return (
    <Flex
      position="sticky"
      top="0"
      zIndex="99"
      ml={{ base: 0, md: "0" }}
      px={{ base: 4, md: 4 }}
      className="md:!ml-[241px] bg-[#ededed]"
      // width="81%"
      height="20"
      alignItems="center"
      // bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      // borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        // variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
        bg={"none"}
        className="dark:text-[white]"
      />

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Button
            height={"32px"}
            onClick={handleSignOut}
            className="!bg-secondColorBg !text-[white]"
          >
            Sign Out
          </Button>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { slug } = router.query;
  const render = () => {
    switch (slug) {
      case "manage-blog":
        return <ManageBlog />;
      case "manage-gallery":
        return <ManageGallery />;
      default:
        return <ManageBlog />;

    }
  };
  return (
    <Box className="max-w-[1280px] w-[100%] m-auto">
      <Box minH="100vh">
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <MobileNav onOpen={onOpen} />
        <Box
          ml={{ base: 0, md: 60 }}
          pl="4"
          pt={"4"}
          className="max-[1280px]:!px-4"
        >
          {render()}
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;

export const getServerSideProps = async (context) => {
  if (context.req.cookies.accessToken) {
    return {
      props: {}
    };
  }
  return {
    redirect: {
      destination: "/",
    },
  };
};