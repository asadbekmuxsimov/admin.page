import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Table } from "antd";

function ProductPage({ collapsed }) {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios
      .get("https://67458ca9512ddbd807f88427.mockapi.io/products")
      .then((response) => {
        setProducts(response.data);
      });
  }, []);
  if (!products) {
    return (
      <>
        <div className=" mt-44 m-auto">
          <div className="text-4xl">Loading...</div>
        </div>
      </>
    );
  }
  return (
    <div className="h-screen bg-gray-100">
      <div className="flex h-full">
        <main className=" h-full w-full p-10">
          <div className="text-2xl font-bold mb-2">Products Page</div>
          <Table
            className="w-full flex flex-col justify-between " 
            style={{
              width: 1200,
              display: "flex",
            }}
            dataSource={products}
            columns={[
              {
                title: "ID",
                dataIndex: "id",
              },
              {
                title: "Name",
                dataIndex: "name",
                render: (name) => {
                  return <div>{name.toUpperCase()}</div>;
                },
              },
              {
                title: "Image",
                dataIndex: "image",
                render: (image) => {
                  return <img src={image} className="h-14" alt="" />;
                },
              },
            ]}
          />
        </main>
      </div>
    </div>
  );
}

export default ProductPage;
