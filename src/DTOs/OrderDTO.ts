import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type PetsFirestoreDTO={
  nome:string;
  descricao:string;
  status:'naoadotado'|'adotado';
  adotar?: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
  closed_at?: FirebaseFirestoreTypes.Timestamp;

}