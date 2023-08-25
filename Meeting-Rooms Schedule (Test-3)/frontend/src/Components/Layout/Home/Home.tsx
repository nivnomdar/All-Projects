import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import Team from "../../Models/team";
import Meeting from "../../Models/meeting";

function Home(): JSX.Element {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([]); // Assuming the meetings data is an array

  useEffect(() => {
    if (teams.length < 1) {
      axios
        .get("http://localhost:4000/api/v1/exam/allteams")
        .then((response) => response.data)
        .then((teams: Team[]) => {
          setTeams(teams);

          // console.log(teams);
        });
      setRefresh(true);
    }
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      axios
        .get(
          `http://localhost:4000/api/v1/exam/getMeetingsById/${selectedTeam}`
        )
        .then((response) => response.data)
        .then((meetingsData: Meeting[]) => {
          setMeetings(meetingsData);
          console.log(meetingsData);
        });
    }
  }, [selectedTeam]);

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
    // console.log(event.target.value);
  };

  return (
    <div className="Home">
      <div className="title">Meetings details</div>
      <br />
      <select id="teams" value={selectedTeam} onChange={handleTeamChange}>
        <option value="" disabled>
          Choose a Team
        </option>
        {teams.map((team: Team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
      <br /> <br />
      <table>
        <thead>
          <tr>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Description</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting: Meeting) => (
            <tr key={meeting.id}>
              <td>{meeting.starttime}</td>
              <td>{meeting.endtime}</td>
              <td>{meeting.description}</td>
              <td>{meeting.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
