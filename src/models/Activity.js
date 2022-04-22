export class Activity {
  constructor(
    elementType,
    elementId,
    activityKey,
    activityParameters,
    stateDelta
  ) {
    this.elementType = elementType;
    this.elementId = elementId;
    this.activityKey = activityKey;
    this.activityParameters = activityParameters;
    this.stateDelta = stateDelta;
  }
}
