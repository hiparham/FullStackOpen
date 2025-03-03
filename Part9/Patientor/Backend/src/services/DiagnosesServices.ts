import Diagnoses from "../../data/diagnoses";
import { DiagnoseEntry } from "../utils/Types";

const getAllDiagnoses = (): DiagnoseEntry[] => Diagnoses;

export { getAllDiagnoses };
