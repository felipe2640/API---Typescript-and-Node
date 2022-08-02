import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik } from "formik";

import { useState, FormEvent } from "react";
import { api } from "./api/api";

interface Props {
  readonly isOpenModal?: boolean;
}

const Login: React.FC<Props> = ({ isOpenModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, SetErrormsg] = useState(null);
  const [isSendingLogin, setIsSendingLogin] = useState(false);

  function validateName(value, type) {
    if (value === " ") {
      SetErrormsg(`${type} is required`);
    } else if (value.length < 8) {
      SetErrormsg(`minimun of 6 caracteres of ${type} `);
    }
  }

  async function handleSubmitLogin(event: FormEvent) {
    event.preventDefault();
    setIsSendingLogin(true);
    validateName(email, "email");
    validateName(password, "password");
    try {
      const token = await api
        .post("/api/auth/login", {
          email,
          password,
        })
        .then((value: any) => {
          return value.data.token;
        });

      const users = await api.get("/api/auth/users", {
        headers: {
          Authorization: "jwt " + token,
        },
      });
      console.log(users);
      setIsSendingLogin(false);
    } catch (error) {
      setIsSendingLogin(false);
      return error;
    }
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>

        <form id="form" onSubmit={handleSubmitLogin}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={errormsg}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  disabled={email.length < 3 ? true : false}
                  type="password"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  disabled={
                    email.length < 2 || password.length < 2 ? true : false
                  }
                  isLoading={isSendingLogin}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
};

export default Login;
