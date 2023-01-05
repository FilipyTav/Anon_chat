type MessageType = {
    author: string;
    replies: MessageType[];
};

type BoardType = {
    name: string;
    messages: MessageType[];
};

export type { MessageType, BoardType };
