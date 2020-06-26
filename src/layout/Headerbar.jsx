import React, { useState } from "react";
import "../assets/less/App.less";
import "./index.less";
import * as ApiClient from "../helpers/ApiClient";
import history from "../services/history";
import {
  Layout,
  Avatar,
  Drawer,
  Divider,
  Row,
  Col,
  Form,
  Input,
  Button,
  message,
} from "antd";
import Title from "antd/lib/typography/Title";
const { Header } = Layout;

const Headerbar = () => {
  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );
  const token = localStorage.getItem("_token");
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({});
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  return (
    <Header
      style={{ position: "fixed", zIndex: 1, width: "100%" }}
      theme="dark"
    >
      <div>
        <Avatar
          onClick={() => {
            setVisible(true);
          }}
          style={{ float: "right", margin: 15 }}
          src={require("../assets/images/avatar.png")}
        ></Avatar>
        <Title
          style={{
            color: "white",
            float: "left",
            marginTop: 10,
            marginLeft: 10,
          }}
          level={1}
        >
          Sonic
        </Title>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={() => {
            setVisible(false);
          }}
          visible={visible}
        >
          <p
            className="site-description-item-profile-p"
            style={{ marginBottom: 24 }}
          >
            User Profile
          </p>
          <p className="site-description-item-profile-p">Personal</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Full Name" content="Lily" />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Account"
                content="AntDesign@example.com"
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="City" content="HangZhou" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Country" content="China🇨🇳" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Birthday" content="February 2,1900" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Website" content="-" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Message"
                content="Make things as simple as possible but no simpler."
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">Đổi mật khẩu</p>
          <Form {...layout} name="basic" initialValues={{ remember: true }}>
            <Form.Item
              label="Mật khẩu hiện tại"
              name="currentPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
              ]}
            >
              <Input.Password
                onChange={(e) => {
                  setUser({ ...user, currentPassword: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              ]}
            >
              <Input.Password
                onChange={(e) => {
                  setUser({ ...user, newPassword: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button
                onClick={async () => {
                  await ApiClient.ApiPost("user/change-password", user, token)
                    .then((res) => {
                      message.success(
                        "Đổi mật khẩu thành công! Quay lại đăng nhập"
                      );

                      localStorage.clear();
                      history.push("/login");
                    })
                    .catch((err) => {
                      message.error("Đổi mật khẩu thất bại!");
                    });
                }}
                type="primary"
                htmlType="submit"
              >
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </Header>
  );
};
export default Headerbar;
