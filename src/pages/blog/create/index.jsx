import { useState } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navbar from "../../../components/navbarSection/navbar";
import TextInput from "../../../components/input/textInput";
import TextAreaInput from "../../../components/input/textAreaInput";
import theme from "@/utility/theme/theme.json";
import MarkdownEditor from "../../../components/markdownEditor";
import { useCreateBlogMutation } from "../../../apis/blog";
import UploadSingle from "../../../components/uploadSingle";
import { fetchValuesJsonFromLocalStorage, validateRequiredField } from "../../../utility/utility";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const userId = fetchValuesJsonFromLocalStorage("userId")

  const [formData, setFormData] = useState({});
  const [url, setUrl] = useState(null);
  const router = useRouter();

  // create blog post api
  const { mutate: createBlog, isLoading: isLoading } = useCreateBlogMutation();

  // handleChange
  const handleChange = (updatedField) => {
    setFormData((prevData) => ({
      ...prevData,
      ...updatedField,
    }));
  };

  // markdown editor vlaue
  const handleEditorChange = ({ html, text }) => {
    setFormData({ ...formData, description: text });
  };

  const handleSave = () => {
    if (validateRequiredField(formData?.name && formData?.summary && url)) {
      return toast.warning(
        validateRequiredField(formData?.name && formData?.summary && url),
        { position: "top-center", autoClose: 600 }
      );
    }
    const payload = {
      ...formData,
      user: userId,
      image: url,
    };
    createBlog(payload, {
      onSuccess: () => {
        router.back();
      },
    });
  };
  return (
    <>
      <Navbar />
      <Box className="max-w-[1280px] w-full mx-auto max-[767px]:mt-[78px] mb-6 mt-[130px] m-auto mobile_screen_hr_gap">
        <Heading fontSize={"22px"} className="capitalize !font-[500]">
          Create Blog
        </Heading>
        <Box className="flex justify-center my-4">
          <UploadSingle
            url={url}
            setUrl={setUrl}
            style={{
              width: "330px",
              height: "320px",
              borderRadius: "4px",
              objectFit: "cover",
            }}
            width={170}
            height={170}
            border={[10, 10]}
          />
        </Box>
        <Box className="grid grid-cols-1 gap-4 mb-5">
          <TextInput
            required
            label="Name"
            type="text"
            placeholder="Blog Name"
            value={formData?.name}
            onChange={(e) => handleChange({ name: e?.target?.value })}
            textColor={theme?.textPrimaryColor}
          />
          <Box className="flex gap-[4px] flex-col">
            <TextAreaInput
              required
              label="Summary"
              type="text"
              placeholder="Blog Summary"
              value={formData?.summary}
              onChange={(e) => {
                const newValue = e.target.value.replace(/\s/g, "");
                if (newValue?.length <= 149) {
                  handleChange({ summary: e?.target?.value });
                }
                if (newValue?.length > 150) {
                  e.preventDefault(); // Prevent further typing or input
                  return;
                }
              }}
            />
            <Text className="capitalize self-end !text-[#00000066] text-[14px]">
              0 / 150
            </Text>
          </Box>
          <Box className="flex gap-[4px]">
            <MarkdownEditor
              label="Description"
              value={formData?.description || ""}
              setFormData={setFormData}
              handleEditorChange={handleEditorChange}
            />
          </Box>
        </Box>
        <Button
          onClick={handleSave}
          //   isLoading={btnLoading}
          className="!bg-firstColorBg !text-[white] !flex mx-auto mb-3"
          // textColor={"white"}
          variant="none"
          height={"32px"}
          borderRadius={"4px"}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default CreateBlog;

export const getServerSideProps = async (context) => {
  if (context.req.cookies.accessToken) {
    return {
      props: {}
    };
  }
  return {
    redirect: {
      destination: "/",
    },
  };
};