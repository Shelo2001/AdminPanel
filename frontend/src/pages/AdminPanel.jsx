import { UploadOutlined } from "@ant-design/icons";
import {
    Alert,
    Button,
    Card,
    Col,
    Form,
    Input,
    Row,
    Select,
    Space,
    Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useCategories } from "../services/categories";

const AdminPanel = () => {
    const [fileList, setFileList] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    const {
        createCategory,
        getCategories,
        categories,
        success,
        createProduct,
    } = useCategories();

    useEffect(() => {
        getCategories();
    }, []);

    const handleBeforeUpload = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setFileList((prevList) => [...prevList, reader.result]);
        };
        reader.readAsDataURL(file);

        return false;
    };

    const handleRemove = (file) => {
        const updatedList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(updatedList);
    };
    const handleCategorySubmit = () => {
        let data = { name: categoryName };
        createCategory(data);
    };

    const handleChange = (selectedValues) => {
        setProductCategories(selectedValues);
    };

    const handleProductSubmit = () => {
        let data = {
            name,
            price,
            description,
            images: fileList,
            categories: productCategories,
        };

        createProduct(data);
    };

    return (
        <div style={{ minHeight: "80vh" }}>
            {success && (
                <Alert
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                    message={success}
                    type="success"
                />
            )}
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
                                <Input
                                    onChange={(e) => setName(e.target.value)}
                                />
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
                                <TextArea
                                    rows={4}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
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
                                <Input
                                    onChange={(e) => setPrice(e.target.value)}
                                />
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
                                    placeholder="select category"
                                    onChange={handleChange}
                                    value={productCategories}
                                    optionLabelProp="label"
                                >
                                    {categories.map((c) => (
                                        <Option value={c.name} label={c.name}>
                                            <Space>{c.name}</Space>
                                        </Option>
                                    ))}
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
                                <Input
                                    onChange={(e) =>
                                        setCategoryName(e.target.value)
                                    }
                                />
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
