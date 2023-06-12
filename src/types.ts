import { Feature } from "maplibre-gl";

export type SearchContextType = [
  searchData: SearchDataType,
  setSearchData: React.Dispatch<React.SetStateAction<SearchDataType>>
];

export type SearchDataType = {
  searchPlace: string;
  postcode: string;
  longitude: number;
  latitude: number;
  travelMethod: "walking" | "cycling" | "driving";
  travelTime: "5" | "15" | "30";
};

export type PlaceContextType = [
  clickedPlace: Feature | null,
  setClickedPlace: React.Dispatch<React.SetStateAction<Feature | null>>
];

export type PlacesType = {
  attribution: string;
  features: Feature[];
  type: "FeatureCollection";
};
