import { ActivityStepItem } from "./ActivityStepList";

export function ActivityBlockList(props) {
  const { blocks } = props;

  return (
    <div
      style={{
        // Blue border
        border: "1px solid #00f",
      }}
    >
      <h2>Activity block collection</h2>
      {blocks.map((block, index) => (
        <>
          <ActivityBlockItem key={index} index={index} block={block} />
          <hr />
        </>
      ))}
    </div>
  );
}

export function ActivityBlockItem(props) {
  const { block, index } = props;

  return (
    <small>
      <div>
        <b>index </b>
        <mark>{index}</mark>
      </div>
      <div>
        <b>Name </b>
        {block.name}
      </div>
      <div>
        <b>Steps length </b>
        {block.steps.length}
      </div>
      <div>
        {block.steps.map((step, index) => (
          <ActivityStepItem key={index} step={step} />
        ))}
      </div>
    </small>
  );
}
