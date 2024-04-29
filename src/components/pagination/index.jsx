import { Stack, Text } from "@chakra-ui/react";
import { Paginate } from "react-paginate-chakra-ui";
import "./style.css";
import { convertValuesQueryString } from "@/utility/utility";
import { useRouter } from "next/router";

const Pagination = (props) => {
  const router = useRouter();
  const handlePageClick = (p) => {
    const payload = {
      ...router?.query,
      page: p + 1,
      limit: props?.pageSize || 10
    };
    router.push(convertValuesQueryString(payload));
  };
  return (
    <Stack
      p={5}
      className="pagination_container flex !flex-row flex-wrap justify-between items-center !px-0"
    >
      <Text className="text-[14px] pl-[14px]">
        Page: {Number(router?.query?.page) || 1}
      </Text>
      <Paginate
        page={Number(router?.query?.page) - 1 || 0}
        count={props?.total || 0}
        pageSize={props?.pageSize || 10}
        onPageChange={handlePageClick}
        margin={2}
        shadow="md"
        border="1px solid"
        colorScheme={"green"}
      />
    </Stack>
  );
};

export default Pagination;
