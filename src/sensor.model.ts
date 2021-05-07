export interface Channel {
  id: number;
  name: string;
  description: string;
  latitude: string;
  longitude: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  created_at: Date;
  updated_at: Date;
  last_entry_id: number;
}

export interface Feed {
  created_at: Date;
  entry_id: number;
  field1?: string;
  field2?: string;
  field3?: string;
  field4?: string;
  field5?: string;
  field6?: string;
  field7?: string;
  field8?: string;
}

export interface ThingSpeakResponse {
  channel: Channel;
  feeds: Feed[];
}
