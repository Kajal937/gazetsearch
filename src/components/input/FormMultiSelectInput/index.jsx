import React from "react";
import CreatableSelect from "react-select/creatable";
import { Box, Text } from "@chakra-ui/react";
import { convertValuesArray } from "../../../utility/utility";

const FormMultiSelectInput = ({
  required = false,
  isDisabled,
  isLoading,
  label,
  isInvalid,
  errorMsg,
  dataLength,
  isMulti,
  values,
  setValues,
  width = "100%",
  placeholder,
  onChange = () => {},
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const checkValues = (values) => {
    return convertValuesArray(values)?.map((val) => {
      return {
        value: val?.value || val,
        label: val?.value || val,
      };
    });
  };

  const handleKeyDown = (event) => {
    const isMatch = convertValuesArray(values)?.some(
      (item) => item === inputValue?.toLowerCase()?.trim()?.replace(/ +/g, " ")
    );
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        if (isMatch) {
          return setInputValue("");
        }
        setValues({
          tags: [
            ...values,
            inputValue?.toLowerCase()?.trim()?.replace(/ +/g, " "),
          ],
        });
        setInputValue("");
        event.preventDefault();
    }
  };
  return (
    <Box className="multi-select-field" style={{ width: width }}>
      {label ? (
        <Box className="label-container">
          <Text className="!text-[14px] text-[black] capitalize !font-[500] mb-1">
            {label}{" "}
            <Text as={"span"} className="required text-[red] !text-[14px]">
              {required ? "*" : null}
            </Text>
          </Text>
        </Box>
      ) : null}

      <Box
        className={`input-field-container ${
          isInvalid ? "border-[1px] !border-[red]" : null
        }`}
      >
        <CreatableSelect
          className={`${
            !!errorMsg && !dataLength
              ? "border-[1px] border-[red] rounded-[4px]"
              : null
          }`}
          autoFocus={false}
          isDisabled={isDisabled}
          menuPlacement={"bottom"}
          placeholder={placeholder || "Type something and press enter..."}
          isMulti={isMulti}
          isClearable={true}
          isLoading={isLoading}
          menuPosition="fixed"
          menuIsOpen={false}
          inputValue={inputValue}
          onChange={onChange}
          onInputChange={(newValue) => setInputValue(newValue)}
          onKeyDown={handleKeyDown}
          components={{
            DropdownIndicator: null,
          }}
          value={checkValues(values)}
        />
      </Box>
    </Box>
  );
};

export default FormMultiSelectInput;
