import React, { useState } from "react";
import { Box, Heading, Image, Tag, Text } from "@chakra-ui/react";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import "./style.scss"

const BlogCard = ({ data }) => {
  const router = useRouter()

  const date = new Date(data?.createdAt);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const formattedTime = `${month}  ${day}, ${year}`;

  const predefinedColors = ['#fa785280',
    '#a5a5ff', '#ffa9ff', '#b8e6e6', '#f1daae',
    '#d9b0c7', '#b0ced9', '#a0ca9d', "#fbbbbb", "#c6cfc4c2", "#ff8181"
  ];

  const tag = [
    "khsuh", "vinder", "singh", "maan", "June", "ganganar", "hanumangarh", "bikaner", "ludhiana"
  ]

  return <Box key={data?.key} onClick={() => router.push(`/blog/${data?.slug}`)} className="cursor-pointer box-border flex flex-col" >
    <Image
      src={data?.image}
      // width={200}
      // height={400}
      // style={{ borderRadius: "18px", objectFit: "cover",  }}
      className="w-full h-[260px] object-cover rounded-[18px]"
    />
    {/* <Box className="flex flex-wrap gap-2 my-4 items-center">
      {tag?.map((v, index) => {
        const colorIndex = index % predefinedColors.length;
        const bgColor = predefinedColors[colorIndex];
        return <Tag key={index} style={{ backgroundColor: "#e5e5e5" }} className="!text-[10px] capitalize !text-[black] font-[500] py-0 px-2 !rounded-[6px]">{v}</Tag>
      })}
    </Box> */}
    <Heading className="capitalize !text-[16px] font-[600] my-3 truncate">{data?.name}</Heading>
    <Text className="capitalize !text-[12px] font-[500] text-[#7E7F82] mb-6">
      {data?.summary?.length <= 170
        ? data?.summary
        : `${data?.summary?.slice(0, 170)}..... `}
    </Text>
    <Box className="flex justify-between !mt-auto">
      <Box className="flex gap-2">
        {/* <Image src={"https://img.freepik.com/premium-photo/portrait-happy-young-casual-man-standing_171337-29744.jpg"} alt="https://img.freepik.com/premium-photo/portrait-happy-young-casual-man-standing_171337-29744.jpg" width={"36px"}
          height={"36px"}
          style={{ borderRadius: "50%", objectFit: "cover" }} /> */}
      <Text className="capitalize !text-[12px] text-[#7E7F82] font-[500] self-end">{formattedTime}</Text>
        <Box className="flex flex-col -mt-[4px]">
          {/* <Text className="capitalize text-[12px] font-[600] text-[black] flex gap-1"><Text opacity={0.6}>added by:</Text> Khushvinder singh</Text> */}
          {/* <Text className="capitalize text-[12px] font-[500] text-[#7E7F82]">react develope</Text> */}
        </Box>
      </Box>
    </Box>
  </Box>
}

export default BlogCard;