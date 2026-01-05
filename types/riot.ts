export interface TftTrait {
  name: string;
  tier_current: number;
  num_units: number;
}

export interface TftUnit {
  character_id: string;
  itemNames: string[];
  tier: number;
}

export interface TftParticipant {
  puuid: string;
  placement: number;
  traits: TftTrait[];
  units: TftUnit[];
}

export interface TftMatch {
  metadata: { match_id: string };
  info: {
    game_datetime: number;
    game_length: number;
    participants: TftParticipant[];
  };
}
