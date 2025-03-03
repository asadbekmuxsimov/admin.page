import { Button, Drawer, message, Spin, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../myStore";
import AddUserDrawerAndButton from "../components/AddUserDrawerAndButton";
import EditUserDrawer from "../components/EditUserDrawer";

function Users() {
  const [isOpenDrawer, setisOpenDrawer] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [kutbhona, setkutbhona] = useState();
  const state = useAuthStore();
  const pageSize = 10;
  const [user, setUser] = useState();
  

  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/users", {
        params: {
          size: pageSize,
          page: currentPage,
        },
        headers: {
          authorization: `Bearer ${state.token}`,
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
        <div className="flex justify-between">
          <h2 className="mb-5 text-2xl font-bold">Kitobxonlar</h2>
          <AddUserDrawerAndButton
            isOpenDrawer={isOpenDrawer}
            setisOpenDrawer={setisOpenDrawer}
          />
        </div>
        <EditUserDrawer
        setUser={setUser}
        user={user}
        isOpenDrawer={isOpenDrawer}
        setisOpenDrawer={setisOpenDrawer}
        />
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
              render: (id, items) => {
                return <>
                <div onClick={() => {
                  setUser(items)
                }}>
                  {id}
                </div>
                </>
                  
              }
            },
            {
              key: "firstName",
              title: "Ism ",
              dataIndex: "firstName",
            },
            {
              key: "lastName",
              title: "Familya ",
              dataIndex: "lastName",
            },
            {
              title: "Phone",
              dataIndex: "phone",
              key: "phone",
            },
            {
              title: "Jinsi",
              dataIndex: "gender",
              key: "gender",
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

export default Users;
