import React, { useState, useEffect, useContext } from "react";
import "./App.less";
import {
  List,
  Card,
  Button,
  BackTop,
  Modal,
  Form,
  message,
  Space,
  Spin,
  Popconfirm,
} from "antd";
import { AuthContext } from "../contexts";
import { Link } from "react-router-dom";
import { Input } from "antd";
import * as ApiClient from "../helpers/ApiClient";
import ReadMoreAndLess from "react-read-more-less";
import { UpSquareOutlined } from "@ant-design/icons";
const { Search } = Input;
const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};
const Laptop = () => {
  const state = useContext(AuthContext);
  let token = state.state.token;
  console.log("token laptop", token);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState({});
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    await ApiClient.ApiGet("products/?category=laptop", token)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const searchFilter =
    data &&
    data.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
  if (loading === true) {
    return (
      <div align="center" style={{ marginTop: 350 }}>
        <Space size="middle">
          <Spin spinning={loading} size="large" />
        </Space>
      </div>
    );
  }
  return (
    <div style={{ minHeight: 360 }}>
      <div style={{ margin: 20 }}>
        <Link to="addproduct">
          <Button type="primary" shape="round">
            Thêm sản phẩm
          </Button>
        </Link>

        <Search
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          size="large"
          style={{ marginLeft: 138, width: 600 }}
          placeholder="input search text"
          enterButton
        />
      </div>
      <List
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 4,
        }}
        grid={{ gutter: 16, column: 2 }}
        dataSource={searchFilter}
        renderItem={(item, index) => {
          return (
            <List.Item>
              <Card title="Tên sản phẩm">{item.name}</Card>
              <Card title="Giá">{item.price} VND</Card>
              <Card title="Giới thiệu">
                {" "}
                <ReadMoreAndLess
                  // ref={this.ReadMore}
                  className="read-more-content"
                  charLimit={250}
                  readMoreText="Read more"
                  readLessText="Read less"
                >
                  {item.description1 + item.description2 + item.description3}
                </ReadMoreAndLess>
              </Card>
              <Card title="Ảnh sản phẩm">
                <img src={item.image} alt="" height="150" width="150"></img>
              </Card>
              <Card title="Số lượng">{item.amount}</Card>
              <div style={{ backgroundColor: "white" }}>
                <Button
                  onClick={() => {
                    setVisible(true);
                  }}
                  type="primary"
                  style={{ margin: 10, width: 260 }}
                >
                  Sửa thông tin sản phẩm
                </Button>

                <Modal width={700} visible={visible} footer={null}>
                  <div align="center">
                    <h1 style={{ fontSize: 50 }}>Thêm sản phẩm</h1>
                  </div>
                  <Form {...layout}>
                    <Form.Item hasFeedback name={item.id} label="Tên sản phẩm">
                      <Input
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setProduct({ ...product, name: undefined });
                          } else {
                            setProduct({ ...product, name: e.target.value });
                          }
                        }}
                      />
                    </Form.Item>
                    <Form.Item hasFeedback name={item.id} label="Số lượng">
                      <Input
                        type="number"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setProduct({ ...product, amount: undefined });
                          } else {
                            setProduct({
                              ...product,
                              amount: e.target.value,
                            });
                          }
                        }}
                      />
                    </Form.Item>

                    <Form.Item hasFeedback name={item.id} label="Giá tiền ">
                      <Input
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setProduct({ ...product, price: undefined });
                          } else {
                            setProduct({ ...product, price: e.target.value });
                          }
                        }}
                      />
                    </Form.Item>
                    <Form.Item hasFeedback name={item.id} label="Giới thiệu 1">
                      <TextArea
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setProduct({
                              ...product,
                              description1: undefined,
                            });
                          } else {
                            setProduct({
                              ...product,
                              description1: e.target.value,
                            });
                          }
                        }}
                      />
                    </Form.Item>
                    <Form.Item hasFeedback name={item.id} label="Giới thiệu 2">
                      <TextArea
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setProduct({
                              ...product,
                              description2: undefined,
                            });
                          } else {
                            setProduct({
                              ...product,
                              description2: e.target.value,
                            });
                          }
                        }}
                      />
                    </Form.Item>
                    <Form.Item hasFeedback name={item.id} label="Giới thiệu 3">
                      <TextArea
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setProduct({
                              ...product,
                              description3: undefined,
                            });
                          } else {
                            setProduct({
                              ...product,
                              description3: e.target.value,
                            });
                          }
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={item.id} label="Ảnh sản phẩm">
                      <Input
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setProduct({ ...product, image: undefined });
                          } else {
                            setProduct({ ...product, image: e.target.value });
                          }
                        }}
                      />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 10, offset: 10 }}>
                      <div>
                        <Button
                          onClick={async () => {
                            await ApiClient.ApiPut(
                              `products/${item.id}`,
                              token,
                              product
                            )
                              .then((res) => {
                                setVisible(false);
                                message.success("Sửa thành công!");
                                fetchData();
                              })
                              .catch((err) => {
                                message.error("Có lỗi xảy ra!");
                              });
                          }}
                          type="primary"
                          htmlType="submit"
                        >
                          Xác nhận
                        </Button>
                        <Button
                          danger
                          onClick={() => {
                            setVisible(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </Modal>
                <Popconfirm
                  title="Bạn có muốn xóa sản phẩm này？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={async () => {
                    await ApiClient.ApiDel(`products/${item._id}`).then(
                      (res) => {
                        searchFilter.splice(index, 1);
                        setData(searchFilter);
                        console.log("data", data);
                        message.success("Xóa thành công!");
                      }
                    );
                  }}
                >
                  <Button danger style={{ margin: 10, width: 260 }}>
                    Xoá sản phẩm
                  </Button>
                </Popconfirm>
              </div>
            </List.Item>
          );
        }}
      />

      <BackTop>
        <div
          style={{
            height: 40,
            width: 50,
            lineHeight: "40px",
            borderRadius: 25,
            backgroundColor: "#1088e9",
            color: "#fff",
            textAlign: "center",
            fontSize: 14,
          }}
        >
          {" "}
          {<UpSquareOutlined />}
        </div>
      </BackTop>
    </div>
  );
};
export default Laptop;
