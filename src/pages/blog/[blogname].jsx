import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../components/navbarSection/navbar";
import theme from "@/utility/theme/theme.json";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useBlogDetailQuery } from "../../apis/blog";
import ChakraSpinner from "@/components/spinner";
import MarkdownIt from "markdown-it";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

const BlogDetails = () => {
  const router = useRouter();
  const { blogname } = router.query;
  const mdParser = new MarkdownIt();

  const { data: blogDetails, isLoading: isLoading } =
    useBlogDetailQuery(blogname);

  return (
    <>
      <Navbar />

      <Box className="max-w-[1280px] w-full mx-auto max-[767px]:mt-[90px] mb-6 mt-[90px] m-auto mobile_screen_hr_gap">
        {isLoading ? (
          <Box className="flex justify-center items-center scroll-list px-2 py-[3px] text-sm h-[80vh] overflow-auto flex-col gap-1">
            <ChakraSpinner />
          </Box>
        ) : (
          <>
            <Button
              _hover={{ bg: "transprant" }}
              background={"none"}
              className="!text-gray-500 !text-[14px] !font-[500] underline text-right !pl-0 !bg-none !flex !justify-end cursor-pointer items-center"
              onClick={() => router.back()}
            >
              <IconArrowNarrowLeft
                size={"18px"}
                className="ml-1 !text-[#00000061] mt-[1px]"
              />{" "}
              Back
            </Button>
            <Heading
              id="title"
              className="text-3xl font-medium text-[black] pb-4 capitalize"
            >
              {blogDetails?.data?.name}
            </Heading>
            <Text className="text-[20px] mb-5 capitalize">
              {blogDetails?.data?.summary}
            </Text>
            <Box>
              <Image
                id="image"
                className="w-full !object-cover rounded-[4px]"
                src={blogDetails?.data?.image}
                alt="Twice"
                style={{ maxHeight: "550px" }}
              />
            </Box>
            {blogDetails?.data?.description ? (
              <Box className="py-5 rounded-lg rounded-t-none flex-shrink-0">
                <div
                  className="markdown_css"
                  dangerouslySetInnerHTML={{
                    __html: mdParser.render(blogDetails?.data?.description),
                  }}
                />
              </Box>
            ) : null}
          </>
        )}
        {/* </div> */}
      </Box>
    </>
  );
};

export default BlogDetails;
