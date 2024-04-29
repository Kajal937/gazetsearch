import React from "react";
import Select from "react-select";
import { capitalizeFirstLetter } from "@/utility/utility";
import { Text } from "@chakra-ui/react";

interface MyComponentProps {
  required?: any,
  isLoading?: any,
  isDisabled?: any,
  placeholder?: any,
  value?: any,
  label?: any,
  options?: any,
  width?: any,
  onChange?: any
}


const FormSelect: React.FC<MyComponentProps> = ({
  required = false,
  isLoading,
  isDisabled,
  placeholder,
  value,
  label,
  options = [],
  onChange,
  width = "100%",
}) => {
  return (
    <div className="select-container" style={{ width: width }}>
      {label ? (
        <div className="label-container">
          <Text className="!text-[14px] text-gray-600 !font-[500] mb-1">
            <span className="required text-[red] !text-[18px]">
              {required ? "*" : null}
            </span>
            {label}{" "}
          </Text>
        </div>
      ) : null}

      <div className="input-field-container">
        <Select
      // menuIsOpen={true}
          autoFocus={false}
          menuPlacement={"bottom"}
          isLoading={isLoading}
          isDisabled={isDisabled}
          isClearable
          placeholder={placeholder || null}
          options={options?.map((e: any) => {
            return {
              object: e,
              value: e?.value,
              label: e?.value,
            };
          })}
          value={
            value
              ? {
                  label: value,
                  value: value,
                }
              : null
          }
          onChange={onChange}
          // menuPosition="fixed"
        />
      </div>
    </div>
  );
};

export default FormSelect;
