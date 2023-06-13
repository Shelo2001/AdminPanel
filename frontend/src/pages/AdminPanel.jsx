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
    Select,
    Space,
    Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";
import { Helmet } from "react-helmet";

const AdminPanel = () => {
    const [fileList, setFileList] = useState([]);

    const handleBeforeUpload = (file) => {
        // Add custom logic to handle the file upload
        // For example, you can convert the file to Base64 and store it in the state
        const reader = new FileReader();
        reader.onload = () => {
            const dataURL = reader.result;
            const image = new Image();
            image.src = dataURL;
            image.onload = () => {
                const imageObj = {
                    uid: file.uid,
                    name: file.name,
                    status: "done",
                    url: dataURL,
                    size: file.size,
                    type: file.type,
                    width: image.width,
                    height: image.height,
                };
                setFileList((prevList) => [...prevList, imageObj]);
            };
        };
        reader.readAsDataURL(file);

        return false; // Prevent default upload behavior
    };

    const handleRemove = (file) => {
        const updatedList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(updatedList);
    };
    const handleProductSubmit = () => {};
    const handleCategorySubmit = () => {};

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

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
                        style={{
                            minHeight: "400px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                        }}
                        title="Add new product"
                        bordered={false}
                    >
                        <Form onFinish={handleProductSubmit}>
                            <Form.Item
                                label="Name"
                                name="name"
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 16 }}
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
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 16 }}
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
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 16 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter a price",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Categories"
                                name="category"
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 16 }}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please enter at least one category",
                                    },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    style={{
                                        width: "100%",
                                    }}
                                    placeholder="select one category"
                                    onChange={handleChange}
                                    optionLabelProp="label"
                                >
                                    <Option value="china" label="China">
                                        <Space>China</Space>
                                    </Option>
                                    <Option value="usa" label="USA">
                                        <Space>USA</Space>
                                    </Option>
                                    <Option value="japan" label="Japan">
                                        <Space>Japan</Space>
                                    </Option>
                                    <Option value="korea" label="Korea">
                                        <Space>Korea</Space>
                                    </Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Images"
                                name="images"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please upload at least one image",
                                    },
                                ]}
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 16 }}
                            >
                                <Upload
                                    beforeUpload={handleBeforeUpload}
                                    fileList={fileList}
                                    onRemove={handleRemove}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Select Images
                                    </Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 16 }}
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                <Button
                                    style={{ width: "40%", marginTop: "20px" }}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    ADD PRODUCT
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                <Col span={10}>
                    <Card
                        style={{
                            minHeight: "524px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                        }}
                        title="Add new category"
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
                            <Form.Item
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 16 }}
                                style={{ textAlign: "center" }}
                            >
                                <Button
                                    style={{
                                        position: "absolute",
                                        bottom: "-300px",
                                        width: "40%",
                                    }}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    ADD CATEGORY
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
