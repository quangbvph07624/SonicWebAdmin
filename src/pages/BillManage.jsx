import React, { useState, useEffect } from "react";
import { Table, Button, Space, Spin, Popconfirm, message } from "antd";
import * as ApiClient from "../helpers/ApiClient";
const BillManage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("_token");
  const [confirming, setConfirming] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    await ApiClient.ApiGet("admin/bills", token).then((res) => {
      console.log("res", res.data);
      setData(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Mã sản phẩm",
        render: (record) => {
          return <p>{record.id}</p>;
        },
      },
      {
        title: "Tên sản phẩm",
        render: (record) => {
          return <p>{record.name}</p>;
        },
      },
      {
        title: "Hình ảnh",
        render: (record) => {
          return <img alt="" src={record.image} height={150}></img>;
        },
      },
      {
        title: "Số lượng",
        render: (record) => {
          return <p>{record.amount}</p>;
        },
      },
      {
        title: "Giá tiền",
        render: (record) => {
          return <p>{record.price}</p>;
        },
      },
    ];
    return (
      <Table
        rowKey={(index) => index}
        columns={columns}
        dataSource={record.products}
        pagination={false}
      />
    );
  };

  const columns = [
    { title: "Mã hóa đơn", dataIndex: "billCode", key: "billCode" },
    { title: "Mã người dùng", dataIndex: "userId", key: "userId" },
    { title: "Tên khách hàng", dataIndex: "name", key: "name" },
    { title: "Số điện thoại", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Ngày đặt hàng", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Trạng thái",
      key: "_id",
      render: (record) => {
        if (record.status === "Processing") {
          return (
            <Popconfirm
              title="Xác nhận đơn hàng!"
              onConfirm={async () => {
                setConfirming(true);
                await ApiClient.ApiPut(`bill-status/${record._id}`, token)
                  .then((res) => {
                    message.success("đã xác nhận đơn hàng");
                    fetchData();
                    setConfirming(false);
                  })
                  .catch((err) => {
                    console.log("err", err);
                  });
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button loading={confirming} type="primary">
                Xác nhận
              </Button>
            </Popconfirm>
          );
        }
        if (record.status === "Successful") {
          return <Button disabled={true}>Đã xác nhận</Button>;
        }
      },
    },
  ];
  if (loading === true) {
    return (
      <div align="center" style={{ marginTop: 300 }}>
        <Space size="middle">
          <Spin spinning={loading} size="large" />
        </Space>
      </div>
    );
  }
  return (
    <div style={{ marginTop: 10 }}>
      <div align="center" style={{ marginTop: 10, marginBottom: 10 }}>
        <b style={{ fontSize: 36 }}>Quản lí hóa đơn</b>
      </div>
      <Table
        manual={true}
        margin={20}
        rowKey="_id"
        className="components-table-demo-nested"
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={data}
      />
    </div>
  );
};
export default BillManage;
