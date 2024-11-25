import React from "react";
import { useRoute } from "@react-navigation/native";

import { OtherUserProfileTemplate } from "@instagram/components/templates/home/index.tsx";

const OtherUserProfile = () => {

    const routes: any = useRoute();
    const otherUserId = routes?.params?.otherUserId;

    return (
        <OtherUserProfileTemplate otherUserId={otherUserId} />
    );
};

export default OtherUserProfile;