interface IRightsInfo {
  authName: string;
  id: number;
  path: string;
  children?: IRightsInfo[];
}

export type { IRightsInfo };
