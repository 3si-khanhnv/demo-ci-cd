import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { CommentsComponent } from "./comments.component";
import { CommentItem } from "./comments.component.i";

const comments: CommentItem[] = [
  {
    userName: "John Smith",
    dateTime: "2021/07/02",
    content:
      "To generate HTML output, see package html/template, which has the same interface as this package but automatically secures HTML output against certain attacks. To generate HTML output, see package html/template, which has the same interface as this package but automatically secures HTML output against certain attacks.",
  },
  {
    userName: "Adam Ramsey",
    dateTime: "2021/07/05",
    content:
      "Arguments may evaluate to any type; if they are pointers the implementation automatically indirectly to the base type when required. If an evaluation yields a function value, such as a function-valued field of a struck, the function is not invoked automatically, but it can be used as a truth value for an if action and the like. To invoke it, use the call function, defined below.",
  },
  {
    userName: "Dominic",
    dateTime: "2021/07/06",
    content:
      "A pipeline may be chained by separating a sequence of commands with pipeline characters '|'. In a chained pipeline, the result of each command is passed as the last argument of the following command. The output of the final command in the pipeline is the value of the pipeline.",
  },
  {
    userName: "Vin Diesel",
    dateTime: "2021/07/07",
    content:
      "The only condition is they have to be present in the displayedColumns array. If you are getting this array from the backend then just add a new item to it To generate HTML output, see package html/template, which has the same interface as this package but automatically secures HTML output against certain attacks.",
  },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<CommentsComponent> = {
  title: "Components/ Atoms/Comments",
  component: CommentsComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CommentsComponent>;
export const Normal: Story = {
  args: {
    comments,
  },
};

export const DateRight: Story = {
  args: {
    comments,
    isRightDate: true,
  },
};
