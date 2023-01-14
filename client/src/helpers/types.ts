type MessageType = {
    author: UserType;
    content: string;
    replies: MessageType[];
    _id: string;
    createdAt: string;
};

type BoardType = {
    name: string;
    messages: MessageType[];
    url: string;
    _id: string;
};

type UserType = {
    username: string;
    membership_status: "guest" | "member" | "admin";
};

export type { MessageType, BoardType, UserType };
