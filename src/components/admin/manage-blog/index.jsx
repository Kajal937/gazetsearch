import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Box,
  Button,
  Image
} from "@chakra-ui/react";
import Pagination from "@/components/pagination/index";
import { useRouter } from "next/router";
import ChakraSpinner from "@/components/spinner";
import theme from "@/utility/theme/theme.json";
import ConfirmationPopup from "../../confirmationModal/index";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { useBlogQuery, useDeleteBlogMutation } from "../../../apis/blog";



const ManageBlog = () => {
  const [idx, setIdx] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { page } = router.query

  const payload = {
    page: page || 1,
  };
  // fetch blog api
  const { data: blog, refetch: refetchBlog, isLoading: isLoading } = useBlogQuery(payload)

  // blog delete api
  const { mutate: deleteBrandMutate, isLoading: isLoading1 } = useDeleteBlogMutation();

  const handleDeleteFun = (id) => {
    deleteBrandMutate(id, {
      onSuccess: () => {
        refetchBlog();
      }
    })
  }


  // const {
  //   data: contacts,
  //   refetch: refetchContacts,
  //   isLoading: isLoading1,
  // } = useContactQuery(router?.query);
  // const { mutate: updateMutate, isLoading: isLoading2 } =
  //   useUpdateContactMutation();

  // const onSwitchChange = (values) => {
  //   updateMutate(values, {
  //     onSuccess: () => {
  //       refetchContacts();
  //       setFormData({});
  //     },
  //   });
  // };

  const handleClick = (index) => {
    setIdx(index);
    setIsOpen(!isOpen);
  };

  if (isLoading || isLoading1) {
    return (
      <Box className="flex justify-center items-center scroll-list px-2 py-[3px] text-sm h-[80vh] overflow-auto flex-col gap-1">
        <ChakraSpinner />
      </Box>
    );
  }

  return (
    <>
      <Text
        textColor={theme?.textPrimaryColor}
        className="!text-[20px] text-center !font-[700] pb-[4px] mb-7"
      >
        Manage Blogs
      </Text>
      <Button
        // textColor={theme?.textPrimaryColor}
        //  className="!w-[132px] !ml-auto mt-3 "
        className="!bg-firstColorBg !text-[white] border-0 !rounded-[4px] !h-[32px] !px-2 !flex !ml-auto max-sm:order-1 mb-4"
        onClick={() => router.push(`/blog/create`)}
      >
        Add Blog
      </Button>
      <TableContainer className="table-scroll-list !overflow-y-auto">
        <Table variant="simple" size="sm">
          <Thead height={"38px"}>
            <Tr className="!bg-[#d0cfcf]">
              <Th className="!text-center !text-[14px] !font-[600]">Image</Th>
              <Th className="!text-center !text-[14px] !font-[600]">Name</Th>
              <Th className="!text-center !text-[14px] !font-[600]">
                Summary
              </Th>
              <Th className="!text-center !text-[14px] !font-[600]">
                Description
              </Th>
              <Th className="!text-center !text-[14px] !font-[600] dark:text-[white] dark:border-[#826e6e44]">
                Slug
              </Th> <Th className="!text-center !text-[14px] !font-[600] dark:text-[white] dark:border-[#826e6e44]">
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {blog?.data?.map((item, index) => (
              <Tr key={index}>
                <Td className="capitalize !text-center !px-0">
                  <Image
                    src={item?.image}
                    width={"52px"}
                    height={"52px"}
                    className="!rounded-[4px] object-cover"
                  />
                </Td>
                <Td className="capitalize !text-center cursor-pointer hover:underline hover:text-firstColorBg" onClick={() => router.push(`/blog/${item?.slug}`)}>{item?.name}</Td>
                <Td className="capitalize !text-center">
                  <Box
                    className={`${item?.summary?.length >= 28 ? "group" : null
                      } !relative min-[601px]:w-[182px] w-[182px]`}
                  >
                    <Text className="!text-[14px] text-gray-600 truncate">
                      {item?.summary}
                    </Text>
                    <Box className="hidden group-hover:block !absolute mt-[2x] text-white p-1 flex-col items-center w-[300px]">
                      <Text className="relative z-50 p-2 whitespace-normal text-justify text-xs leading-[16px] text-white bg-[#d5d5d5] shadow-lg rounded-[4px]">
                        {item?.summary}
                      </Text>
                      <Box className="w-3 h-3 absolute left-[41%] top-[0px] rotate-45 bg-[#d5d5d5]"></Box>
                    </Box>
                  </Box>
                </Td>
                <Td
                  className="capitalize !text-center"
                  onClick={() => handleClick(index)}
                >
                  <Box
                    className={`${item?.description?.length >= 28 ? "group" : null
                      } !relative min-[601px]:w-[182px] w-[182px]`}
                  >
                    <Text className="!text-[14px] text-gray-600 truncate">
                      {item?.description}
                    </Text>
                    <Box className="hidden group-hover:block !absolute mt-[2x] text-white p-1 flex-col items-center w-[300px]">
                      <Text className="relative z-50 p-2 whitespace-normal text-justify text-xs leading-[16px] text-white bg-[#d5d5d5] shadow-lg rounded-[4px]">
                        {item?.description}
                      </Text>
                      <Box className="w-3 h-3 absolute left-[41%] top-[0px] rotate-45 bg-[#d5d5d5]"></Box>
                    </Box>
                  </Box>
                  {/* </Td> */}
                </Td>
                <Td className="!text-center dark:border-[#826e6e44]">
                  {item?.slug}
                </Td>
                <Td className="!text-center dark:border-[#826e6e44]">
                  <Box className="text-sm font-normal tracking-wide flex gap-4">
                    <IconEdit
                      className="w-[14px] cursor-pointer dark:text-dark_mode"
                      onClick={() => router.push(`/blog/edit/${item?.slug}`)}
                    />
                    <ConfirmationPopup
                      loading={isLoading1}
                      handleDelete={() => handleDeleteFun(item?._id)}
                    />
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Pagination total={blog?.total} pageSize={blog?.data?.length} />
      </TableContainer>
    </>
  );
};

export default ManageBlog;
