import React from 'react';

import { useRoute } from '@react-navigation/native';
import { FriendsListPageTemplate } from '@instagram/components/templates/home';

const FriendsList = () => {
    const route = useRoute();
    const { keyword, userId }: any = route.params;
    return (
        <FriendsListPageTemplate keyword={keyword} userId={userId} />
    )
}

export default FriendsList