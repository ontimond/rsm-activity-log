import { ActivityStep } from "./ActivityStep";

export class ActivityBlock {
  constructor(name) {
    this.name = name;
    this.steps = [];
  }

  addStep(step) {
    this.steps.push(step);
  }

  addActivity(activity, currentStep = true) {
    if (!currentStep || this.steps.length === 0) {
      const step = new ActivityStep();
      step.addActivity(activity);
      this.addStep(step);
    } else {
      this.steps[this.steps.length - 1].addActivity(activity);
    }
  }
}
