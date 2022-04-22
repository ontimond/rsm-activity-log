import { ActivityBlock } from "./ActivityBlock";
import { ActivityStep } from "./ActivityStep";

export class ActivityLog {
  constructor() {
    this.blocks = [];
  }

  findBlockByName(name) {
    return this.blocks.find((block) => block.name === name);
  }

  addBlock(block, options) {
    options = options || {};

    const oldBlock = this.findBlockByName(block.name);

    if (!oldBlock) {
      if (
        (options.placement === "before" || options.placement === "after") &&
        !options.blockRef
      ) {
        options.placement = "append";
      }

      switch (options.placement) {
        case "before":
          this.blocks.splice(
            this.blocks.indexOf(this.findBlockByName(options.blockRef)),
            0,
            block
          );
          break;
        case "after":
          this.blocks.splice(
            this.blocks.indexOf(this.findBlockByName(options.blockRef)) + 1,
            0,
            block
          );
          break;
        case "prepend":
          this.blocks.unshift(block);
          break;
        case "append":
        default:
          this.blocks.push(block);
          break;
      }
    } else {
      if (!options.merge?.enabled) {
        throw `Block ${block.name} already exists, and merge is disabled.`;
      }

      if (!options.merge?.mergeSteps) {
        block.steps.forEach((step) => {
          oldBlock.addStep(step);
        });
      } else {
        block.steps.forEach((step, i) => {
          if (oldBlock.steps[i]) {
            step.activities.forEach((activity) => {
              oldBlock.steps[i].addActivity(activity);
            });
          } else {
            oldBlock.addStep(step);
          }
        });
      }
    }
  }

  newBlock(name, options) {
    const block = new ActivityBlock(name);
    this.addBlock(block, options);
    return block;
  }

  addStepToBlock(blockName, step) {
    const block = this.findBlockByName(blockName);
    if (!block) {
      throw new Error(`Block ${blockName} does not exist.`);
    }
    block.addStep(step);
  }

  addActivity(blockName, activity) {
    let block = this.findBlockByName(blockName);
    if (!block) {
      block = this.newBlock(blockName);
    }

    if (!block.steps.length) {
      this.addStepToBlock(blockName, new ActivityStep());
    }

    block.steps[block.steps.length - 1].addActivity(activity);
  }

  serialize() {
    return {
      activityLog: this.blocks.flatMap((block) =>
        block.steps.map((step) => step.activities)
      ),
    };
  }

  clear() {
    this.blocks = [];
  }
}
