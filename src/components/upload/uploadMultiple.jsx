import { compressImage } from "../../utility/utility";
import { Box, Button, Image } from "@chakra-ui/react";
import ConfirmationPopup from "../confirmationModal/index";

const UploadMultiple = ({ loading, formData, setFormData, files, setFiles, handleCancel, handleSave }) => {
  const handleFileChange = async (event) => {
    const files = event.target.files;
    const targetSize = 300 * 1024;
    const quality = 0.7;
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      const compressedImage = await compressImage(file, targetSize, quality);
      setFiles((prevImages) => [...prevImages, { file: compressedImage }]);
    }
  };

  const onChangeHandleFun = (values, idx) => {
    const data = files?.map((item, index) =>
      idx === index
        ? {
            ...item,
            ...values
          }
        : {
            ...item,
          }
    );
    setFiles(data);
  };

  const handleDelete = (index) => {
    const thumnails = files?.filter((_, idx) => idx !== index);
    setFiles(thumnails);
  };

  const handleDelete2 = (index) => {
    const thumbnails = formData?.thumbnails?.filter((_, idx) => idx !== index);
    setFormData({...formData, thumbnails});
  };

  return (
    <div className="create-location-upload-image !w-full">
      <Box className="flex justify-center">
        <input
          type="file"
          name="file"
          accept="image/*"
          multiple
          id="fileInputImages"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <Button
          style={{ margin: "10px 0" }}
          isLoading={false}
          onClick={() => document.getElementById("fileInputImages").click()}
          className="flex items-center justify-center w-[132px] !h-[32px] cursor-pointer !bg-[#8d53ff] !text-white !rounded-[4px] font-[500]"
        >
          Choose Files
        </Button>
      </Box>
      <Box>
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 my-3">

        {files?.length ? (
            files?.map((v, index) => {
              return (
                <Box
                  key={index}
                  display={"flex"}
                  gap={4}
                  flexDirection={"column"}
                >
                  <Box className="flex flex-col items-end gap-2 bg-white dark:bg-[#ffffff0d] dark:border-none shadow-lg hover:shadow-xl border-[1px] border-[#f4f0f7] overflow-hidden rounded-[6px]">
                    <Image height={"300px"} width={"100%"} objectFit={"cover"} src={URL.createObjectURL(v?.file)} alt="logo" />

                    <Box className="p-[6px] !w-full flex flex-col items-end gap-2">
                      <ConfirmationPopup
                        handleDelete={() => handleDelete(index)}
                      />
                    </Box>
                  </Box>
                </Box>
              );
            })
        ) : null}

        {
          formData?.thumbnails?.length ?
          formData?.thumbnails?.map((v, index) => {
            return (
              <Box
                key={index}
                display={"flex"}
                gap={4}
                flexDirection={"column"}
              >
                <Box className="flex flex-col items-end gap-2 bg-white dark:bg-[#ffffff0d] dark:border-none shadow-lg hover:shadow-xl border-[1px] border-[#f4f0f7] overflow-hidden rounded-[6px]">
                  <Image height={"300px"} width={"100%"} objectFit={"cover"} src={v} alt="logo" />

                  <Box className="p-[6px] !w-full flex flex-col items-end gap-2">
                    <ConfirmationPopup
                      handleDelete={() => handleDelete2(index)}
                    />
                  </Box>
                </Box>
              </Box>
            );
          })
       : null
        }
          </Box>
      
        {/* {files?.length ? ( */}
          <Box className="flex justify-end gap-4 my-3">
            <Button
            isDisabled={loading}
              _hover={{ bg: "transprant" }}
              onClick={handleCancel}
              className="!bg-[red] !text-[white] !border-none !rounded-[4px] !h-[34px] !pointer-events-autotext-[14px]"
            >
              Cancel
            </Button>
            <Button
            isLoading={loading}
              _hover={{ bg: "transprant" }}
              onClick={handleSave}
              className="!bg-[#8d53ff] !text-[white] !border-none !rounded-[4px] !h-[34px] !pointer-events-autotext-[14px]"
            >
              Save
            </Button>
          </Box>
        {/* ) : null} */}
      </Box>
    </div>
  );
};

export default UploadMultiple;
