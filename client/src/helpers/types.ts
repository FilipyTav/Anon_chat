type MessageType = {
    author: string;
    content: string;
    replies: MessageType[];
};

type BoardType = {
    name: string;
    messages: MessageType[];
};

export type { MessageType, BoardType };
