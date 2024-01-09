import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StoryBookI18nModule } from "../../../stories/storybook.module";
import { ReleaseNotesComponent } from "./release-notes.component";
import { ReleaseNotes } from "./release-notes.component.i";
import { ReleaseNotesModule } from "./release-notes.module";

const releaseNotes: ReleaseNotes = {
  "1.0.0": {
    new: [
      "Sync your notes to unlimited devices and work offline.",
      "See all your tasks in a summarized view and set due dates and reminders.",
      "Connect calendars from your primary Google Calendar account.",
    ],
    fixed: [
      "Now you can see a count of how many tasks you've completed out of the total number of tasks in a note. Because we can all use a little encouragement.",
      "bugfix2",
    ],
  },
  "2.0.0": {
    new: [
      "Sync your notes to unlimited devices and work offline.",
      "See all your tasks in a summarized view and set due dates and reminders.",
      "Connect calendars from your primary Google Calendar account.",
    ],
    fixed: [
      "The app was sometimes a little too eager to export clipped notes as PDFs, leaving images behind. Now it'll wait patiently until everything has finished downloading.",
      "bugfix2",
    ],
  },
  "3.0.0": {
    new: ["new feature1", "new feature2"],
    fixed: ["bugfix1", "bugfix2"],
  },
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ReleaseNotesComponent> = {
  title: "Components / Atoms/Release Notes",
  argTypes: {},
  component: ReleaseNotesComponent,
  decorators: [
    moduleMetadata({
      imports: [ReleaseNotesModule, BrowserAnimationsModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<ReleaseNotesComponent>;

export const Normal: Story = {
  args: {
    releaseNotes,
  },
};
