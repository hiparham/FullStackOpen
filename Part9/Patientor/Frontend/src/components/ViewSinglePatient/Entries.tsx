import { ReactElement } from "react";
import { Entry, PatientSingle } from "../../types";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import "./PatientStyle.css";
export default function Entries({ patient }: { patient: PatientSingle }) {
  if (patient.entries.length === 0) return null;
  const Entries: ReactElement[] = patient.entries.map((entry: Entry) => {
    switch (entry.type) {
      case "Hospital": {
        return (
          <li className="entry_item">
            <p style={{ color: "green", marginBottom: ".5rem" }}>
              {entry.date} | Hospital <LocalHospitalIcon />
            </p>
            <p>{entry.description}</p>
            <p>Diagnosed By {entry.specialist}</p>
          </li>
        );
      }
      case "HealthCheck": {
        return (
          <li className="entry_item">
            <p style={{ color: "rgb(0, 148, 153)", marginBottom: ".5rem" }}>
              {entry.date} | Health Check <FavoriteBorderIcon />
            </p>
            <p>{entry.description}</p>
            <p>Diagnosed By {entry.specialist}</p>
          </li>
        );
      }
      case "OccupationalHealthcare": {
        return (
          <li className="entry_item">
            <p style={{ color: "rgb(0, 28, 153)", marginBottom: ".5rem" }}>
              {entry.date} | Occupational Healthcare <WorkIcon />
            </p>
            <p>{entry.description}</p>
            <p>Diagnosed By {entry.specialist}</p>
          </li>
        );
      }
    }
  });
  return (
    <section>
      <h1 style={{ marginBlock: "2rem" }}>Entries</h1>
      <ul>{Entries}</ul>
    </section>
  );
}
