
export type Tcourse = {
  title: String;
  price: String;
  thumbnail: String;
  description: String;
};

export type Tmodule = {
  courseId: string;
  title: string;
  moduleNumber: number;
};

export type Tadmin = {
  name: string;
  email: string;
  password: string;
};

export type Tlecture = {
  moduleId: string;
  title: string;
  videoUrl: string;
  pdfNotes: [string];
};
