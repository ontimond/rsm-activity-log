export function ActivityItem(props) {
  const { activity, index } = props;

  return (
    <div
      style={{
        // Red border
        border: "1px solid red",
        padding: "8px",
      }}
    >
      <small>
        {index !== undefined && (
          <div>
            <b>index </b>
            <mark>{index}</mark>
          </div>
        )}
        <div>
          <b>
            <i>Element type </i>
          </b>
          {activity.elementType}
        </div>
        <div>
          <b>
            <i>Element id </i>
          </b>
          {activity.elementId}
        </div>
        <div>
          <b>
            <i>Activity key </i>
          </b>
          {activity.activityKey}
        </div>
        <div>
          <b>
            <i>Activity parameters </i>
          </b>
          <code>{JSON.stringify(activity.activityParameters)}</code>
        </div>
        <div>
          <b>
            <i>State delta </i>
          </b>
          <code>{JSON.stringify(activity.stateDelta)}</code>
        </div>
      </small>
    </div>
  );
}
