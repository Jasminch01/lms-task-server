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
  role: string;
};

export type Tlecture = {
  moduleId: string;
  title: string;
  videoUrl: string;
  pdfNotes: [string];
};

export type TsignInAdmin = {
  email: string;
  password: string;
};
