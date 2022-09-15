import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type PetsFirestoreDTO={
  nome:string;
  raca:string;
  idade:string;
  cidade:string;
  estado:string;
  descricao:string;
  url:string;
  status:'naoadotado'|'adotado';
  adotar?: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
  closed_at?: FirebaseFirestoreTypes.Timestamp;

}