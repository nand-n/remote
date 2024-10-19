"use client";
import { Form, Input, Button, Checkbox } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignupData } from "@/types/features/authentication/signup";
import NotificationMessage from "@/components/common/notification/notificationMessage";
import { useSignUp } from "@/lib/store/server/features/auth/mutations";

const SignupForm: React.FC = () => {
  const { mutate: signUpUser, isLoading: loading } = useSignUp();

  const router = useRouter();
  /* eslint-disable @typescript-eslint/naming-convention */

  const onFinish = (values: SignupData) => {
    signUpUser(values, {
      onSuccess() {
        router.push("/authentication/login", {
          scroll: true,
        });
      },
      onError(error: any) {
        NotificationMessage.error({
          message: "Error Sign up!",
          description: `Error in ${error.message}.`,
        });
      },
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/2 flex items-center justify-center bg-[#171B36] p-4 sm:p-2 ">
        <Image src="/icons/fetanEta.svg" alt="Logo" width={350} height={350} />
      </div>
      <div className=" lg:w-1/2 flex items-center justify-center p-2 bg-white">
        <div className="max-w-full w-full lg:px-20 md:px-12 px-6">
          <div className="text-center mt-24 mb-6 flex justify-start items-center gap-4">
            <Image
              src="/icons/fetanEta.svg"
              alt="Logo"
              width={50}
              height={50}
            />

            <div className="">
              <h1 className="text-2xl font-normal">Fetan Eta</h1>
            </div>
          </div>
          <div className="border-b-2 w-full mb-8 pb-2">
            <p className="text-gray-600 font-semibold text-xl">
              Signup as Owner
            </p>
          </div>

          <Form
            name="signup"
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ phone: "+251" }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input className="h-12" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email address"
              rules={[
                { required: true, message: "Please input your email address!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input className="h-12" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password className="h-12" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password className="h-12" />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
              rules={[
                { required: true, message: "Please input your location!" },
              ]}
            >
              <Input className="h-12" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
                {
                  pattern: /^(\+251)?[0-9]{9}$/,
                  message: "Please enter a valid phone number!",
                },
              ]}
            >
              <Input addonBefore="+251" className="h-12" />
            </Form.Item>

            <Form.Item
              name="telegramUser"
              label="Telgram User Name"
              rules={[
                {
                  required: false,
                  message: "Please input your telegram user name!",
                },
              ]}
            >
              <Input addonBefore={"@"} className="h-12" />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("You must accept the terms and conditions")
                        ),
                },
              ]}
            >
              <Checkbox>
                I accept the <a href="#">Terms and Conditions</a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 font-semibold"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-4">
            Already have an account? <Link href="/auth/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
  /* eslint-enable @typescript-eslint/naming-convention */
};

export default SignupForm;
