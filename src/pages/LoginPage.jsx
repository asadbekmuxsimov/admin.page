import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import useAuthStore from "../myStore";

function LoginPage() {
  const stateAuth = useAuthStore();
  console.log(stateAuth);

  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="flex items-center justify-center h-full">
        <Card className="shadow-lg w-96 shadow-gary-600">
          <Form
            onFinish={(values) => {
              setLoading(true);
              axios
                .post("https://library.softly.uz/auth/signin", values)
                .then((res) => {
                  console.log(res.data);
                  stateAuth.setAuth({
                    token: res.data.token,
                    user: res.data.user,
                  });

                  localStorage.setItem("auth", JSON.stringify(res.data));

                  setLoading(false);
                  message.success("Success");
                });
            }}
          >
            <Form.Item
              label="Login"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your login!",
                },
                {
                  min: 3,
                  message: "Please minimum 3 character",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button loading={loading} type="primary" block htmlType="submit">
                Kirish
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
