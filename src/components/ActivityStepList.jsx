import { ActivityItem } from "./ActivityItem";

export function ActivityStepList(props) {
  const { steps } = props;

  return (
    <div
      style={{
        // yellow border
        border: "1px solid #ffd700",
      }}
    >
      <h2>Activity step collection</h2>
      {steps.map((step, index) => (
        <>
          <ActivityStepItem key={index} index={index} step={step} />
          <hr />
        </>
      ))}
    </div>
  );
}

export function ActivityStepItem(props) {
  const { step, index } = props;

  return (
    <div
      style={{
        // Brown  border
        border: "1px solid #996633",
        padding: "8px",
      }}
    >
      <small>
        <div>
          <b>index </b>
          <mark>{index}</mark>
        </div>
        <div>
          <b>Activites length </b>
          {step.activities.length}
        </div>
        <div>
          {step.activities.map((activity, index) => (
            <ActivityItem key={index} activity={activity} />
          ))}
        </div>
      </small>
    </div>
  );
}
