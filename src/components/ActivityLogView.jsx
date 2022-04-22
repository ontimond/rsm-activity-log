import { Activity } from "../models/Activity";
import { ActivityLog } from "../models/ActivityLog";
import ReactJson from "react-json-view";
import { ActivityList } from "./ActivityList";
import { useEffect, useState } from "react";
import { ActivityStepList } from "./ActivityStepList";
import { ActivityStep } from "../models/ActivityStep";
import { ActivityBlockList } from "./ActivityBlockList";
import { ActivityBlock } from "../models/ActivityBlock";

export function ActivityLogView() {
  const [activityCollection, setActivityCollection] = useState([]);
  const [activityStepCollection, setActivityStepCollection] = useState([]);
  const [activityBlockCollection, setActivityBlockCollection] = useState([]);

  const [activityLog, setActivityLog] = useState(new ActivityLog());

  const addActivityToCollection = () => {
    // Ask for each property of the activity:
    //elementType,
    //elementId,
    //activityKey,
    //activityParameters,
    //stateDelta

    const elementType = prompt("Element type:", "TypeA");
    const elementId = prompt("Element id:", Math.round(Math.random() * 100));
    const activityKey = prompt("Activity key:", "damageReceived");
    const activityParameters = JSON.parse(
      prompt("Activity parameters (JSON format):", '{ "value": 5 }')
    );
    const stateDelta = JSON.parse(
      prompt("State delta (JSON format):", '{ "enemy.1.hp_current": 42 }')
    );

    const activity = new Activity(
      elementType,
      elementId,
      activityKey,
      activityParameters,
      stateDelta
    );

    setActivityCollection([...activityCollection, activity]);
  };

  const addActivityStepToCollection = () => {
    const activityIndexes = prompt("Activity indexes (comma separated):");
    const activityIndexesArray = activityIndexes.split(",");
    const activityStep = new ActivityStep();
    activityIndexesArray.forEach((activityIndex) => {
      const activity = activityCollection[activityIndex];
      if (activity) {
        activityStep.addActivity(activity);
      }
    });
    setActivityStepCollection([...activityStepCollection, activityStep]);
    // Remove activities from the collection
    setActivityCollection(
      activityCollection.filter(
        (_activity, index) => !activityIndexesArray.includes(index.toString())
      )
    );
  };

  const addActivityBlockToCollection = () => {
    const activityBlockName = prompt("Activity block name:", "block1");
    const activityStepIndexes = prompt(
      "Activity step indexes (comma separated):"
    );
    const activityStepIndexesArray = activityStepIndexes.split(",");
    const activityBlock = new ActivityBlock(activityBlockName);
    activityStepIndexesArray.forEach((activityStepIndex) => {
      const activityStep = activityStepCollection[activityStepIndex];
      if (activityStep) {
        activityBlock.addStep(activityStep);
      }
    });
    setActivityBlockCollection([...activityBlockCollection, activityBlock]);
    // Remove activity steps from the collection
    setActivityStepCollection(
      activityStepCollection.filter(
        (_activityStep, index) =>
          !activityStepIndexesArray.includes(index.toString())
      )
    );
  };

  const promptOptions = () => {
    const options = {};

    options.placement = prompt(
      "Placement (append | preppend | after | before)",
      "append"
    );
    if (options.placement === "after" || options.placement === "before") {
      options.blockRef = prompt("Block reference:");
    }

    options.merge = {};
    options.merge.enabled = prompt("Merge enabled (Y/N):", "N") === "Y";
    if (options.merge.enabled) {
      options.merge.mergeSteps = prompt("Merge steps (Y/N):", "N") === "Y";
    }

    return options;
  };

  const addBlockToLog = () => {
    const activityBlockIndex = prompt("Activity block index:");
    const options = promptOptions();
    const block = activityBlockCollection[activityBlockIndex];

    if (!block) {
      alert("Activity block not found");
    }
    try {
      activityLog.addBlock(block, options);
      setActivityLog(activityLog);
    } catch (e) {
      alert(e);
      return;
    }

    setActivityBlockCollection(
      activityBlockCollection.filter(
        (_activityBlock, index) => index.toString() !== activityBlockIndex
      )
    );
  };

  const newBlockToLog = () => {
    const name = prompt("Activity block name:");
    const options = promptOptions();

    try {
      activityLog.newBlock(name, options);
      setActivityLog(activityLog);
    } catch (e) {
      alert(e);
      return;
    }

    setActivityLog(activityLog);
  };

  const addStepToBlock = () => {
    const blockName = prompt("Block name:");
    const stepIndex = prompt("Step index:");
    const step = activityStepCollection[stepIndex];

    if (!step) {
      alert("Step not found");
    }

    try {
      activityLog.addStepToBlock(blockName, step);
      setActivityLog(activityLog);
    } catch (e) {
      alert(e);
      return;
    }

    setActivityStepCollection(
      activityStepCollection.filter(
        (_, index) => index.toString() !== stepIndex
      )
    );
  };

  const addActivityToBlock = () => {
    const blockName = prompt("Block name:");
    const activityIndex = prompt("Activity index:");
    const activity = activityCollection[activityIndex];

    if (!activity) {
      alert("Activity not found");
      return;
    }

    try {
      activityLog.addActivity(blockName, activity);
      setActivityLog(activityLog);
    } catch (e) {
      alert(e);
    }

    setActivityCollection(
      activityCollection.filter(
        (_, index) => index.toString() !== activityIndex
      )
    );
  };

  const clearLog = () => {
    setActivityLog(new ActivityLog());
  };

  const getActivitiesForElement = () => {
    const stepIndex = prompt("Step index:");
    const step = activityStepCollection[stepIndex];

    if (!step) {
      alert("Step not found");
      return;
    }
    const elementType = prompt("Type:");
    const elementId = prompt("Id:");

    alert(
      JSON.stringify(
        step.getActivitiesForElement(
          elementType,
          elementId === "" ? null : elementId
        ),
        null,
        2
      )
    );
  };

  const getElements = () => {
    const stepIndex = prompt("Step index:");
    const step = activityStepCollection[stepIndex];

    if (!step) {
      alert("Step not found");
      return;
    }

    alert(JSON.stringify(step.getElements(), null, 2));
  };

  return (
    <>
      <h1>Activity Log</h1>
      <p>
        First create the data in the collections to perform the tests in the
        Log.
      </p>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 8,
          marginBottom: 8,
        }}
      >
        <button onClick={() => addBlockToLog()}>Add block</button>
        <button onClick={() => newBlockToLog()}>New block</button>
        <button onClick={() => addStepToBlock()}>Add step to block</button>
        <button onClick={() => addActivityToBlock()}>
          Add activity to block
        </button>
        <button onClick={() => clearLog()}>Clear</button>
      </div>
      <ReactJson
        src={activityLog}
        style={{
          border: "1px solid black",
        }}
        displayDataTypes={false}
        enableClipboard={false}
        displayObjectSize={false}
        quotesOnKeys={false}
        displayArrayKey={false}
        iconStyle="circle"
      />

      <h1>Serialized</h1>
      <ReactJson
        style={{
          border: "1px solid black",
        }}
        src={activityLog.serialize()}
        displayDataTypes={false}
        displayObjectSize={false}
        quotesOnKeys={false}
        displayArrayKey={false}
        iconStyle="circle"
      />
      <h1>Collections</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <button
          style={{
            alignSelf: "flex-start",
          }}
          onClick={() => addActivityToCollection()}
        >
          Add activity to collection
        </button>
        <ActivityList activities={activityCollection} />
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: 8,
          }}
        >
          <button onClick={() => addActivityStepToCollection()}>
            Add activity step to collection
          </button>
          <button onClick={() => getActivitiesForElement()}>
            Get activities for element Add activity step to collection
          </button>
          <button onClick={() => getElements()}>Get elements</button>
        </div>
        <ActivityStepList steps={activityStepCollection} />

        <button
          style={{
            alignSelf: "flex-start",
          }}
          onClick={() => addActivityBlockToCollection()}
        >
          Add activity block to collection
        </button>
        <ActivityBlockList blocks={activityBlockCollection} />
      </div>
    </>
  );
}
