import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type PetsFirestoreDTO={
  nome:string;
  raca:string;
  idade:string;
  cidade:string;
  estado:string;
  descricao:string;
  status:'naoadotado'|'adotado';
  photo_url:string;
  adotar?: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
  closed_at?: FirebaseFirestoreTypes.Timestamp;

}