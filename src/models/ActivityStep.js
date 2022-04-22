export class ActivityStep {
  constructor() {
    this.activities = [];
  }

  addActivity(activity) {
    this.activities.push(activity);
  }

  getActivitiesForElement(elementType, elementId = null) {
    return this.activities.filter((activity) => {
      return (
        activity.elementType === elementType &&
        (elementId === null || activity.elementId === elementId)
      );
    });
  }

  getElements() {
    const ids = new Set(this.activities.map(({ elementId }) => elementId));

    return Array.from(ids).map((id) => {
      return {
        elementId: id,
        elementType: this.activities.find(
          (activity) => activity.elementId === id
        ).elementType,
      };
    });
  }
}
