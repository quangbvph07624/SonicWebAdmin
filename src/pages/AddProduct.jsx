import React, { useState } from "react";
import { Form, Input, Button, message, Radio } from "antd";
import * as ApiClient from "../helpers/ApiClient";
import history from "../services/history";
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

const AddProduct = () => {
  const [product, setProduct] = useState({});
  const token = localStorage.getItem("_token");
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ padding: 50, backgroundColor: "#fff" }} className="container">
      <div align="center">
        <h1 style={{ fontSize: 50 }}>Thêm sản phẩm</h1>
      </div>
      <Form {...layout}>
        <Form.Item
          hasFeedback
          name="Tên sản phẩm"
          label="Tên sản phẩm"
          rules={[
            {
              required: true,
              message: "Vui lòng điền tên sản phẩm!",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setProduct({ ...product, name: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item name="Loại sản phẩm" label="Loại sản phẩm">
          <Radio.Group
            onChange={(e) => {
              setProduct({ ...product, type: e.target.value });
            }}
            initialValues="phone"
            buttonStyle="solid"
          >
            <Radio.Button value="phone">Điện thoại</Radio.Button>
            <Radio.Button value="laptop">Laptop</Radio.Button>
            <Radio.Button value="accessories">Phụ kiện</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          hasFeedback
          name="Số lượng"
          label="Số lượng"
          rules={[
            {
              required: true,
              message: "Vui lòng điền số lượng",
            },
          ]}
        >
          <Input
            type="number"
            onChange={(e) => {
              setProduct({ ...product, amount: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="Giá tiền một sản phẩm"
          label="Giá tiền một sản phẩm"
          rules={[
            {
              required: true,
              message: "Vui lòng điền giá tiền của sản phẩm",
            },
          ]}
        >
          <Input
            type="number"
            onChange={(e) => {
              setProduct({ ...product, price: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="Thông số chi tiết 1"
          label="Giới thiệu 1"
          rules={[
            {
              required: true,
              message: "Vui lòng điền thông số chi tiết cho sản phẩm!",
            },
          ]}
        >
          <TextArea
            onChange={(e) => {
              setProduct({ ...product, description1: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="Thông số chi tiết 2"
          label="Giới thiệu 2"
          rules={[
            {
              required: true,
              message: "Vui lòng điền thông số chi tiết cho sản phẩm!",
            },
          ]}
        >
          <TextArea
            onChange={(e) => {
              setProduct({ ...product, description2: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="Thông số chi tiết 3"
          label="Thông số chi tiết"
          rules={[
            {
              required: true,
              message: "Vui lòng điền thông số chi tiết cho sản phẩm!",
            },
          ]}
        >
          <TextArea
            onChange={(e) => {
              setProduct({ ...product, description3: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          name="Ảnh sản phẩm"
          label="Ảnh sản phẩm"
          rules={[
            {
              required: true,
              message: "Vui lòng điền đường dẫn của ảnh!",
            },
          ]}
        >
          <Input
            type="url"
            onChange={(e) => {
              setProduct({ ...product, image: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 10, offset: 10 }}>
          <div style={{ margin: 20 }}>
            <Button
              loading={loading}
              onClick={async () => {
                setLoading(true);
                await ApiClient.ApiPost("products", product, token)
                  .then((response) => {
                    message.success("Thêm sản phẩm thành công!");
                    setLoading(false);
                    history.push("/home");
                  })
                  .catch((error) => {
                    message.error("Có lỗi xảy ra, vui lòng thử lại!");
                    setLoading(false);
                  });
              }}
              type="primary"
              htmlType="submit"
            >
              Thêm sản phẩm
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddProduct;
