import { ActivityItem } from "./ActivityItem";

export function ActivityList(props) {
  const { activities } = props;

  return (
    <div
      style={{
        // Green border
        border: "1px solid #00ff00",
      }}
    >
      <h2>Activity collection</h2>
      {activities.map((activity, index) => (
        <>
          <ActivityItem activity={activity} key={index} index={index} />
          <hr />
        </>
      ))}
    </div>
  );
}
