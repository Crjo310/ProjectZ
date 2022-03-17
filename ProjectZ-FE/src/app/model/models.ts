export interface Lobby {
    id: string;
    name: string;
    maxPlayer: number;
    players: User[];
    admin: User;
    gameType: number;
    started: boolean;
}

export interface User {
    id: string;
    name: string;
    avatarId: string;
}

export interface Player{
    user: User;
    points: number;
    answer: string;
}

export interface Game {
    id: string;
    gameType: number;
    players: Player[];
    admin: User;
    buzzerEnabled: boolean;
    activeBuzzer: String;
    currentQuestion: String;
    currentAnswer: String;
    showAnswer: boolean;
}

export interface Quizset {
    name: string;
    categories: Category[];
}

export interface Category {
    head: string;
    questions: Question[];
}

export interface Question {
    question: string;
    answer: string;
    points: number;
    category: number;
}

export interface Message {
    text: string;
    playerId: string;
}