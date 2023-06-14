import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useCategories } from "../services/categories";
import { Button, Input, Table, Tag, Slider as PriceSlider } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const HomePage = () => {
    const {
        getProducts,
        products,
        getCategories,
        categories,
        deleteProductById,
    } = useCategories();

    const [nameFilter, setNameFilter] = useState("");
    const [descriptionFilter, setDescriptionFilter] = useState("");
    const [priceRange, setPriceRange] = useState([0, 10000]);

    useEffect(() => {
        getProducts({
            name: nameFilter,
            description: descriptionFilter,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
        });
        getCategories();
    }, [nameFilter, descriptionFilter]);

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
        description:
            p.description.length > 30
                ? `${p.description.substring(0, 30)}...`
                : `${p.description}`,
        price: p.price,
        categories: p.categories.map((category) => (
            <Tag>{category.category}</Tag>
        )),
        actions: (
            <>
                <Link to={`/products/${p.id}`}>
                    <Button type="primary" success>
                        <EyeOutlined />
                    </Button>
                </Link>
                <Button
                    style={{ marginLeft: "30px" }}
                    type="primary"
                    onClick={() => {
                        deleteProductById(p.id);
                    }}
                    danger
                >
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
            onFilter: (value, record) => {
                console.log(value);
            },
        },
        {
            title: "",
            dataIndex: "actions",
            key: "actions",
        },
    ];

    const filterByPrice = () => {
        getProducts({
            name: nameFilter,
            description: descriptionFilter,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
        });
    };

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
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Input
                    style={{ width: "50%", marginBottom: "20px" }}
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    placeholder="Filter by name"
                />
                <Input
                    style={{ width: "50%", marginBottom: "20px" }}
                    value={descriptionFilter}
                    onChange={(e) => setDescriptionFilter(e.target.value)}
                    placeholder="Filter by description"
                />

                <div style={{ display: "flex" }}>
                    <PriceSlider
                        style={{ width: "50%", marginBottom: "20px" }}
                        range
                        min={0}
                        max={10000}
                        onChange={setPriceRange}
                    />
                    <Button
                        style={{ marginLeft: "20px" }}
                        onClick={() => filterByPrice()}
                    >
                        Filter By Price
                    </Button>
                </div>
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
};

export default HomePage;
