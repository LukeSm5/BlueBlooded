export type Thread = {
    id: string;
    user_id: string;
    title: string;
    body: string;
    category: string;
    topic_tag?: string;
    pinned: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
}