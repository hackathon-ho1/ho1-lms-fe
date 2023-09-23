type GotgamList = {
  achiecedAt: string;
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
  courseTitle: string;
  courseDescription: string;
  courseProgress: number;
  chapters: Chapter[];
};

type Chapter = {
  doneCount: number;
  lectureCount: number;
  chapterId: number;
  chapterTitle: string;
  progress: number;
  lectures: Lecture[];
};

type Lecture = {
  lectureId: number;
  lectureTitle: string;
  lectureDescription: string;
  videoURL: string;
  isDone: boolean;
};
