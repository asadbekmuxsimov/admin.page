import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";

function AddRents({ rentData, closeModal }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (rentData) {
      form.setFieldsValue({
        user: rentData.user ? rentData.user.firstName : "",
        leasedAt: rentData.leasedAt ? dayjs(rentData.leasedAt) : null,
        returnedAt: rentData.returnedAt ? dayjs(rentData.returnedAt) : null,
      });
    }
  }, [rentData]);

  const handleSubmit = (values) => {
    const updatedData = {
      ...rentData,
      user: values.user,
      leasedAt: values.leasedAt ? values.leasedAt.toISOString() : null,
      returnedAt: values.returnedAt ? values.returnedAt.toISOString() : null,
    };

    axios
      .put(`https://library.softly.uz/api/rents/${rentData.id}`, updatedData, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUyLCJsaWJyYXJpYW4iOnRydWUsImxpYnJhcnlJZCI6MiwibG9jYXRpb25JZCI6Miwib3duZXIiOmZhbHNlLCJtb2RlcmF0b3IiOmZhbHNlLCJleHAiOjE3NDE1Nzk2MTAsImlhdCI6MTc0MDU0MjgxMH0.-eBJMuySc4me6wRtrRlTSGHdG0NhqLSTEaVVPIn8ZHc"
        }
      })
      .then(() => {
        message.success("Ma'lumotlar yangilandi!");
        closeModal();
      })
      .catch((error) => {
        console.error("Xatolik:", error);
        message.error("Xatolik yuz berdi!");
      });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="user" label="Kitobxon">
        <Input />
      </Form.Item>

      <Form.Item name="leasedAt" label="Berilgan sana">
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item name="returnedAt" label="Qaytarilgan sana">
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Saqlash
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddRents;
