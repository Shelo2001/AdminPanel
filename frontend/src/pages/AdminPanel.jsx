import { UploadOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    Radio,
    Row,
    Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { Helmet } from "react-helmet";

const AdminPanel = () => {
    const handleProductSubmit = () => {};
    const handleCategorySubmit = () => {};

    return (
        <div style={{ minHeight: "80vh" }}>
            <Helmet>
                <title>Admin Panel</title>
                <meta
                    name="description"
                    content="Manage the website's administration panel"
                />
            </Helmet>

            <Row gutter={16} justify="center">
                <Col span={10}>
                    <Card
                        style={{ minHeight: "400px" }}
                        title="Product Data"
                        bordered={false}
                    >
                        <Form onFinish={handleProductSubmit}>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter a name",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter a description",
                                    },
                                ]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter a price",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Images" name="images">
                                <Upload multiple>
                                    <Button icon={<UploadOutlined />} block>
                                        Upload Images
                                    </Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit Product
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                <Col span={10}>
                    <Card
                        style={{ minHeight: "448px" }}
                        title="Product Category Data"
                        bordered={false}
                    >
                        <Form onFinish={handleCategorySubmit}>
                            <Form.Item
                                label="Name"
                                name="categoryName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter a category name",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit Category
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminPanel;
