type Message = {
    author: string;
    replies: Message[];
};

type Board = {
    name: string;
    messages: Message[];
};

export type { Message, Board };
