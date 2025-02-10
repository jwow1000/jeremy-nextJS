export interface Entry {
  type: string;
  title: string;
  date: string;
  description: string;
  location: string;
  renderDate: string;
  link: string;
}

export interface EntryCategory {
  type: string;
  children: Entry[];
}

export type PostDictionary = Record<string, EntryCategory>; // Object where keys are category types

// types for the API call
export interface WordPressCVEntry {
  title: string;
  cvEntryFields: {
    type: string[]; // Assuming it's an array, but we take only the first item
    date: string;
    location: string;
    description: string;
    renderDate: string;
    link: string;
  };
}

// Type the API response
export interface WordPressAPIResponse {
  data: {
    cvEntries: {
      nodes: WordPressCVEntry[];
    };
  };
}

