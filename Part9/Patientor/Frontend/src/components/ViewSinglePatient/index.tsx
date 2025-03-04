import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Entry, PatientSingle } from "../../types";
import patientService from "../../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { getAllDiagnoses } from "../../services/diagnoses";

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
      {Patient.entries.length > 0 && (
        <>
          <p>Entries : </p>
          {Patient.entries.map((entry: Entry) => {
            return (
              <div>
                <p>
                  {entry.date} | {entry.description}
                </p>
                <ul>
                  {entry.diagnosisCodes.map((diagnose) => {
                    return (
                      <li key={diagnose}>
                        {diagnose} |{" "}
                        {diagnoses.find((x) => x.code === diagnose)?.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
