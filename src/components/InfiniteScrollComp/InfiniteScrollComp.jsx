import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteScrollComp = ({
  data,
  isLoading,
  renderItem,
  hasNextPage,
  fetchNextPage,
  loader,
  className,
}) => {
  const total = data?.pages?.find((item) => item);
  const flattenData = data?.pages?.flatMap((page) => page?.data);

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <InfiniteScroll
      dataLength={flattenData?.length || 20}
      next={loadNext}
      hasMore={flattenData?.length !== total?.total}
    //   loader={<Spin loading={isLoading} />}
    //   loader={ <p style={{ textAlign: 'center' }}>
    //         <b>Loading</b>
    //       </p>}
      //   endMessage={
      //     <p style={{ textAlign: 'center' }}>
      //       <b>Yay! You have seen it all</b>
      //     </p>
      //   }
    >
      <div className={className}>
        {flattenData?.map((_, index) => renderItem(_, index))}
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollComp;
