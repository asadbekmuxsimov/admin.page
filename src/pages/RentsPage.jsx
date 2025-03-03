import { message, Spin, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../myStore";

function RentsPage() {
  const [rents, setRents] = useState();

  const [currentPage, setcurrentPage] = useState(1);
  const [kutbhona, setkutbhona] = useState();
  const state = useAuthStore();
  const pageSize = 10;

  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/rents", {
        params: {
          size: pageSize,
          page: currentPage,
        },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUyLCJsaWJyYXJpYW4iOnRydWUsImxpYnJhcnlJZCI6MiwibG9jYXRpb25JZCI6Miwib3duZXIiOmZhbHNlLCJtb2RlcmF0b3IiOmZhbHNlLCJleHAiOjE3NDE1Nzk2MTAsImlhdCI6MTc0MDU0MjgxMH0.-eBJMuySc4me6wRtrRlTSGHdG0NhqLSTEaVVPIn8ZHc",
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setkutbhona(res.data);
      })
      .catch((e) => {
        console.error(e);

        message.error("Xatolik");
      });
  }, [currentPage]);

  if (!kutbhona) {
    return <Spin />;
  }
  return (
    <>
      <div className="m-10  w-full">
        <h2 className="mb-5 text-2xl font-bold">Ijaralar</h2>
        <Table
          dataSource={kutbhona.items}
          className="w-full"
          bordered
          loading={kutbhona ? false : true}
          columns={[
            {
              key: "id",
              title: "ID raqami",
              dataIndex: "id",
            },
            {
              key: "fghj",
              title: "Berilgan sana",
              dataIndex: "leasedAt",
              render: (value) => {
                return new Date(value).toLocaleString("ru", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                });
              },
            },
            {
              key: "returnedAt",
              title: "Qaytdi",
              dataIndex: "returnedAt",
              render: (value) => {
                return (
                  <Switch
                    onChange={(chekked) => {
                      if (chekked) {
                        // apiga zapros berish kerak
                      }
                    }}
                    checked={value ? true : false}
                  />
                );
              },
            },
            {
              key: "user",
              title: "Kitobxon",
              dataIndex: "user",
              render: (item) => {
                return (
                  <div>
                    {item.id}. {item.firstName}
                  </div>
                );
              },
            },
          ]}
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            total: kutbhona.totalCount,
          }}
          onChange={(p) => {
            setcurrentPage(p.current);
          }}
        />
      </div>
    </>
  );
}

export default RentsPage;
