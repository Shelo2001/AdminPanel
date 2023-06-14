import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useCategories } from "../services/categories";
import { Button, Table, Tag } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Slider from "react-slick";

const HomePage = () => {
    const { getProducts, products, getCategories, categories } =
        useCategories();

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const dataSource = products.map((p) => ({
        images: (
            <Slider
                style={{
                    width: "100px",
                    marginTop: "5px",
                    marginBottom: "5px",
                }}
                {...settings}
            >
                {p.images.map((image) => (
                    <img
                        src={`${import.meta.env.VITE_IMG_URL}/upload/${
                            image.src
                        }`}
                        alt="Product Image"
                    />
                ))}
            </Slider>
        ),
        name: p.name,
        description: p.description.substring(0, 30),
        price: p.price,
        categories: p.categories.map((category) => (
            <Tag>{category.category}</Tag>
        )),
        actions: (
            <>
                <Button type="primary" success>
                    <EyeOutlined />
                </Button>
                <Button style={{ marginLeft: "30px" }} type="primary" danger>
                    <DeleteOutlined />
                </Button>
            </>
        ),
    }));

    const columns = [
        {
            title: "Images",
            dataIndex: "images",
            key: "images",
            width: "150px",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            filters: [
                { text: "Ascending", value: "Asc" },
                { text: "Descending", value: "Desc" },
            ],
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            filters: [
                { text: "Ascending", value: "Asc" },
                { text: "Descending", value: "Desc" },
            ],
        },
        {
            title: "Categories",
            dataIndex: "categories",
            key: "categories",
            filters: categories.map((c) => ({
                text: c.name,
                value: c.name,
            })),
        },
        {
            title: "",
            dataIndex: "actions",
            key: "actions",
        },
    ];

    return (
        <div>
            <Helmet>
                <meta
                    charSet="utf-8"
                    name="description"
                    content="View and manage products on our website"
                />
                <title>Products</title>
            </Helmet>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
};

export default HomePage;
