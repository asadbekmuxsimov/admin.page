import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Table } from "antd";
import axios from "axios";

function Categories({ collapsed }) {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios
      .get("https://67458ca9512ddbd807f88427.mockapi.io/categories")
      .then((response) => {
        setProducts(response.data);
      });
  }, []);
  if (!products) {
    return <div className="flex justify-center mt-44">
         <div className="text-4xl">Loading...</div>
    </div>;
  }
  return (
    <div className="flex h-full">
      <Sidebar collapsed={collapsed} />
      <main className="bg-slate-200 h-full w-full p-10">
        <div className="text-2xl font-bold mb-2">Category Page</div>
        <Table
          dataSource={products}
          columns={[
            {
              title: "ID",
              dataIndex: "id",
            },
            {
              title: "Name",
              dataIndex: "title",
              render: (name) => {
                return <div>{name.toUpperCase()}</div>;
              },
            },
            {
              title: "Image",
              dataIndex: "image",
              render: (image) => {
                return <img src={image} className="h-10" alt="" />;
              },
            },
          ]}
        />
      </main>
    </div>
  );
}

export default Categories;
