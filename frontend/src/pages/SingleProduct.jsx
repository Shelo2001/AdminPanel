import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useCategories } from "../services/categories";
import Loader from "../components/Loader";
import Slider from "react-slick";
import { Button, Divider, Tag, Typography } from "antd";
import { DollarOutlined, LeftOutlined, TagsOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";

const SingleProduct = () => {
    const { id } = useParams();
    const { Title, Text } = Typography;
    const { getProductById, product, loading } = useCategories();

    useEffect(() => {
        getProductById(id);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    console.log(product);

    return (
        <div>
            {loading ? (
                <>
                    <Helmet>
                        <meta
                            charSet="utf-8"
                            name="description"
                            content="View and manage products on our website"
                        />
                        <title>Loading...</title>
                    </Helmet>
                    <Loader />
                </>
            ) : (
                <div className="single-product">
                    <Helmet>
                        <meta
                            charSet="utf-8"
                            name="description"
                            content="View and manage products on our website"
                        />
                        <title>{product.name}</title>
                    </Helmet>

                    <Link to="/products">
                        <Button
                            style={{ position: "absolute", top: "10px" }}
                            type="primary"
                            shape="circle"
                            icon={<LeftOutlined />}
                            size={"large"}
                        />
                    </Link>

                    <div className="product-container">
                        <div>
                            <Slider
                                style={{
                                    width: "500px ",
                                    marginTop: "5px",
                                    marginBottom: "5px",
                                }}
                                {...settings}
                            >
                                {product?.images?.map((image) => (
                                    <img
                                        src={`${
                                            import.meta.env.VITE_IMG_URL
                                        }/upload/${image.src}`}
                                        alt="Product Image"
                                    />
                                ))}
                            </Slider>
                        </div>
                        <div style={{ padding: "24px" }}>
                            <Title level={2}>{product.name}</Title>

                            <Divider />

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: "24px",
                                }}
                            >
                                <div style={{ marginRight: "30px" }}>
                                    <DollarOutlined
                                        style={{ fontSize: "20px" }}
                                    />
                                    <Text
                                        style={{
                                            marginLeft: "5px",
                                            fontSize: "20px",
                                        }}
                                        strong
                                    >
                                        {product.price}
                                    </Text>
                                </div>

                                <div>
                                    <TagsOutlined
                                        style={{ fontSize: "20px" }}
                                    />
                                    {product?.categories?.map((category) => (
                                        <Tag
                                            style={{
                                                marginLeft: "10px",
                                            }}
                                            key={category.id}
                                        >
                                            {category.category}
                                        </Tag>
                                    ))}
                                </div>
                            </div>

                            <Text>{product.description}</Text>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleProduct;
