export interface Lobby {
    id: string;
    name: string;
    maxPlayer: number;
    players: Player[];
    admin: Player;
}

export interface Player {
    id: string;
    name: string;
    avatarId: string;
}