import React from "react";
import { Helmet } from "react-helmet";

const HomePage = () => {
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
            <p>asd</p>
        </div>
    );
};

export default HomePage;
