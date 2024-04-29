import React, { useState } from "react";
import {
  Text,
  Box,
  Button,
  Heading
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ChakraSpinner from "@/components/spinner";
import theme from "@/utility/theme/theme.json";
import { useBlogQuery, useBlogsQuery, useDeleteBlogMutation } from "../../apis/blog";
import Navbar from "../../components/navbarSection/navbar"
import InfiniteScrollComp from "../../components/InfiniteScrollComp/InfiniteScrollComp";
import BlogCard from "../../components/card/blogCard/index"




const YourBlogs = () => {
  const router = useRouter();
  const {
    data: blogs,
    isLoading: isLoading0,
    hasNextPage,
    fetchNextPage,
  } = useBlogsQuery();

  const renderItem = (v, index) => {
    return <BlogCard key={index} data={v} />;
  };

  if (isLoading0) {
    return <Box className="flex justify-center items-center scroll-list px-2 py-[3px] text-sm h-[80vh] overflow-auto flex-col gap-1">
      <ChakraSpinner />
    </Box>
  }


  return (
    <>
      <Navbar />
      <Box className="max-w-[1280px] w-full mx-auto max-[1280px]:px-4 mt-[100px]">
        <Heading textColor={theme?.textPrimaryColor} fontSize={"22px"} className="capitalize !font-[500]">
          Your Blogs
        </Heading>
        <Button
          // textColor={theme?.textPrimaryColor}
          //  className="!w-[132px] !ml-auto mt-3 "
          className="!bg-firstColorBg !text-[white] border-0 mx-auto !rounded-[4px] !p-2 !flex w-[120px] max-sm:order-1 mb-4"
          onClick={() => router.push(`/blog/create`)}
        >
          Add Blog
        </Button>

        <Box className="mx-auto mb-6  mt-[50px] sm:mt-[10px] m-auto mobile_screen_lr_p">
          <InfiniteScrollComp
            data={blogs}
            isLoading={isLoading0}
            renderItem={renderItem}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            loader={
              !isLoading0 ? (
                <Box className="col-span-2 w-full grid place-items-center mt-7">
                  <Box
                    className="w-[40px] h-[40px] rounded-full animate-spin
        border-[3px] border-solid border-[#1f1f1f] border-t-0 border-r-0"
                  ></Box>
                </Box>
              ) : null
            }
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-[60px] grid-rows-2 mb-6 !mt-9"
          />
        </Box>
      </Box>
    </>
  );
};

export default YourBlogs;
