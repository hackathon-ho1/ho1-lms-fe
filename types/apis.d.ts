type GotgamList = {
  date: string;
  stage: number;
  achievedLectureList: AchievedLectureList[];
  achievedHelpList: AchievedHelpList[];
};

type AchievedLectureList = {
  id: number;
  lectureId: number;
  courseTitle: string;
  chatperTitle: string;
  lectureTitle: string;
};

type AchievedHelpList = {
  id: number;
  helpId: number;
  questionTitle: string;
};

type Course = {
  courseId: number;
  title: string;
  description: string;
  progress: number;
  chapters: Chapter[];
};

type Chapter = {
  chapterId: number;
  title: string;
  progress: number;
  lectures: Lecture[];
};

type Lecture = {
  lectureId: string;
  title: string;
  description: string;
  videoURL: string;
  isDone: boolean;
};
