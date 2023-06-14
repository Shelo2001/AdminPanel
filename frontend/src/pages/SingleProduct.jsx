import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useCategories } from "../services/categories";
import Loader from "../components/Loader";
import Slider from "react-slick";
import { Divider, Tag, Typography } from "antd";
import { DollarOutlined, TagsOutlined } from "@ant-design/icons";

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
                <Loader />
            ) : (
                <div className="single-product">
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
                                    <DollarOutlined />
                                    <Text style={{ marginLeft: "5px" }} strong>
                                        {product.price}
                                    </Text>
                                </div>

                                <div>
                                    <TagsOutlined />
                                    {product?.categories?.map((category) => (
                                        <Tag
                                            style={{ marginLeft: "10px" }}
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
