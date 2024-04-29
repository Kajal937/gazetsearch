import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Box,
  Image,
  Button,
} from "@chakra-ui/react";
import { menu } from "./data.json";
// import logo from "../../images/logo.jpg";
import DraverNav from "./draverNav";
import { useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import theme from "@/utility/theme/theme.json";
import { useRouter } from "next/router";
import { IconPhoneCall } from "@tabler/icons-react";
// import Image from "next/image";
import Logo from "../../images/logo.png"
import NavUserProfile from "./navUserProfile/index"
import { fetchValuesJsonFromLocalStorage, removeValueInLocalStorage } from "@/utility/utility";

interface MyComponentProps {
  theme?: any;
}
const Navbar: React.FC<MyComponentProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = fetchValuesJsonFromLocalStorage("accessToken")
  const router = useRouter();

  const renderSingInSignUpBtn = () => {
    // if (!token) {
    //   return <>
    //   <li>
    //       <Button
    //         variant="outline"
    //         className="mx-4 border-[1px] border-[white] !text-[white] hover:!bg-[white] hover:!text-firstColorBg"
    //         height={"32px"}
    //         borderRadius="4px"
    //         onClick={() => router.push("/")}
    //       >
    //         Home
    //       </Button>
    //     </li>
    //     <li>
    //       <Button
    //         variant="outline"
    //         className="mx-4 border-[1px] border-[white] !text-[white] hover:!bg-[white] hover:!text-firstColorBg"
    //         height={"32px"}
    //         borderRadius="4px"
    //         onClick={() => router.push("/gallery")}
    //       >
    //         Gallery
    //       </Button>
    //     </li>
    //     <li>
    //       <Button
    //         variant="outline"
    //         className="mx-4 border-[1px] border-[white] !text-[white] hover:!bg-[white] hover:!text-firstColorBg"
    //         height={"32px"}
    //         borderRadius="4px"
    //         onClick={() => router.push("/login")}
    //       >
    //         Sign In
    //       </Button>
    //     </li>
    //     <li>
    //       <Button
    //         height={"32px"}
    //         borderRadius="4px"
    //         className="!text-firstColorBg hover:!bg-firstColorBg hover:!text-[white] border-[1px] hover:border-[white]"
    //         onClick={() => router.push("/signup")}
    //       >
    //         Sign Up
    //       </Button>
    //     </li>
    //   </>
    // }
    if (token) {
      return <>
        {/* <li className="mr-4">
          <NavUserProfile />
        </li> */}
         <Link
            href={"/admin/manage-blog"}
            className={`block md:px-4 transition text-[white] text-[16px] font-[600]`}
          >
          Admin
          </Link>
        <li >
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
        </li>
      </>
    }
  }

  return (
    <>
      <Box className="max-md:mb-4">
        <header>
          <input
            onClick={onOpen}
            type="checkbox"
            name="hbr"
            id="hbr"
            className="hbr peer"
            hidden
            aria-hidden="true"
          />
          <nav
            // style={{ background: theme?.headerColor }}
            className="fixed z-20 w-full h-[78px] backdrop-blur bg-firstColorBg navbar shadow-2xl shadow-gray-600/5 border-gray-100 peer-checked:navbar-active dark:shadow-none"
          >
            <div className="!max-w-[1280px] !w-full m-auto h-[100%] mobile_screen_hr_gap">
              <div className="flex items-center h-[100%] justify-between gap-6 md:py-3 md:gap-0 py-1">
                <Image src={Logo?.src} alt={Logo?.src} className="w-[164px] object-cover cursor-pointer" onClick={() => router.push("/")} />
                <div className="w-full items-center flex justify-end gap-5 md:w-auto">
                  <label
                    htmlFor="hbr"
                    className="peer-checked:hamburger block relative z-20 order-2 cursor-pointer md:hidden"
                  >
                    <div
                      aria-hidden="true"
                      className="m-auto h-0.5 w-5 rounded !bg-[white] transition duration-300"
                    />
                    <div
                      aria-hidden="true"
                      className="m-auto mt-2 h-0.5 w-5 rounded !bg-[white] transition duration-300"
                    />
                  </label>
                  <Link href="/">
                    {/* <Image
                      // src={theme?.logo}
                      src={logoImage.src}
                      alt="logo"
                      height="56px"
                      className="py-[2px] max-sm:!h-[60px]"
                    /> */}
                  </Link>
                  {/* <IconPhoneCall
                    size={26}
                    stroke={1.4}
                    className="md:!hidden text-[white] order-1"
                    onClick={() => router.push("tel:+64 211172680")}
                  /> */}
                </div>
                <div className="navmenu hidden w-full flex-wrap justify-end items-center mb-16 space-y-8 p-6 border border-gray-100 rounded-3xl shadow-2xl shadow-gray-300/20 bg-white md:space-y-0 md:p-0 md:m-0 md:flex md:flex-nowrap lg:bg-transparent md:w-7/12 md:shadow-none md:border-0">
                  <div className="text-gray-600">
                    <ul className="space-y-6 tracking-wide font-medium text-base md:text-sm md:flex md:space-y-0 items-center">
                      {Array.from(menu).map((item: any, index: any) => {

                        if (item?.children?.length) {
                          return (
                            <Menu key={index}>
                              <MenuButton className="!transition !duration-800 ease-in-out">
                                <a
                                  href="#"
                                  className="block md:px-4 transition !text-[white]"
                                >
                                  <Text
                                    textColor={theme?.textSecondaryColor}
                                    className="inline font-bold"
                                  >
                                    {item.name}
                                  </Text>
                                  <ChevronDownIcon
                                    textColor={theme?.textSecondaryColor}
                                    fontSize={"18px"}
                                  />
                                </a>
                              </MenuButton>
                              <MenuList>
                                {item?.children?.map(
                                  (child: any, idx: number) => (
                                    <MenuItem
                                      key={idx}
                                      onClick={() => router.push(child?.path)}
                                    >
                                      <Text
                                        // textColor={theme?.textSecondaryColor}
                                        className="inline !capitalize"
                                      >
                                        {child?.name}
                                      </Text>
                                    </MenuItem>
                                  )
                                )}
                              </MenuList>
                            </Menu>
                          );
                        } else {
                          return (
                            <li key={index}>
                              <Link
                                href={item?.path}
                                className={`block md:px-4 transition text-[white] text-[16px] ${item?.path === router?.pathname ? "underline-offset-[14px] underline" : null} font-[600]`}
                              >
                                {/* <Text
                                  // textColor={theme?.textSecondaryColor}
                                  className="inline"
                                > */}
                                {item?.name}
                                {/* </Text> */}
                              </Link>
                            </li>
                          );
                        }
                      })}

                      {renderSingInSignUpBtn()}

                    </ul>

                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </Box>
      <DraverNav isOpen={isOpen} onClose={onClose} brands={menu} />
    </>
  );
};

export default Navbar;
