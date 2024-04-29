import { use, useEffect, useState } from "react";
import { Box, Button, Heading, Image, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navbar from "../../../components/navbarSection/navbar";
import TextInput from "../../../components/input/textInput";
import TextAreaInput from "../../../components/input/textAreaInput";
import theme from "@/utility/theme/theme.json";
import MarkdownEditor from "../../../components/markdownEditor";
import { useBlogDetailQuery, useUpdateBlogMutation } from "../../../apis/blog";
import ChakraSpinner from "@/components/spinner";
import { toast } from "react-toastify";
import UploadSingle from "../../../components/uploadSingle";
import { validateRequiredField } from "../../../utility/utility";

const EditBlog = () => {
  const [formData, setFormData] = useState({});
  const [url, setUrl] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

  // fetch blog
  const {
    data: blog,
    refetch: refetchBlog,
    isLoading: isLoading,
  } = useBlogDetailQuery(slug);
  const { mutate: updateBlogMutate, isLoading: isLoading0 } =
    useUpdateBlogMutation();

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

  // handle save fun
  const handleSave = () => {
    // validation check
    if (validateRequiredField(formData?.name && formData?.summary && url)) {
      return toast.warning(
        validateRequiredField(formData?.name && formData?.summary && url),
        { position: "top-center", autoClose: 600 }
      );
    }
    const payload = {
      ...formData,
      image: url,
    };
    updateBlogMutate(payload, {
      onSuccess: () => {
        refetchBlog();
        router.back();
      },
    });
  };

  useEffect(() => {
    setFormData(blog?.data);
    setUrl(blog?.data?.image);
  }, [blog]);

  return (
    <>
      <Navbar />
      <Box className="max-w-[1280px] w-full mx-auto max-[767px]:mt-[78px] mb-6 mt-[130px] m-auto mobile_screen_hr_gap">
        {isLoading || isLoading0 ? (
          <Box className="flex justify-center items-center scroll-list px-2 py-[3px] text-sm h-[80vh] overflow-auto flex-col gap-1">
            <ChakraSpinner />
          </Box>
        ) : (
          <>
            <Heading fontSize={"22px"} className="capitalize !font-[500]">
              Edit Blog
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
                width={150}
                height={150}
                border={[10, 10]}
              />
            </Box>
            <Box className="grid grid-cols-1 gap-4 mb-5">
              <TextInput
                //  data-aos="fade-up"
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
                  //  data-aos="fade-up"
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

                    if (newValue?.length >= 150) {
                      e.preventDefault(); // Prevent further typing or input
                      return;
                    }
                  }}
                //  textColor={theme?.textPrimaryColor}
                />
                <Text className="capitalize self-end !text-[#00000066] text-[14px]">
                  {formData?.summary?.length > 150 ? 150 : formData?.summary?.length} / 150
                </Text>
              </Box>
              <Box className="flex gap-[4px]">
                <MarkdownEditor
                  label="Description"
                  value={formData?.description || ""}
                  handleEditorChange={handleEditorChange}
                />
              </Box>
            </Box>
            <Button
              onClick={handleSave}
              //   isLoading={btnLoading}
              className="!bg-firstColorBg !text-[white] mb-3 !flex mx-auto"
              // textColor={"white"}
              variant="none"
              height={"32px"}
              borderRadius={"4px"}
            >
              Save
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

export default EditBlog;

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
