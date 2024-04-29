import React from "react";
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { IconTrash } from "@tabler/icons-react";

const ConfirmationModal = ({ loading, handleDelete }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom"
      closeOnBlur={false}
    >
      <PopoverTrigger>
          <IconTrash
          cursor={"pointer"}
            className="!w-[16px] stroke-[red] !min-w-[16px]"
            onClick={(e) => {
              e.stopPropagation();
              return onToggle();
            }}
          />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody
          fontSize={"12px"}
          padding={"16px"}
          className="!font-semibold !uppercase !tracking-wide"
        >
          Are you sure you want to delete?
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              N
            </Button>

            <Button
              colorScheme="red"
              isLoading={loading}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
                onClose();
              }}
            >
              Y
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default ConfirmationModal;
