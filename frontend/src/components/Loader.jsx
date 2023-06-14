import React from "react";
import Skeleton from "react-loading-skeleton";

const Loader = () => {
    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "40%" }}>
                <Skeleton circle height={500} width={500} />
            </div>
            <div style={{ width: "50%" }}>
                <Skeleton count={4} />
            </div>
        </div>
    );
};

export default Loader;
