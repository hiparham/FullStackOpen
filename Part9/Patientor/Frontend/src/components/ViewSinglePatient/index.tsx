import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PatientSingle } from "../../types";
import patientService from "../../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
export default function SinglePatientPage() {
  const { id } = useParams();
  const [Patient, SetPatient] = useState<PatientSingle | null>(null);
  useEffect(() => {
    if (id) {
      patientService.getPatient(id).then((response) => {
        SetPatient(response);
      });
    }
  }, []);

  if (!id || !Patient) return null;
  return (
    <div>
      <h1>
        {Patient.name}{" "}
        {Patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </h1>
      <p>SSH : {Patient.ssn}</p>
      <p>Occupation : {Patient.occupation}</p>
    </div>
  );
}
