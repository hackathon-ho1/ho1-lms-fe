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
