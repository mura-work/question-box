type Genre = {
  id: number;
};

type Comment = {
  content: string;
};

type Question = {
  title: string;
  content: string;
  genres: Genre[];
  comments: Comment[];
};

export const QuestionDummy: Question[] = [
  {
    title: "家族について",
    content: "両親共に認知症で介護が厳しいです。どうすればよろしいでしょうか。",
    genres: [
			{
        id: 3,
      },
		],
    comments: [],
  },
  {
    title: "仕事について",
    content: "定職につけません。どうすればよろしいでしょうか。",
    genres: [
			{
        id: 2,
      },
		],
    comments: [],
  },
  {
    title: "人生相談",
    content: "人生に対してやる気がありません。どうすればよろしいでしょうか。",
    genres: [
			{
        id: 1,
      },
			{
        id: 2,
      },
			{
        id: 3,
      },
		],
    comments: [],
  },
  {
    title: "転職について",
    content: "転職した方がいいのか、今のままでいいのかわかりません。",
    genres: [
      {
        id: 2,
      },
    ],
    comments: [
      {
        content: "転職すべし。",
      },
      {
        content: "転職する勇気が出ないなら転職しない方がいいです。",
      },
      {
        content: "今の仕事内容に不満があるのかもう一度考えてみましょう。",
      },
      {
        content: "新しくスキルを身につけてから転職すべき",
      },
    ],
  },
  {
    title: "人間関係について",
    content: "学校で友達ができません。どうすれば良いでしょうか。",
    genres: [
      {
        id: 1,
      },
    ],
    comments: [
      {
        content: "友達なんて必要ありません。",
      },
    ],
  },
  {
    title: "家族について",
    content: "両親共に認知症で介護が厳しいです。どうすればよろしいでしょうか。",
    genres: [
      {
        id: 1,
      },
      {
        id: 4,
      },
    ],
    comments: [],
  },
  {
    title: "仕事について",
    content: "定職につけません。どうすればよろしいでしょうか。",
    genres: [
      {
        id: 2,
      },
    ],
    comments: [],
  },
  {
    title: "人生相談",
    content: "人生に対してやる気がありません。どうすればよろしいでしょうか。",
    genres: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    comments: [],
  },
];
