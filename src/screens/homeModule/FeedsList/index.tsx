import React from "react";
import { FeedsListTemplate } from "@instagram/components/templates/home/index.tsx";
import { useRoute } from "@react-navigation/native";

const FeedsList = () => {
    const route = useRoute();
    const { index, userFeedList }: any = route.params;
    return (
        <FeedsListTemplate index={index} userFeedList={userFeedList} />
    );
};

export default FeedsList;