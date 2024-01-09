import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { Labels } from "../form/form.component.i";
import { TransactionViewCommentComponent } from "./transaction-view-comment.component";
import { TransactionViewCommentModule } from "./transaction-view-comment.module";
import { StoryBookI18nModule } from "../../../stories/storybook.module";

const comments = [
  {
    userName: "John Smith",
    commentDatetime: "2021/07/02",
    comment:
      "To generate HTML output, see package html/template, which has the same interface as this package but automatically secures HTML output against certain attacks. To generate HTML output, see package html/template, which has the same interface as this package but automatically secures HTML output against certain attacks.",
  },
  {
    userName: "Adam Ramsey",
    commentDatetime: "2021/07/05",
    comment:
      "Arguments may evaluate to any type; if they are pointers the implementation automatically indirectly to the base type when required. If an evaluation yields a function value, such as a function-valued field of a struck, the function is not invoked automatically, but it can be used as a truth value for an if action and the like. To invoke it, use the call function, defined below.",
  },
  {
    userName: "Dominic",
    commentDatetime: "2021/07/06",
    comment:
      "A pipeline may be chained by separating a sequence of commands with pipeline characters '|'. In a chained pipeline, the result of each command is passed as the last argument of the following command. The output of the final command in the pipeline is the value of the pipeline.",
  },
  {
    userName: "Vin Diesel",
    commentDatetime: "2021/07/07",
    comment:
      "The only condition is they have to be present in the displayedColumns array. If you are getting this array from the backend then just add a new item to it To generate HTML output, see package html/template, which has the same interface as this package but automatically secures HTML output against certain attacks.",
  },
  {
    userName: "Dominic",
    commentDatetime: "2021/07/06",
    comment:
      "A pipeline may be chained by separating a sequence of commands with pipeline characters '|'. In a chained pipeline, the result of each command is passed as the last argument of the following command. The output of the final command in the pipeline is the value of the pipeline.",
  },
  {
    userName: "Dominic",
    commentDatetime: "2021/07/06",
    comment:
      "A pipeline may be chained by separating a sequence of commands with pipeline characters '|'. In a chained pipeline, the result of each command is passed as the last argument of the following command. The output of the final command in the pipeline is the value of the pipeline.",
  },
];

const meta: Meta<TransactionViewCommentComponent> = {
  title: "Components / Atoms/View Transaction Comment",
  component: TransactionViewCommentComponent,
  decorators: [
    moduleMetadata({
      imports: [TransactionViewCommentModule, StoryBookI18nModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TransactionViewCommentComponent>;

export const CaseHaveComment: Story = {
  render: (args) => ({
    props: args,
    template: `
      <imo-transaction-view-comment [labelDialog]="labelDialog" [labels]="labels" [dataHeader]="dataHeader" [comments]="comments" [accessTransactionAddComments]="accessTransactionAddComments"></imo-transaction-view-comment>
    `,
  }),
  args: {
    labels: {
      placeholder: "This is a placeHolder",
      aria: "This is aria-label for form",
      type: "textarea",
    } as Labels,
    dataHeader: {
      transactionDateTime: "2021-04-26 22:40:02(GMT)",
      messageSequenceNumber: "123456789012",
    },
    labelDialog: {
      comment: "Comment",
      sequenceNumber: "SequenceNumber",
    },
    comments: comments,
    accessTransactionAddComments: true,
  },
};

export const CaseNotComment = {
  render: (args) => ({
    props: args,
    template: `
      <imo-transaction-view-comment [labelDialog]="labelDialog" [dataHeader]="dataHeader" [comments]="comments" [accessTransactionAddComments]="accessTransactionAddComments"></imo-transaction-view-comment>
    `,
  }),
  args: {
    labels: {
      placeholder: "This is a placeHolder",
      aria: "This is aria-label for form",
      type: "textarea",
    } as Labels,
    dataHeader: {
      transactionDateTime: "2021-04-26 22:40:02(GMT)",
      messageSequenceNumber: "123456789012",
    },
    comments: comments,
    accessTransactionAddComments: false,
    labelDialog: {
      comment: "Comment",
      sequenceNumber: "SequenceNumber",
    },
  },
};
