import { Input, Text } from "@chakra-ui/react";
import React from "react";

const TextInput = (props) => {
  return (
    <div className="select-container" style={{ width: props.width || "100%" }}>
      {props?.label ? (
        <div className="label-container">
          <Text className="!text-[14px] text-gray-600 !font-[500] mb-1">
            {props?.label}
            <span className="required text-[red] !text-[18px]">
              {props?.required ? "*" : null}
            </span>
          </Text>
        </div>
      ) : null}

      <div className="input-field-container">
        <Input
        {...props}
          autoComplete="undefined"
          autoFocus={false}
          className="!h-[40px] rounded-[4px] !border-[1px] !border-[#CBD5E0] placeholder:text-[#474747ad] focus-visible:!shadow-none focus-visible:!outline-none !px-3"
        />
      </div>
    </div>
    // <Input
    // type={type}
    //   placeholder={placeholder}
    //   value={value}
    //   onChange={onChange}
    //   textColor={theme?.textPrimaryColor}
    //   className="!bg-[#00000008] !rounded-[99px] h-[42px] focus-visible:!shadow-none focus-visible:!outline-none pb-[4px] !border-[#bbb9b993] placeholder:text-[#474747ad]"
    // />
  );
};

export default TextInput;
