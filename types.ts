export interface TriangleData {
  count: number;
  sticks: number;
  formula: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}