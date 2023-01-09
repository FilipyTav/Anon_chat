type MessageType = {
    author: string;
    content: string;
    replies: MessageType[];
};

type BoardType = {
    name: string;
    messages: MessageType[];
    url: string;
    _id: string;
};

export type { MessageType, BoardType };
