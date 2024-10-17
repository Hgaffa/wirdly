export interface VerseKey {
    chapter: number;
    verse: number;
}

export interface VerseTextDTO {
    id: string;
    text_uthmani_tajweed: string;
    verse_key: string;
}