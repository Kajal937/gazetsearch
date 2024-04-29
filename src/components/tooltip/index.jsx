import React from "react";
import { Tooltip } from "@chakra-ui/react";

const TooltiPage = ({ children, label, open,bgColor }) => {

  return (
    <Tooltip
      placement="top"
      label={label}
      arrowSize={15}
      isOpen={open}
      hasArrow
      textColor={"#fff"}
      bg={bgColor}
      ml={"2"}
    >
      {children}
    </Tooltip>
  );
};

export default TooltiPage;
