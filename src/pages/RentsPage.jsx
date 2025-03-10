import { message, Spin, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../myStore";

function RentsPage() {
  const [rents, setRents] = useState();

  const [currentPage, setcurrentPage] = useState(1);
  const [kutbhona, setkutbhona] = useState();
  const [books, setBooks] = useState([])
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
            `Bearer ${state.token}`,
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

    axios.get("https://library.softly.uz/api/books").then((res) => {
      setBooks(res.data.items)
    });
  }, [currentPage]);

  if (!kutbhona) {
    return <Spin />;
  }
  if(!books) {
    return <Spin />
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
            {
              title: "Kitoblar",
              dataIndex: "stock",
              render: (stock) => {
                const found = books.find(book => book.id === stock.bookId)
                return <div>{found ? found.name : "Topilmadi"}</div>
              }
            }
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
