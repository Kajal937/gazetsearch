import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRegisterMutation } from "../../apis/auth";
import { validatePassword, validateRequiredField } from "../../utility/utility";
import theme from "@/utility/theme/theme.json";
import Logo from "../../images/logotwo.png"
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { GoogleButton } from "../../components/googleButton";

const SignUp = () => {
  const [formData, setFormData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { mutate: registerMutation, isLoading: isLoading } = useRegisterMutation();

  const handleSubmit = () => {
    if (
      validateRequiredField(formData?.username) ||
      validatePassword(formData?.password)
    ) {
      return toast.warning(
        validateRequiredField(formData?.username) ||
        validatePassword(formData?.password), { position: "top-center", autoClose: 600 }
      );
    }

    registerMutation(formData, {
      onSuccess: (res) => {
        return router.push("/login");
      },
    });
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true)
    try {
      await signIn("google");
    } catch (error) {
      setIsSubmitting(false)
    }
  };

  return (
    <>
      <Box className="max-w-[1280px] w-[100%] m-auto max-[1280px]:px-4">
        <Box className="w-[500px] max-[501px]:max-w-[500px] max-[501px]:w-[unset] shadow-md m-auto px-9 pb-8 pt-5 rounded-[4px] bg-[white]">

          <Image src={Logo?.src} alt={Logo?.src} className="w-[140px] object-cover mb-5" />

          {/* <GoogleButton
            name="Google"
            loading={isSubmitting}
            loadingText="Google"
            handleClick={handleGoogleLogin}
          /> */}

          {/* <Box className="my-5 flex gap-3 items-center">
            <Divider bg="blue.500" />
            <Text className="text-center text-gray-500 text-sm">
              OR
            </Text>
            <Divider bg="blue.500" />
          </Box> */}
          {/* <Text
            textColor={theme?.textPrimaryColor}
            className="font-[600] text-[30px] mb-5 text-center"
          >
            Login
          </Text> */}
          <Box className="flex gap-4 flex-col">

            <Box>
              <Text
                // textColor={theme?.textPrimaryColor}
                className="!text-[14px] !text-textColorf !font-[500] mb-1"
              >
                Username
              </Text>
              <Input
                className="!border-[1px] !border-[#CBD5E0] focus-visible:!shadow-none focus-visible:!outline-none !rounded-[5px]"
                textColor={theme?.textPrimaryColor}
                htmlSize={4}
                size="sm"
                type={"text"}
                placeholder="Enter username"
                height={"40px"}
                value={formData?.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </Box>
            <Box>
              <Text
                // textColor={theme?.textPrimaryColor}
                className="!text-[14px] !text-textColorf !font-[500] mb-1"
              >
                Email
              </Text>
              <Input
                className="!border-[1px] !border-[#CBD5E0] focus-visible:!shadow-none focus-visible:!outline-none !rounded-[5px]"
                textColor={theme?.textPrimaryColor}
                htmlSize={4}
                size="sm"
                type={"email"}
                placeholder="Enter email"
                height={"40px"}
                value={formData?.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Box>
            <Box>
              <Text
                // textColor={theme?.textPrimaryColor}
                className="!text-[14px] !text-textColorf !font-[500] mb-1"
              >
                Password
              </Text>
              <InputGroup size="md">
                <Input
                  className="!border-[1px] !border-[#CBD5E0] focus-visible:!shadow-none focus-visible:!outline-none"
                  textColor={theme?.textPrimaryColor}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  sx={{
                    "::placeholder": {
                      fontSize: "14px", // Change this to your desired font size
                    },
                  }}
                  value={formData?.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <InputRightElement width="4.5rem">
                  {show ? (
                    <IconEye
                      onClick={handleClick}
                      className="cursor-pointer w-[20px] !text-gray-400"
                    />
                  ) : (
                    <IconEyeOff
                      onClick={handleClick}
                      className="cursor-pointer w-[20px] !text-gray-400"
                    />
                  )}
                </InputRightElement>
              </InputGroup>
            </Box>
            <Button
              // bg={theme?.buttonColor}
              // textColor={theme?.textPrimaryColor}
              isLoading={isLoading}
              _hover={{ bg: "transprant" }}
              borderRadius={"4px"}
              letterSpacing={"1px"}
              fontSize={"18px"}
              // background={"#E8b320"}
              className="!bg-firstColorBg !text-[white]"
              mt={"8px"}
              onClick={handleSubmit}
            >
              Sign up
            </Button>
            <Box className="flex justify-between">
              <Link href={"/login"} className="text-firstColorBg underline text-[14px]">
                Sign in
              </Link>
              <Link href={"/"} className="text-firstColorBg underline text-[14px]">
                Return to Homepage
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
