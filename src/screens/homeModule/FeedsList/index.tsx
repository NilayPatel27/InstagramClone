import React from "react";
import { useRoute } from "@react-navigation/native";
import { FeedsListTemplate } from "@instagram/components/templates/home/index.tsx";

const FeedsList = () => {
    const routes = useRoute();
    const { otherUserId }: any = routes?.params;
    return (
        <FeedsListTemplate otherUserId={otherUserId} />
    );
};

export default FeedsList;