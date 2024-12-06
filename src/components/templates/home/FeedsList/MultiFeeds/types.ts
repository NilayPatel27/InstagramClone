export interface MultiFeedTemplateProps {
    imageList: string[];
    feedId: string;
    onDeletePress: (params: { feedId: string }) => void;
    deleteUserFeedLoading: boolean;
    userName: string;
    userId: string;
    profileImage: string;
}