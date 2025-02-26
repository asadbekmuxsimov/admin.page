import { Button, Drawer, message, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../myStore";
import AddUserDrawerAndButton from "../components/AddUserDrawerAndButton";

function Users() {
  const [isOpenDrawer, setisOpenDrawer] = useState();

  const [rents, setRents] = useState();
  const state = useAuthStore();

  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/users", {
        params: {
          size: 20,
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setRents(res.data.items);
      })
      .catch((e) => {
        console.error(e);

        message.error("Xatolik");
      });
  }, [isOpenDrawer]);

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
        <Table
          className="w-full"
          bordered
          loading={rents ? false : true}
          columns={[
            {
              key: "id",
              title: "ID raqami",
              dataIndex: "id",
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
          ]}
          dataSource={rents}
        />
      </div>
    </>
  );
}

export default Users;
