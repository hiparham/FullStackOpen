import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, PatientSingle } from "../../types";
import patientService from "../../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { getAllDiagnoses } from "../../services/diagnoses";
import Entries from "./Entries";

export default function SinglePatientPage() {
  const { id } = useParams();
  const [Patient, SetPatient] = useState<PatientSingle | null>(null);
  const [diagnoses, setAllDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    getAllDiagnoses().then((response) => {
      setAllDiagnoses(response);
    });
  }, []);

  useEffect(() => {
    if (id) {
      patientService.getPatient(id).then((response) => {
        SetPatient(response);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!id || !Patient || diagnoses.length === 0) return null;
  return (
    <div>
      <h1>
        {Patient.name}{" "}
        {Patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </h1>
      <p>SSH : {Patient.ssn}</p>
      <p>Occupation : {Patient.occupation}</p>
      <Entries patient={Patient} />
    </div>
  );
}
