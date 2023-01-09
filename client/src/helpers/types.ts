type MessageType = {
    author: UserType;
    content: string;
    replies: MessageType[];
    _id: string;
};

type BoardType = {
    name: string;
    messages: MessageType[];
    url: string;
    _id: string;
};

type UserType = {
    username: string;
};

export type { MessageType, BoardType };
