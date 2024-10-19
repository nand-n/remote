"use client";
import { Form, Input, Button, Checkbox } from "antd";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NotificationMessage from "@/components/common/notification/notificationMessage";
import { useRouter } from "next/navigation";
import useAuthStore from "@/lib/store/uistate/auth/login/useAuth";
import { useLogin } from "@/lib/store/server/features/auth/mutations";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const { mutate: loginUser, isLoading } = useLogin();

  const router = useRouter();
  const onFinish = (values: LoginFormValues) => {
    setLoading(true);
    loginUser(values, {
      onSuccess: (data) => {
        const { accessToken, refreshToken, user } = data;
        login(accessToken, refreshToken, user);
        setLoading(false);
        router.push("/manage-announcment");
      },
      onError: (error: any) => {
        NotificationMessage.error({
          message: "Error",
          description: `Error in ${error}`,
        });
        setLoading(false);
      },
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/2 flex items-center justify-center bg-[#171B36] p-4">
        <Image src="/icons/fetanEta.svg" alt="Logo" width={350} height={350} />
      </div>
      <div className="lg:w-1/2 flex items-center justify-center p-2 bg-white">
        <div className="max-w-full w-full px-24">
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
            <p className="text-gray-600 font-semibold text-xl">Login</p>
          </div>

          <Form name="login" layout="vertical" onFinish={onFinish}>
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

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading || isLoading}
                className="w-full h-12 font-semibold"
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-4">
            Don{"'"}t have an account? <Link href="/auth/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
