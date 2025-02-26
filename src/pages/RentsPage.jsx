import { message, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function RentsPage() {

  const [rents, setRents] = useState();

  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/rents", {
        params: {
          size: 20,
          page: 2,
        },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUyLCJsaWJyYXJpYW4iOnRydWUsImxpYnJhcnlJZCI6MiwibG9jYXRpb25JZCI6Miwib3duZXIiOmZhbHNlLCJtb2RlcmF0b3IiOmZhbHNlLCJleHAiOjE3NDE1Nzk2MTAsImlhdCI6MTc0MDU0MjgxMH0.-eBJMuySc4me6wRtrRlTSGHdG0NhqLSTEaVVPIn8ZHc",
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setRents(res.data.items)
      })
      .catch((e) => {
        console.error(e);

        message.error("Xatolik");
      });
  }, []);
  return (
    <>
      <div className="m-10  w-full">
        <h2 className="mb-5 text-2xl font-bold">Ijaralar</h2>
        <Table
        className="w-full" 
          bordered
          loading={rents ? false : true}
          columns={[
            {
              key: 'id',
              title: 'ID raqami',
              dataIndex: 'id'
            },
            {
              key: "fghj",
              title: 'Berilgan sana',
              dataIndex: 'leasedAt',
              render: (value) =>{
                return new Date(value).toLocaleString('ru',{
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })
              }
            },
            {
              key: 'returnedAt',
              title: 'Qaytdi',
              dataIndex: 'returnedAt',
              render: (value) =>{
                return <Switch onChange={(chekked) => {
                  if(chekked){
                    // apiga zapros berish kerak
                  }
                }}
                  checked={value ? true : false}
                />
              }
            },
            {
              key: 'user',
              title: 'Kitobxon',
              dataIndex: 'user',
              render: (item) => {
                return <div>{item.id}. {item.firstName}</div>
              }
            }
          ]}
          dataSource={rents}
        />
      </div>
    </>
  );
}

export default RentsPage;
