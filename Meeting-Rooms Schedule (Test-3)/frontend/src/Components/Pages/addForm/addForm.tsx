import { useEffect, useState } from "react";
import "./addForm.css";
import { useNavigate } from "react-router-dom";
import Meeting from "../../Models/meeting";
import axios from "axios";
import Team from "../../Models/team";

function AddForm(): JSX.Element {
  const [meetings, setMeetings] = useState<Meeting[]>([]); // Assuming the meetings data is an array
  const [teams, setTeams] = useState<Team[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");

  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [room, setRoom] = useState("");
  const [teamId, setTeamId] = useState<number>();

  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("teams")) {
      axios
        .get("http://localhost:4000/api/v1/exam/allteams")
        .then((response) => response.data)
        .then((teams: Team[]) => {
          setTeams(teams);

          console.log(teams);
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
          console.log("DATA :", meetingsData);
        });
    }
  }, [selectedTeam]);

  const addNewMeeting = async () => {
    if (validateForm()) {
      const newMeeting = new Meeting(
        meetings.length + 1,
        starttime,
        endtime,
        description,
        room,
        teamId || 1
      );
      // meetings.push(newMeeting);
      console.log(newMeeting);
      const response = await axios.post(
        "http://localhost:4000/api/v1/exam/addMeeting",

        newMeeting
      );
      // console.log(response);
      // console.log(starttime, endtime);
      navigate("/");
    }
  };

  const validateForm = () => {
    const errors: any = {};

    if (!starttime) {
      errors.starttime = "Start time is required.";
    }

    if (!endtime) {
      errors.endtime = "End time is required.";
    }

    if (!description) {
      errors.description = "Description is required.";
    }

    if (!room) {
      errors.room = "Room is required.";
    }

    if (!teamId) {
      errors.teamId = "Team is required.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return (
    <div className="addForm">
      <h1>Add new meeting</h1>
      <hr />
      <div className="newForm">
        <input
          type="text"
          id="startMeeting"
          placeholder="Time of start..."
          value={starttime}
          onChange={(args) => setStartTime(args.target.value)}
          required></input>
        <br />
        <br />
        <input
          type="text"
          id="endMeeting"
          placeholder="Time of ending..."
          value={endtime}
          onChange={(args) => setEndTime(args.target.value)}
          required></input>
        <br />
        <br />
        <input
          type="text"
          id="description"
          placeholder="Description..."
          value={description}
          onChange={(args) => setDescription(args.target.value)}
          required></input>
        <br />
        <br />
        <input
          type="text"
          id="room"
          placeholder="Name of room..."
          value={room}
          onChange={(args) => setRoom(args.target.value)}
          required></input>
        <br />
        <br />
        <select
          value={teamId}
          onChange={(args) => setTeamId(Number(args.target.value))}
          required>
          <option value="" disabled>
            Choose your Team
          </option>
          {teams.map((team: Team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          value="Save"
          id="submitB"
          className="btn btn-primary"
          onClick={addNewMeeting}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddForm;
