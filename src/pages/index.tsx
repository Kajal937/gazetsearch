import React from "react";
import InfiniteScrollComp from "../components/InfiniteScrollComp/InfiniteScrollComp";
import { Box } from "@chakra-ui/react";
import "../components/card/blogCard/style.scss";
import Navbar from "../components/navbarSection/navbar";
import { useBlogsQuery } from "@/apis/blog";
import BlogCard from "../components/card/blogCard/index"
import ChakraSpinner from "@/components/spinner";

const Home = () => {
  const {
    data: blogs,
    isLoading: isLoading0,
    hasNextPage,
    fetchNextPage,
  } = useBlogsQuery();

  const renderItem = (v: any, index: number) => {
    return <BlogCard key={index} data={v} />;
  };

  if(isLoading0){
    return <Box className="flex justify-center items-center scroll-list px-2 py-[3px] text-sm h-[80vh] overflow-auto flex-col gap-1">
    <ChakraSpinner />
  </Box>
  }

  return (
    <>
      <Navbar />
      <Box className="mx-auto mb-6  mt-[50px] sm:mt-[90px] m-auto mobile_screen_lr_p">
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
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 grid-rows-2 mb-6 !mt-9"
        />
      </Box>
    </>
  );
};

export default Home;
