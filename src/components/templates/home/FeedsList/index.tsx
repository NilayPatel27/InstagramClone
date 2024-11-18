import React from 'react';
import { View, FlatList } from 'react-native';

import { OneFeedTemplate, MultiFeedsTemplate } from '@instagram/components/templates/home/index.tsx';

const FeedsListTemplate = ({ index, userFeedList }: any) => {

    const renderFeeds = (item: any, index: any) => {
        return (
            item.feeds.length > 1
                ? <MultiFeedsTemplate imageList={item.feeds} />
                : <OneFeedTemplate image={item.feeds[0]} />
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }} >
            <FlatList
                data={userFeedList ? userFeedList : []}
                renderItem={({ item }) => renderFeeds(item, index)}
                keyExtractor={(_, index) => index.toString()}
            />
        </View>
    )
}

export default FeedsListTemplate;